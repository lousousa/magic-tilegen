import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  success: boolean,
  base64: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    success: true,
    base64: 'xxxxxx64'
  })
}
