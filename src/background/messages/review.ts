import type { PlasmoMessaging } from "@plasmohq/messaging";
import type { RequestType, ReviewType } from "~types/types";

import { Storage } from "@plasmohq/storage";
import MateService from "src/mate-service";
import md5 from "blueimp-md5";

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

const generateReview = async (payload: RequestType): Promise<ReviewType> => {
  const response: ReviewType = await service.getReview(payload);
  if (typeof response.result === 'string') {
    const parsedResult = JSON.parse(response.result);
    return { ...response, result: parsedResult };
  }

  return response;
}

const handler: PlasmoMessaging.MessageHandler = async (req, _res) => {
  let currentReview:ReviewType = await storage.get('currentReview');
  const { filename, parsedCode, user_id } = req.body;
  
  if (currentReview?.id == md5(parsedCode)) {
    console.log('result is the same');
    await storage.set('currentReview', currentReview);
    return;
  }
  
  await storage.remove('currentReview');
  
  if ('error' in req.body) {
    await storage.set('currentReview', req.body);
    return;
  }

  
  if (!user_id) {
    console.error('User not found in request');
    return;
  }

  const hash = md5(parsedCode);
  const newReview = await generateReview({user_id, parsedCode, filename, id: hash});

  console.log('result', newReview);
  await storage.set('currentReview', newReview);
  return;
}
 
export default handler