


export function getRandomCell(arr) {
  let randomCell = getRandomInt(0, arr.length);
  let value = arr[randomCell];
  arr.splice(randomCell, 1);
  
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