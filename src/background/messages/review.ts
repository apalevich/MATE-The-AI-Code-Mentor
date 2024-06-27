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
  let response: ReviewType = await service.getReview(payload);
  // if (typeof result === 'string') {
  //   result = JSON.parse(result);
  // }

  return response
}

const handler: PlasmoMessaging.MessageHandler = async (req, _res) => {
  storage.remove('currentReview');
  
  if ('error' in req.body) {
    await storage.set('currentReview', req.body);
    
    return;
  }

  const { filename, parsedCode, user_id } = req.body;
  const hash = md5(parsedCode);

  let currentReview = await generateReview({user_id, parsedCode, filename, id: hash})

  if (!currentReview || !currentReview.ok) {
    if (!req.body.userId) {
      console.error('User not found in request');
      return;
    }
    const result = await generateReview(req.body);
    storage.set('currentReview', result);
  }
}
 
export default handler