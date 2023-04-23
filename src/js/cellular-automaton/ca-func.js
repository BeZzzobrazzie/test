


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