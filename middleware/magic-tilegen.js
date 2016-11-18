import fs from "fs"
import express from "express"
import multer from "multer"
import magicTilegen from "./../services/magic-tilegen.service"

const router = express()
const upload = multer({ dest: "./uploads/" })
const getRouter = () => {
  router.post("/upload", upload.single("source-image"), (req, res) => {
    let file = req.file
    if (!file) return res.redirect("/")

    // req.body.type -> mapSelected
    const generatedFilename = file.filename

    magicTilegen.getDataURL(`${file.destination}${file.filename}`, "3-full", function(err, dataURL) {
      fs.unlink(`${file.destination}${file.filename}`, () => {
        if (err) res.send(err)
        else {
          res.render("generated", { title: "Magic Tilegen", dataURL: dataURL, generatedFilename: generatedFilename })
        }
      })
    })

  })
  return router
}
module.exports = { getRouter }
