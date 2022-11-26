import type { NextApiRequest, NextApiResponse } from 'next'
import { Data } from '../../utils/types'

import { createRouter } from 'next-connect'
import multer from 'multer'

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => cb(null, file.originalname)
  })
})

const router = createRouter<NextApiRequest, NextApiResponse>()

router.use(upload.single('file') as any)

router.post((req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ success: true })
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