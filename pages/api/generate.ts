import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import Canvas from 'canvas'
import utils from './../../utils/generate'
import { Data } from './../../utils/types'
const Image = Canvas.Image

const getDataUrl = async (srcImage: string): Promise<string | undefined> => {
  const bufferData = await fs.readFileSync(srcImage, 'base64')
  const img = new Image()

  img.src = `data:image/png;base64, ${ bufferData }`

  const tileCount = img.width / utils.gcd(img.width, img.height)
  if (!utils.sizeChecker[tileCount]) {
    return new Promise((_, reject) => {
      reject(`Invalid image size! You must to provide a horizontal image
        containing 4, 6, or 9 tiles. (following the template structure)`)
    })
  }

  const mapSelected = utils.sizeChecker[tileCount]
  const tileSize = img.width / tileCount
  const canvasTemp = Canvas.createCanvas(img.width, img.height)
  const ctxTemp = canvasTemp.getContext('2d')
  const getTile = (x: number, y: number) =>
    ctxTemp.getImageData(x * tileSize / 2, y * tileSize / 2, tileSize / 2, tileSize / 2)

  ctxTemp.drawImage(img, 0, 0, img.width, img.height)

  let destSize = tileCount == 6 ? { w: 4, h: tileCount } : { w: tileCount, h: tileCount }
  if (tileCount == 2 || tileCount == 3) {
    destSize = { w: tileCount * tileCount, h: tileCount * tileCount }
  }
  const canvas = Canvas.createCanvas(tileSize * destSize.w, tileSize * destSize.h)
  const ctx = canvas.getContext('2d')

  const m = utils.borderMapping[mapSelected]
  const d = utils.getData(tileCount)
  let id = 1

  for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m.length; j++) {
      for (let k = 0; k < m.length; k++) {
        for (let l = 0; l < m.length; l++) {

          if (
            m[i][0][1] == m[j][1][0] &&
            m[j][1][1] == m[k][2][0] &&
            m[k][2][1] == m[l][3][0] &&
            m[l][3][1] == m[i][0][0]
          ) {

            let cancel = false
            if (tileCount == 6)
              cancel = k == 4 || k == 5 || l == 4 || l == 5

            if (!cancel) {
              const pos = utils.getCellPositionByID(id, destSize.w, destSize.h)
              if (typeof pos === 'boolean') return

              ctx.putImageData(getTile(d[i][0].x, d[i][0].y), pos.x * tileSize, pos.y * tileSize, 0, 0, tileSize / 2, tileSize / 2)
              ctx.putImageData(getTile(d[j][1].x, d[j][1].y), pos.x * tileSize + tileSize / 2, pos.y * tileSize, 0, 0, tileSize / 2, tileSize / 2)
              ctx.putImageData(getTile(d[k][2].x, d[k][2].y), pos.x * tileSize + tileSize / 2, pos.y * tileSize + tileSize / 2, 0, 0, tileSize / 2, tileSize / 2)
              ctx.putImageData(getTile(d[l][3].x, d[l][3].y), pos.x * tileSize, pos.y * tileSize + tileSize / 2, 0, 0, tileSize / 2, tileSize / 2)

              if (id++ == destSize.w * destSize.h) {
                return new Promise((resolve) => {
                  resolve(canvas.toDataURL())
                })
              }
            }

          }

        }
      }
    }
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const dataUrl = await getDataUrl('assets/images/3-full.png')

  res.status(200).json({
    success: true, dataUrl
  })
}