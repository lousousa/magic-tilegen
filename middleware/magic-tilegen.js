import fs from "fs"
import Canvas from "canvas"
const Image = Canvas.Image

const gcd = (a, b) => { return !b ? a : gcd(b, a % b) }

fs.readFile("./images/Source.png", (err, squid) => {
  if (err) throw err

  const img = new Image
  img.src = squid
  
  const tileCount = img.width / gcd(img.width, img.height)
  const tileSize = img.width / tileCount
  const canvasTemp = new Canvas(img.width, img.height)
  const ctxTemp = canvasTemp.getContext("2d")
  ctxTemp.drawImage(img, 0, 0, img.width, img.height)

  const _data = (x, y) => {
    return ctxTemp.getImageData(x * tileSize / 2, y * tileSize / 2,
      tileSize / 2, tileSize / 2)
  }

  const borderMapping = {
    "3-full": [
      [ [0, 0], [0, 0], [0, 0], [0, 0] ],
      [ [0, 1], [1, 0], [0, 1], [1, 0] ],
      [ [0, 2], [2, 0], [0, 2], [2, 0] ],
      [ [1, 0], [0, 1], [1, 0], [0, 1] ],
      [ [1, 1], [1, 1], [1, 1], [1, 1] ],
      [ [1, 2], [2, 1], [1, 2], [2, 1] ],
      [ [2, 0], [0, 2], [2, 0], [0, 2] ],
      [ [2, 1], [1, 2], [2, 1], [1, 2] ],
      [ [2, 2], [2, 2], [2, 2], [2, 2] ]
    ]
  }
  const dataMapping = {
    "3-full": function() {
      const arr = []
      for (var i = 0 i < tileCount i++) {
        arr.push([])
        arr[i].push({ "x": i * 2, "y": 0 })
        arr[i].push({ "x": i * 2 + 1, "y": 0 })
        arr[i].push({ "x": i * 2 + 1, "y": 1 })
        arr[i].push({ "x": i * 2, "y": 1 })
      }
      return arr
    }
  }
  const mapSelected = "3-full"
  const m = borderMapping[mapSelected]
  const canvas = new Canvas(tileSize * tileCount, tileSize * tileCount)
  const ctx = canvas.getContext("2d")

  const getCellPositionByID = (id, xLength, yLength) => {
    if (id < 1) return false
    if (id > xLength * yLength) return false
    return { "x": (id - 1) % xLength, "y": Math.floor((id - 1) / yLength) }
  }

  const d = dataMapping[mapSelected]()
  let id = 1

  for (let i = 0 i < m.length i++) {
    for (let j = 0 j < m.length j++) {
      for (let k = 0 k < m.length k++) {
        for (let l = 0 l < m.length l++) {

          if (
            m[i][0][1] == m[j][1][0] &&
            m[j][1][1] == m[k][2][0] &&
            m[k][2][1] == m[l][3][0] &&
            m[l][3][1] == m[i][0][0]
          ) {

            const pos = getCellPositionByID(id, tileCount, tileCount)

            ctx.putImageData(_data(d[i][0].x, d[i][0].y), pos.x * tileSize, pos.y * tileSize, 0, 0, tileSize / 2, tileSize / 2)
            ctx.putImageData(_data(d[j][1].x, d[j][1].y), pos.x * tileSize + tileSize / 2, pos.y * tileSize, 0, 0, tileSize / 2, tileSize / 2)
            ctx.putImageData(_data(d[k][2].x, d[k][2].y), pos.x * tileSize + tileSize / 2, pos.y * tileSize + tileSize / 2, 0, 0, tileSize / 2, tileSize / 2)
            ctx.putImageData(_data(d[l][3].x, d[l][3].y), pos.x * tileSize, pos.y * tileSize + tileSize / 2, 0, 0, tileSize / 2, tileSize / 2)

            id++
            if (id == tileCount * tileCount) {
              const out = fs.createWriteStream("./out.png")
              canvas.pngStream()
                .on("data", (chunk) => { out.write(chunk) })
                .on("end", () => { console.log("Tileset generated!") })
            }

          }

        }
      }
    }
  }

})
