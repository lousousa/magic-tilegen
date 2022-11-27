import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

import { createRouter } from 'next-connect'
import multer from 'multer'

const destination = './public/uploads'
if(!fs.existsSync(destination)) fs.mkdirSync(destination)
let filepath: string

export type ResponseData = {
  success: boolean,
  filepath?: string
}

const upload = multer({
  storage: multer.diskStorage({
    destination,
    filename: (req, file, cb) => {
      filepath = `${destination}/${file.originalname}`
      return cb(null, file.originalname)
    }
  })
})

const router = createRouter<NextApiRequest, NextApiResponse>()

router
  .use(upload.single('file') as any)
  .post((req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    res.status(200).json({ success: true, filepath })
  })

export default router.handler({
  onError(error: any, req: NextApiRequest, res: NextApiResponse) {
    res.status(501).json({ error: `Sorry somenthing happened! ${error.message}` })
  }
})

export const config = {
  api: {
    bodyParser: false
  }
}