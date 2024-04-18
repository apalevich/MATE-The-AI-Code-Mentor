import type { PlasmoMessaging } from "@plasmohq/messaging";
import { Storage } from "@plasmohq/storage";
import MateService from "src/mate-service";
import md5 from "blueimp-md5";
import type { ReviewType } from "~types/types";

const storage = new Storage();
const service = new MateService();
 
const getCachedReview = async (previousReviews, id) => {
  const cachedReview = previousReviews.find(r => r.id === id);
  console.log('Cached review:', cachedReview);
  return cachedReview;
}

const handler: PlasmoMessaging.MessageHandler = async (req, _res) => {
  storage.remove('currentReview');

  const sourceCode = req.body.content;
  const hash = md5(sourceCode);

  const previousReviews: ReviewType[] = await storage.get('previousReviews') || [];

  let review = await getCachedReview(previousReviews, hash);
  
  if ('error' in req.body) {
    await storage.set('currentReview', { error: req.body.error });
    return;
  }

  if (!review || !review.reqStatus) {
    console.log('Cached review not found, making request')
    const generatedReview = await service.getReview(req.body.content);

    const { ok, result } = generatedReview;
    review = {
      id: hash,
      reqStatus: ok,
      result: JSON.parse(result) || null
    };
    
    await storage.set('previousReviews', [...previousReviews, review])
  };

  await storage.set('currentReview', review);
}
 
export default handler