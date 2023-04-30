
// let elem = document.querySelector('.ex-color-pallet');
// console.log(elem);
// elem.style.height = '100px';
// elem.style.width = '100px';
// elem.style.backgroundColor = 'red';

let left = document.querySelector('.pallet__body_r');
let centr = document.querySelector('.pallet__body_g');
let right = document.querySelector('.pallet__body_b');

let colorLeft = getComputedStyle(left).backgroundColor;
let colorCentr = getComputedStyle(centr).backgroundColor;
let colorRight = getComputedStyle(right).backgroundColor;

console.log(colorLeft);
console.log(extrudeRGB(colorLeft));

let i = mixColor(rgb2hex(extrudeRGB(colorLeft)[0] * 1, extrudeRGB(colorLeft)[1]  * 1, extrudeRGB(colorLeft)[2] * 1), rgb2hex(extrudeRGB(colorRight)[0]  * 1, extrudeRGB(colorRight)[1]  * 1, extrudeRGB(colorRight)[2]  * 1));

console.log();
centr.style.backgroundColor = i;
// let a;
// let b;

// let rangeOne;
// let rangeTwo;

// rangeOne = Math.abs(a - b);
// rangeTwo = 255 - Math.max(a, b) + Math.min(a, b);


function extrudeRGB(stringRGB) {
  let a = stringRGB.slice(4, -1);
  a = a.split(',');
  return a;
}


function mixColor(colorOne, colorTwo) {
  let rOne = parseInt(colorOne.slice(1, 3), 16);
  let gOne = parseInt(colorOne.slice(3, 5), 16);
  let bOne = parseInt(colorOne.slice(5), 16);

  let rTwo = parseInt(colorTwo.slice(1, 3), 16);
  let gTwo = parseInt(colorTwo.slice(3, 5), 16);
  let bTwo = parseInt(colorTwo.slice(5), 16);


  let result = rgb2hex(Math.round((rOne + rTwo) / 2), Math.round((gOne + gTwo) / 2), Math.round((bOne + bTwo) / 2));

  return result;
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgb2hex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}