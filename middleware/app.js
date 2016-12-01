import express from "express"
import bodyParser from "body-parser"
require("fs").readFile(".buildrc", (err, buildrc) => {
	const [http, uid, app] = [
		require("./../configs/http.json").development,
		JSON.parse(buildrc).uid,
		express()
	]
	const magicTilegen = require("./magic-tilegen")
	app
		.set("view engine", "pug")
		.use((req, res, next) => {
			req.header("Access-Control-Allow-Origin", "*")
			next()
		})
		.use(bodyParser.json())
		.use(bodyParser.urlencoded({ extended: true }))
		.use("/public", express.static("./public"))
		.use(magicTilegen.getRouter())
		.get("/", (req, res) => {
			res.render("index", { title: "Magic Tilegen", message: "The app is running correctly!" })
		})
		.use((req, res) => { res.redirect("/") })
		.listen(http.port, http.host, ()=> {
			console.log(`${uid}: Listening to http://${http.host}:${http.port}...`)
		})
})