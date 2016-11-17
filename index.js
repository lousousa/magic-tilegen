var fs = require("fs");
var Canvas = require("canvas");
var Image = Canvas.Image;

var gcd = function(a, b) { return !b ? a : gcd(b, a % b); };

fs.readFile("./images/Source.png", function(err, squid) {
  if (err) throw err;

  var img = new Image;
  img.src = squid;
  var tileCount = img.width / gcd(img.width, img.height);
  var tileSize = img.width / tileCount;
  var canvasTemp = new Canvas(img.width, img.height);
  var ctxTemp = canvasTemp.getContext("2d");
  ctxTemp.drawImage(img, 0, 0, img.width, img.height);

  var dataMapping = [];
  for (var j = 0; j < 2; j++) {
    dataMapping.push([]);
    for (var i = 0; i < tileCount * 2; i++) {
      dataMapping[j].push( ctxTemp.getImageData(i * tileSize / 2, j * tileSize / 2,
        tileSize / 2, tileSize / 2) );
    }
  }

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
  var canvas = new Canvas(tileSize * tileCount, tileSize * tileCount);
  var ctx = canvas.getContext("2d");

  var getCellPositionByID = function(id, xLength, yLength) {
    if (id < 1) return false;
    if (id > xLength * yLength) return false;
    var x = (id - 1) % xLength;
    var y = Math.floor((id - 1) / yLength);
    return { "x": x, "y": y };
  };

  var id = 1;

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

            var pos = getCellPositionByID(id, tileCount, tileCount);

            console.log(i, j, k, l);

            ctx.putImageData(dataMapping[0][8], pos.x * tileSize, pos.y * tileSize, 0, 0, tileSize / 2, tileSize / 2);
            ctx.putImageData(dataMapping[0][9], pos.x * tileSize + tileSize / 2, pos.y * tileSize, 0, 0, tileSize / 2, tileSize / 2);
            ctx.putImageData(dataMapping[1][9], pos.x * tileSize + tileSize / 2, pos.y * tileSize + tileSize / 2, 0, 0, tileSize / 2, tileSize / 2);
            ctx.putImageData(dataMapping[1][8], pos.x * tileSize, pos.y * tileSize + tileSize / 2, 0, 0, tileSize / 2, tileSize / 2);

            id++;
            if (id == tileCount * tileCount) {
              var out = fs.createWriteStream("./out.png");
              canvas.pngStream()
                .on("data", function(chunk) { out.write(chunk); })
                .on("end", function() { console.log("Generated"); });
            }

          }

        }
      }
    }
  }

});
