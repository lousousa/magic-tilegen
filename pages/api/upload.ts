import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

import { createRouter } from 'next-connect'
import multer from 'multer'

const destination = './public/uploads'
if(!fs.existsSync(destination)) fs.mkdirSync(destination)
let filepath: string
let filename: string | undefined

export type ResponseData = {
  success: boolean,
  filepath?: string,
  filename?: string
}

const upload = multer({
  storage: multer.diskStorage({
    destination,
    filename: (req, file, cb) => {
      filepath = `${destination}/${file.originalname}`

      let temp: string | string[] =  file.originalname.split('.')
      temp.pop()
      filename = temp.join('')

      return cb(null, file.originalname)
    }
  })
})

const router = createRouter<NextApiRequest, NextApiResponse>()

router
  .use(upload.single('file') as any)
  .post((req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    res.status(200).json({ success: true, filepath, filename })
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