const img = new Image();
img.crossOrigin = 'anonymous';
img.src = './assets/img/meteor_challenge_01.png'; // Set source path

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

img.onload = () => {
  ctx.drawImage(img, 0, 0);
  invert();
  console.log('white', whitePixels);
  console.log('red', redPixels);
};

let whitePixels = 0;
let redPixels = 0;

const invert = () => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  console.log(imageData);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i] === 255 && data[i + 1] === 255 && data[i + 2] === 255) {
      whitePixels += 1;
    } else if (data[i] === 255 && data[i + 1] === 0 && data[i + 2] === 0) {
      redPixels += 1;
    }

    // data[i] = 255 - data[i]; // red
    // data[i + 1] = 255 - data[i + 1]; // green
    // data[i + 2] = 255 - data[i + 2]; // blue
  }
};
