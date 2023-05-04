


export function getRandomCell(list) {
  // let randomCell = getRandomInt(0, arr.length);
  // let value = arr[randomCell];
  // arr.splice(randomCell, 1);

  // return value;

  let randomCell = getRandomInt(0, Object.keys(list).length); 
  let value = Object.keys(list)[randomCell];
  delete list[Object.keys(list)[randomCell]];
  
  return value;
}


export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

export function convertIntToDirection(number) {
  switch(number) {
    case 1:
      return 'up';
    case 2:
      return 'right';
    case 3:
      return 'bottom';
    case 4:
      return 'left';
    default:
      console.log('что то пошло не так');
  } 
}

export function getId(collection) {
  while (true) {
    let key = getRandomInt(0, 10000);
    if (!(key in collection)) {
      return key;
    }
  }
}

export function randColor() {
  let r = getRandomInt(0, 256);
  let g = getRandomInt(0, 256);
  let b = getRandomInt(0, 256);
  let color = '#' + r.toString(16) + g.toString(16) + b.toString(16);

  return color;
}

export function mixColor(colorOne, colorTwo) {
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