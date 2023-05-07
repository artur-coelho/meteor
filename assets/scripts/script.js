const img = new Image();
img.crossOrigin = 'anonymous';
img.src = './assets/img/meteor_challenge_01.png'; // Set source path

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

img.onload = () => {
  ctx.drawImage(img, 0, 0);
  coloredPixelsCounter();
  meteorsOnWaterCounter();
  console.log('white', whitePixelsAmount);
  console.log('red', redPixelsAmount);
  console.log('blue', bluePixelsAmount);
  console.log('redPixelsColumnPositions', redPixelsColumnPositions);
  console.log('bluePixelsColumnPositions', bluePixelsColumnPositions);
  console.log('meteorsOnWaterAmount', meteorsOnWaterAmount);
};

let whitePixelsAmount = 0;
let redPixelsAmount = 0;
let bluePixelsAmount = 0;

const redPixelsColumnPositions = [];
const bluePixelsColumnPositions = [];

const coloredPixelsCounter = () => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  console.log(imageData);

  const imageWidth = imageData.width;
  const data = imageData.data;

  let firstWaterRow = null;

  for (let i = 0; i < data.length; i += 4) {
    if (data[i] === 255 && data[i + 1] === 255 && data[i + 2] === 255) {
      whitePixelsAmount += 1;
    } else if (data[i] === 255 && data[i + 1] === 0 && data[i + 2] === 0) {
      redPixelsAmount += 1;
      let redPixelColumnPosition = (i / 4) % imageWidth;
      redPixelsColumnPositions.push(redPixelColumnPosition);
    } else if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 255) {
      const actualRow = Math.floor(i / 4 / imageWidth);

      if (firstWaterRow === null) {
        firstWaterRow = actualRow;
      }

      if (actualRow === firstWaterRow) {
        let bluePixelColumnPosition = (i / 4) % imageWidth;
        bluePixelsColumnPositions.push(bluePixelColumnPosition);
      }
    }
  }
};

let meteorsOnWaterAmount = 0;
const meteorsOnWaterCounter = () => {
  redPixelsColumnPositions.map((redColumnPosition) => {
    bluePixelsColumnPositions.map((blueColumnPosition) => {
      if (redColumnPosition === blueColumnPosition) {
        meteorsOnWaterAmount += 1;
      }
    });
  });
};
