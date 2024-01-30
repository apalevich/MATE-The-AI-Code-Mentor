import type { PlasmoMessaging } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"
import MateService from "src/mate-service";
import md5 from "blueimp-md5";

const storage = new Storage();
const service = new MateService();
storage.removeAll() //REMOVE BEFORE THE MERGING

type reviewType = {
  id: string,
  result: object,
  reqStatus?: boolean
};
 
const getCachedReview = async (previousReviews, id) => {
  const cachedReview = previousReviews.find(r => r.id === id);
  return cachedReview;
}

const handler: PlasmoMessaging.MessageHandler = async (req, _res) => {
  const sourceCode = req.body.content;
  const hash = md5(sourceCode);

  const previousReviews: reviewType[] = await storage.get('previousReviews') || [];

  let review = await getCachedReview(previousReviews, hash);
  
  if (!review || !review.reqStatus) {
    console.log('Cached review not found, making request')
    const generatedReview = await service.getReview(req.body.content);
    console.log(generatedReview);
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