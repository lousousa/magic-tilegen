import fs from "fs"
import express from "express"
import multer from "multer"
import es from "event-stream"
import magicTilegen from "./../services/magic-tilegen.service"

const router = express()
const upload = multer({ dest: "./uploads/" })
const getRouter = () => {
  router.post("/upload", upload.single("source-image"), (req, res) => {
    let file = req.file
    if (!file) return res.redirect("/")

    magicTilegen.getPNGStream(`${file.destination}${file.filename}`, function(err, stream) {
      if (err) res.send(err)
      else {
        const out = fs.createWriteStream("./out.png")
        stream
          .on("data", (chunk) => { out.write(chunk) })
          .on("end", () => { res.send("Tileset generated!") })
      }
    })

  })
  return router
}
module.exports = { getRouter }
