var fs = require("fs");
var Canvas = require("canvas");
var Image = Canvas.Image;

var mdc = function(a, b) {
  if (!b) return a;
  return mdc(b, a % b);
};

fs.readFile("./images/Source.png", function(err, squid) {
  if (err) throw err;

  var img = new Image;
  img.src = squid;
  var tileCount = img.width / mdc(img.width, img.height);
  var tileHeight = img.height;
  var tileWidth = img.width / tileCount;

  var tempCanvas = new Canvas(img.width, img.height);
  var tempCtx = tempCanvas.getContext("2d");
  tempCtx.drawImage(img, 0, 0, img.width, img.height);
  var tempData = tempCtx.getImageData(0, 0, img.width, img.height);

  var canvas = new Canvas(tileWidth * tileCount, tileHeight * tileCount);
  var ctx = canvas.getContext("2d");

  for (var i = 0; i < tileCount; i++) {
    for (var j = 0; j < tileCount; j++) {
      ctx.putImageData(tempData, i * tileWidth, j * tileHeight,
        i * tileWidth, i * tileHeight, img.width, img.height);
    }
  }

  var out = fs.createWriteStream("./out.png");
  canvas.pngStream()
    .on("data", function(chunk) { out.write(chunk); })
    .on("end", function() { console.log("Generated"); });

});
