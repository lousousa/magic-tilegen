import type { NextApiRequest, NextApiResponse } from 'next'
import generateTileset from '../../utils/generate-tileset'
import { createRouter } from 'next-connect'

export type ResponseData = {
  success: boolean,
  dataUrl?: string
}

const router = createRouter<NextApiRequest, NextApiResponse>()

router.get(async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  const dataUrl = await generateTileset(req.query.filePath as string)
  res.status(200).json({ success: true, dataUrl })
})

export default router.handler({
  onError(error: any, req: NextApiRequest, res: NextApiResponse) {
    res.status(501).json({ error: `Sorry somenthing happened! ${error.message}` })
  }
})
