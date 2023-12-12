import type { PlasmoMessaging } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"
import {MateService} from 'src/mate-service';

const storage = new Storage()
const service = new MateService();
 
const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  service.getReview(req.body.content)
  .then(resp => {
    storage.set("review", resp)
  })
}
 
export default handler