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

const generateReview = async (payload: RequestType, hash: string): Promise<ReviewType> => {
  console.log(`Current review is not found, requesting...`);
  let { ok, result, error } = await service.getReview(payload);
  if (typeof result === 'string') {
    result = JSON.parse(result)
  }

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
    if (!req.body.userId) {
      console.error('User not found in request');
      return;
    }
    const result = await generateReview(req.body, hash);
    storage.set('currentReview', result);
  }
}
 
export default handler