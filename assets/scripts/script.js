const img = new Image();
img.crossOrigin = 'anonymous';
img.src = './assets/img/meteor_challenge_01.png'; // Set source path

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

img.onload = () => {
  ctx.drawImage(img, 0, 0);
  coloredPixelsCounter();
  meteorsOnWaterCounter();
  starsOnWaterCounter();
  console.log('white', whitePixelsAmount);
  console.log('red', redPixelsAmount);

  console.log('whitePixelsColumnPositions', whitePixelsColumnPositions);
  console.log('redPixelsColumnPositions', redPixelsColumnPositions);
  console.log('bluePixelsColumnPositions', bluePixelsColumnPositions);
  console.log('meteorsOnWaterAmount', meteorsOnWaterAmount);
  console.log('starsOnWaterAmount', starsOnWaterAmount);
  console.log(binaryString);

  document.getElementById('starAmount').innerHTML = whitePixelsAmount;
  document.getElementById('meteorAmount').innerHTML = redPixelsAmount;
  document.getElementById('meteorsOnWater').innerHTML = meteorsOnWaterAmount;
};

let binaryString = '';

let whitePixelsAmount = 0;
let redPixelsAmount = 0;

const redPixelsColumnPositions = [];
const bluePixelsColumnPositions = [];
const whitePixelsColumnPositions = [];

const coloredPixelsCounter = () => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  const imageWidth = imageData.width;
  const data = imageData.data;

  let firstWaterRow = null;

  for (let i = 0; i < data.length; i += 4) {
    if (data[i] === 255 && data[i + 1] === 255 && data[i + 2] === 255) {
      whitePixelsAmount += 1;
      let whitePixelColumnPosition = (i / 4) % imageWidth;
      whitePixelsColumnPositions.push(whitePixelColumnPosition);
      binaryString += '0';
    } else if (data[i] === 255 && data[i + 1] === 0 && data[i + 2] === 0) {
      redPixelsAmount += 1;
      let redPixelColumnPosition = (i / 4) % imageWidth;
      redPixelsColumnPositions.push(redPixelColumnPosition);
      binaryString += '1';
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

let starsOnWaterAmount = 0;
const starsOnWaterCounter = () => {
  whitePixelsColumnPositions.map((whiteColumnPosition) => {
    bluePixelsColumnPositions.map((blueColumnPosition) => {
      if (whiteColumnPosition === blueColumnPosition) {
        starsOnWaterAmount += 1;
      }
    });
  });
};

const original = () => {
  ctx.drawImage(img, 0, 0);
};

const invert = () => {
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 255 - data[i]; // red
    data[i + 1] = 255 - data[i + 1]; // green
    data[i + 2] = 255 - data[i + 2]; // blue
  }
  ctx.putImageData(imageData, 0, 0);
};

const grayscale = () => {
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg; // red
    data[i + 1] = avg; // green
    data[i + 2] = avg; // blue
  }
  ctx.putImageData(imageData, 0, 0);
};

const removeBlankSpaces = () => {
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i] === 2 && data[i + 1] === 119 && data[i + 2] === 189) {
      data[i] = null; // red
      data[i + 1] = null; // green
      data[i + 2] = null; // blue
    }
  }
  ctx.putImageData(imageData, 0, 0);
};

const inputs = document.querySelectorAll('[name=color]');
for (const input of inputs) {
  input.addEventListener('change', (evt) => {
    switch (evt.target.value) {
      case 'inverted':
        return invert();
      case 'grayscale':
        return grayscale();
      case 'removeBlank':
        return removeBlankSpaces();
      default:
        return original();
    }
  });
}
