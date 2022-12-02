import type { NextApiRequest, NextApiResponse } from 'next'
import generateTileset from '../../utils/generate-tileset'
import { createRouter } from 'next-connect'

export type ResponseData = {
  success: boolean,
  dataUrl?: string
}

const router = createRouter<NextApiRequest, NextApiResponse>()

router
  .post(async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    const dataUrl = await generateTileset(req.body.filepath as string)
    res.status(200).json({ success: true, dataUrl })
  })

export default router.handler({
  onError(error: unknown, req: NextApiRequest, res: NextApiResponse) {
    res.status(501).json({ error })
  }
})
