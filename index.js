var fs = require("fs");
var Canvas = require("canvas");
var Image = Canvas.Image;

var gcd = function(a, b) { return b ? a : gcd(b, a%b); };

fs.readFile("./images/Source.png", function(err, squid) {
  if (err) throw err;

  var img = new Image;
  img.src = squid;
  var tileCount = img.width / gcd(img.width, img.height);
  var tileSize = img.width / tileCount;
  var canvas = new Canvas(img.width, img.height);
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height);
  var data = ctx.getImageData(0, 0, img.width, img.height);

  var borderMapping = {
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
  };
  var mapSelected = "3-full";
  var m = borderMapping[mapSelected];
  canvas = new Canvas(tileWidth * tileCount, tileHeight * tileCount);
  ctx = canvas.getContext("2d");
  for (var i = 0; i < m.length; i++) {
    for (var j = 0; j < m.length; j++) {
      for (var k = 0; k < m.length; k++) {
        for (var l = 0; l < m.length; l++) {

          if (
            m[i][0][1] == m[j][1][0] &&
            m[j][1][1] == m[k][2][0] &&
            m[k][2][1] == m[l][3][0] &&
            m[l][3][1] == m[i][0][0]
          ) {

            //ctx.putImageData(data, i * tileSize, j * tileSize,
              //tileSize / 4, tileSize / 4, img.width, img.height);

          }

        }
      }
    }
  }

  /*
  var out = fs.createWriteStream("./out.png");
  canvas.pngStream()
    .on("data", function(chunk) { out.write(chunk); })
    .on("end", function() { console.log("Generated"); });
  */

});
