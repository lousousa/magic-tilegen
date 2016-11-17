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

  var _data = function(x, y) {
    return ctxTemp.getImageData(x * tileSize / 2, y * tileSize / 2,
      tileSize / 2, tileSize / 2)
  };

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
  var dataMapping = {
    "3-full": function() {
      var arr = [];
      for (var i = 0; i < tileCount; i++) {
        arr.push([]);
        arr[i].push({ "x": i * 2, "y": 0 });
        arr[i].push({ "x": i * 2 + 1, "y": 0 });
        arr[i].push({ "x": i * 2 + 1, "y": 1 });
        arr[i].push({ "x": i * 2, "y": 1 });
      }
      return arr;
    }
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
  var d = dataMapping[mapSelected]();

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

            ctx.putImageData(_data(d[i][0].x, d[i][0].y), pos.x * tileSize, pos.y * tileSize, 0, 0, tileSize / 2, tileSize / 2);
            ctx.putImageData(_data(d[j][1].x, d[j][1].y), pos.x * tileSize + tileSize / 2, pos.y * tileSize, 0, 0, tileSize / 2, tileSize / 2);
            ctx.putImageData(_data(d[k][2].x, d[k][2].y), pos.x * tileSize + tileSize / 2, pos.y * tileSize + tileSize / 2, 0, 0, tileSize / 2, tileSize / 2);
            ctx.putImageData(_data(d[l][3].x, d[l][3].y), pos.x * tileSize, pos.y * tileSize + tileSize / 2, 0, 0, tileSize / 2, tileSize / 2);

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
