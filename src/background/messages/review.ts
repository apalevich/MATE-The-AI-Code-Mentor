import type { PlasmoMessaging } from "@plasmohq/messaging";
import { Storage } from "@plasmohq/storage";
import MateService from "src/mate-service";
import md5 from "blueimp-md5";
import type { RequestType, ReviewType } from "~types/types";

const storage = new Storage();
const service = new MateService();

if (process.env.NODE_ENV === 'development') {
  storage.watch({
    currentReview: (c: any) => {
      console.log('currentReview: ', c)
    },
    user: (c: any) => {
      console.log("user", c)
    },
  });
}
 
const getCachedReview = async (previousReviews: ReviewType[], id: string) => {
  const cachedReview = previousReviews.find((r: ReviewType) => r.id === id);
  console.log('Cached currentReview:', cachedReview);
  return cachedReview;
}

const generateReview = async (payload: RequestType, hash: string) => {
  console.log(`Current review is not found, requesting...`);
  console.log('payload', payload);
  const generatedReview = await service.getReview(payload);
  const { ok, result, error } = generatedReview;

  return {
    id: hash,
    reqStatus: ok,
    result,
    error
  }
}

const handler: PlasmoMessaging.MessageHandler = async (req, _res) => {
  storage.remove('currentReview');
  
  if ('error' in req.body) {
    await storage.set('currentReview', req.body);
    
    return;
  }

  const sourceCode = req.body.content;
  const hash = md5(sourceCode);

  const previousReviews: ReviewType[] = await storage.get('previousReviews') || [];
  let currentReview = await getCachedReview(previousReviews, hash);

  if (!currentReview || !currentReview.reqStatus) {
    const user = await storage.get('user');
    const payload = {...req.body, userId: await user.id };
    const result = await generateReview(payload, hash);
    storage.set('currentReview', result);
  };
}
 
export default handler