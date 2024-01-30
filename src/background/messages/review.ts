import type { PlasmoMessaging } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"
import MateService from "src/mate-service";
import md5 from "blueimp-md5";

const storage = new Storage();
const service = new MateService();
storage.removeAll()

type reviewType = {
  id: string,
  result: object,
};
 
const getCachedReview = async (previousReviews, id) => {
  console.log(previousReviews);
  const cachedReview = previousReviews.find(r => r.id === id);
  return cachedReview;
}

const handler: PlasmoMessaging.MessageHandler = async (req, _res) => {
  const sourceCode = req.body.content;
  const hash = md5(sourceCode);

  // if (!previousReviews) {
  //   await storage.set('previousReviews', [])
  // }

  const previousReviews: reviewType[] = await storage.get('previousReviews') || [];
  const previousReview = await getCachedReview(previousReviews, hash);

  let review = await getCachedReview(previousReviews, hash);
  if (review) {
    console.log('Found cached review: ', review)
  } 
  if (!review) {
    console.log('Cached review not found, making request')
    const generatedReview = await service.getReview(req.body.content);
    const { result } = generatedReview;
    if (generatedReview.ok){
      review = {
        id: hash,
        result: JSON.parse(result)
      };
      
      await storage.set('previousReviews', [...previousReviews, review])
    } else {
      console.log("Backend request failed: ", generatedReview);
    }
  };

  await storage.set('currentReview', review);
}
 
export default handler