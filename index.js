var fs = require("fs");
var Canvas = require("canvas");
var Image = Canvas.Image;

fs.readFile("./images/Source.png", function(err, squid) {
  if (err) throw err;
  var canvas = new Canvas(16, 16);
  var ctx = canvas.getContext("2d");
  var img = new Image;
  img.src = squid;
  ctx.drawImage(img, 0, 0, img.width, img.height);
  var stream = canvas.pngStream();
  var out = fs.createWriteStream("./out.png");
  stream
    .on("data", function(chunk) { out.write(chunk); })
    .on("end", function() { console.log("saved..."); })
});
