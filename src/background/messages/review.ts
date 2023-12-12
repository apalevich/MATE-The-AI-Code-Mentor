import type { PlasmoMessaging } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"
import { MateService } from 'src/mate-service'

const storage = new Storage()
const service = new MateService();
 
const handler: PlasmoMessaging.MessageHandler = async (req, _res) => {
  const review = await service.getReview(req.body.content)
    storage.set("review", review)
}
 
export default handler