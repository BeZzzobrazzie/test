

class Main {
  constructor() {
    this.canvas = document.querySelector('.my-canvas');
    this.cHeight = this.canvas.getAttribute('height');
    this.cWidth = this.canvas.getAttribute('width');
    
    this.ctx = this.canvas.getContext('2d');
    this.step = 20;

    this.objects = {creatures: {},
                    apples: {},
                    };
    this.cells = {};
    this.arrCells = [];

    this.timerId;
    this.timerStatus = false;
    this.delay = 1000;

    this.createField();
    this.drawField();

    for (let i = 0; i < 2; i++) {
      new Creature(getRandomInt(0, this.cWidth / this.step), getRandomInt(0, this.cHeight / this.step), this.step, this.cWidth, this.cHeight, this.ctx, this);
    };
    for (let i = 0; i < 1; i++) {
      new Apple(getRandomInt(0, this.cWidth / this.step), getRandomInt(0, this.cHeight / this.step), this.step, this.cWidth, this.cHeight, this.ctx, this);
    };

  }

  createField() {
    for (let y = 1, a = 1; y <= this.cHeight; y = y + this.step, a++) {
      for (let x = 1, b = 1; x <= this.cWidth; x = x + this.step, b++) {
        //console.log('a: ' + a + ' b: ' + b + ' cell: ' + ((a - 1) * (this.cWidth / this.step) + b));
        let addressCell = (a - 1) * (this.cWidth / this.step) + b;
        this.cells[addressCell] = {x: x, y: y, size: 18, obj: null};
        this.arrCells[addressCell - 1] = addressCell;
      }
    }



    for (let y = 1, a = 1; y <= this.cHeight; y = y + this.step, a++) {
      for (let x = 1, b = 1; x <= this.cWidth; x = x + this.step, b++) {
        let addressCell = (a - 1) * (this.cWidth / this.step) + b;

        if (addressCell - this.cWidth / this.step <= 0) {
          this.cells[addressCell].up = null;
        }
        else {
          this.cells[addressCell].up = this.cells[addressCell - this.cWidth / this.step];
        }

        if (addressCell + 1 > this.cWidth / this.step * a) {
          this.cells[addressCell].right = null;
        }
        else {
          this.cells[addressCell].right = this.cells[addressCell + 1];
        }

        if (addressCell + this.cWidth / this.step > this.cWidth / this.step * this.cHeight / this.step) {
          this.cells[addressCell].bottom = null;
        }
        else {
          this.cells[addressCell].bottom = this.cells[addressCell + this.cWidth / this.step];
        }

        if (addressCell - 1 <= this.cWidth / this.step * a - this.cWidth / this.step) {
          this.cells[addressCell].left = null;
        }
        else {
          this.cells[addressCell].left = this.cells[addressCell - 1];
        }


        //console.log('addressCell: ' + addressCell + ' a: ' + a + ' b: ' + b);
      }
    }

    console.log(this.cells);
  }

  drawField() {
    for (let i = this.step; i <= this.cWidth - this.step; i = i + this.step) {
      this.ctx.beginPath();
      this.ctx.moveTo(i, 0);
      this.ctx.lineTo(i, this.cHeight);
      this.ctx.stroke();
      this.ctx.closePath();
    }
    for (let i = this.step; i <= this.cHeight - this.step; i = i + this.step) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, i);
      this.ctx.lineTo(this.cWidth, i);
      this.ctx.stroke();
      this.ctx.closePath();
    }  
  }


  timer(delay) {
    let thisObj = this;
    thisObj.timerId = setTimeout(function tick() {
      //console.log(thisObj.objects);
      //console.log(thisObj.cells);
      for (let key in thisObj.objects.creatures) {

        //thisObj.objects.creatures[key].go();
        //thisObj.objects.creatures[key].sense();
        thisObj.objects.creatures[key].decide();

      }
      thisObj.timerId = setTimeout(tick, delay);
    }, delay, thisObj);
  }

  startTimer(delay) {
    if (!this.timerStatus) {
      this.timerStatus = true;
      this.timer(delay);
    }
  }
  
  stopTimer() {
    if (this.timerStatus) {
      this.timerStatus = false;
      clearTimeout(this.timerId);
    }
  }
  nextStep() {
    this.startTimer(0);
    setTimeout(() => this.stopTimer(), 0);
  }



}


class Entity {
  constructor(x, y, step, cWidth, cHeight, ctx, main) {
    this.step = step;
    this.currentCell;
    this.cWidth = cWidth;
    this.cHeight = cHeight;
    this.ctx = ctx;
    this.main = main;
    this.name;
    this.type;
  }

  create(ctx, color, type) {
    let randomCell = getRandomCell(this.main.arrCells);
    console.log(randomCell);

    this.currentCell = this.main.cells[randomCell];
    this.currentCell.obj = this;

    this.name = getId(this.main.objects[type]);
    this.main.objects[type][this.name] = this;

    
    ctx.fillStyle = color;
    ctx.fillRect(this.currentCell.x, this.currentCell.y, this.currentCell.size, this.currentCell.size);

    console.log(this);
  }

  die(ctx) {
    if (this.name in this.main.objects[type]) {
      ctx.fillStyle = 'white';
      ctx.fillRect(this.currentPos.x, this.currentPos.y, 18, 18);
      delete this.main.objects[type][this.name];
    }
  }

}

class Apple extends Entity {
  constructor(x, y, step, cWidth, cHeight, ctx, main) {
    super(x, y, step, cWidth, cHeight, ctx, main);
    this.type = 'apples';
    this.create(ctx, 'orange', this.type);
  }

}

class Creature extends Entity {
  constructor(x, y, step, cWidth, cHeight, ctx, main) {
    super(x, y, step, cWidth, cHeight, ctx, main);
    this.type = 'creatures';
    this.create(ctx, 'blue', this.type);
  }

  exist() {
    let direction = getRandomInt(1, 5);
    //this.sense();
    //this.decide();

  }

  sense() {
    function senseDir(direction, parrent) {
      if (parrent.currentCell[direction] !== null && parrent.currentCell[direction].obj !== null) {
        return parrent.currentCell[direction].obj.type;
      }
      else {
        return null;
      }
    }
    let up;
    let right;
    let bottom;
    let left;
    
    up = senseDir('up', this);
    right = senseDir('right', this);
    bottom = senseDir('bottom', this);
    left = senseDir('left', this);


    //console.log({up: up, right: right, bottom: bottom, left: left});
    return {up: up, right: right, bottom: bottom, left: left};
  }

  decide() {
    console.log(this);
    let view = this.sense();
    for (let key in view) {
      if (view[key] == 'apples') {
        console.log('direction: ' + key + ' value: ' + view[key]);
        this.go(key);
        return;
      }
    }
    this.go(convertToDirection(getRandomInt(1, 5)));

  }

  eat(direction) {
    if (direction == 1 && this.currentCell.up.obj.type == 'apples') {

    }
    if (direction == 2 && this.currentCell.right.obj.type == 'apples') {

    }
    if (direction == 3 && this.currentCell.bottom.obj.type == 'apples') {

    }
    if (direction == 4 && this.currentCell.left.obj.type == 'apples') {

    }
  }

  sleep() {

  }

  go(direction) {
    //let direction = getRandomInt(1, 5);
    //console.log(direction);


    if (direction == 'up' && this.currentCell.y >= this.step && this.currentCell.up.obj !== 'creatures') { // up
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(this.currentCell.x, this.currentCell.y, this.currentCell.size, this.currentCell.size);
      this.currentCell.obj = null;

      this.ctx.fillStyle = 'blue';
      this.ctx.fillRect(this.currentCell.x, this.currentCell.y - this.step, this.currentCell.size, this.currentCell.size);
      this.currentCell = this.currentCell.up;
      this.currentCell.obj = this;

      //console.log('up');
    }
    if (direction == 'right' && this.currentCell.x <= this.cWidth - this.step && this.currentCell.right.obj !== 'creatures') { // right
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(this.currentCell.x, this.currentCell.y, this.currentCell.size, this.currentCell.size);
      this.currentCell.obj = null;

      this.ctx.fillStyle = 'blue';
      this.ctx.fillRect(this.currentCell.x + this.step, this.currentCell.y, this.currentCell.size, this.currentCell.size);
      this.currentCell = this.currentCell.right;
      this.currentCell.obj = this;

      //console.log('right');
    }
    if (direction == 'bottom' && this.currentCell.y <= this.cHeight - this.step && this.currentCell.bottom.obj !== 'creatures') { //bottom
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(this.currentCell.x, this.currentCell.y, this.currentCell.size, this.currentCell.size);
      this.currentCell.obj = null;

      this.ctx.fillStyle = 'blue';
      this.ctx.fillRect(this.currentCell.x, this.currentCell.y + this.step, this.currentCell.size, this.currentCell.size);
      this.currentCell = this.currentCell.bottom;
      this.currentCell.obj = this;

      //console.log('bottom');
    }
    if (direction == 'left' && this.currentCell.x >= this.step && this.currentCell.left.obj !== 'creatures') { // left
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(this.currentCell.x, this.currentCell.y, this.currentCell.size, this.currentCell.size);
      this.currentCell.obj = null;

      this.ctx.fillStyle = 'blue';
      this.ctx.fillRect(this.currentCell.x - this.step, this.currentCell.y, this.currentCell.size, this.currentCell.size);
      this.currentCell = this.currentCell.left;
      this.currentCell.obj = this;

      //console.log('left');
    }
  }
}

function getId(collection) {
  while (true) {
    let key = getRandomInt(0, 10000);
    if (!(key in collection)) {
      return key;
    }
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

function convertToDirection(number) {
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

function draw() {
  let canvas = document.querySelector('.my-canvas');
  let cHeight = canvas.getAttribute('height');
  let cWidth = canvas.getAttribute('width');
  
  let ctx = canvas.getContext('2d');
  let step = 20;
  let currentPos = {x: 21, y: 21};

  for (let i = step; i <= cWidth - step; i = i + step) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, cHeight);
    ctx.stroke();
    ctx.closePath();
  }
  for (let i = step; i <= cHeight - step; i = i + step) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(cWidth, i);
    ctx.stroke();
    ctx.closePath();
  }  
  ctx.fillStyle = 'green';
  ctx.fillRect(21,21,18,18);

  goTo(ctx, currentPos, step, cWidth, cHeight);

  //let i = new Creature(10, 5, step, cWidth, cHeight, ctx);
  //i.create(ctx);
  for (let a = 0; a < 3; a++) {
    let i = new Creature(getRandomInt(0, cWidth / step), getRandomInt(0, cHeight / step), step, cWidth, cHeight, ctx);
  }

  let timerId = setTimeout(function tick() {
    console.log('hi');
    timerId = setTimeout(tick, 1000);
  }, 1000);


}

function goTo(ctx, currentPos, step, cWidth, cHeight) {
  document.addEventListener('keydown', function(event) {
    if (event.code == 'KeyD' && currentPos.x <= cWidth - step) {
      ctx.fillStyle = 'white';
      ctx.fillRect(currentPos.x, currentPos.y, 18, 18);

      ctx.fillStyle = 'green';
      ctx.fillRect(currentPos.x + step, currentPos.y, 18, 18);
      currentPos.x += step;
    }
    if (event.code == 'KeyA' && currentPos.x >= step) {
      ctx.fillStyle = 'white';
      ctx.fillRect(currentPos.x, currentPos.y, 18, 18);

      ctx.fillStyle = 'green';
      ctx.fillRect(currentPos.x - step, currentPos.y, 18, 18);
      currentPos.x -= step;
    }
    if (event.code == 'KeyW' && currentPos.y >= step) {
      ctx.fillStyle = 'white';
      ctx.fillRect(currentPos.x, currentPos.y, 18, 18);

      ctx.fillStyle = 'green';
      ctx.fillRect(currentPos.x, currentPos.y - step, 18, 18);
      currentPos.y -= step;
    }
    if (event.code == 'KeyS' && currentPos.y <= cHeight - step) {
      ctx.fillStyle = 'white';
      ctx.fillRect(currentPos.x, currentPos.y, 18, 18);

      ctx.fillStyle = 'green';
      ctx.fillRect(currentPos.x, currentPos.y + step, 18, 18);
      currentPos.y += step;
    }
  })
}

function getRandomCell(arr) {
  //console.log(arr);
  let randomCell;
  randomCell = getRandomInt(0, arr.length);
  let value = arr[randomCell];
  arr.splice(randomCell, 1);
  
  return value;
}

class ControlPanel {
  constructor(main) {
    this.main = main;

    this.btnPreviousStep = document.querySelector('.btn-previous-step');
    this.btnPlayPause = document.querySelector('.btn-play-pause');
    this.btnNextStep = document.querySelector('.btn-next-step');
    this.btnReset = document.querySelector('.btn-reset');
    this.rangeDelay = document.querySelector('.range-delay');

    this.btnPreviousStep.addEventListener('click', this);
    this.btnPlayPause.addEventListener('click', this);
    this.btnNextStep.addEventListener('click', this);
    this.btnReset.addEventListener('click', this);
    this.rangeDelay.addEventListener('change', this);
  }

  handleEvent(event) {
    //console.log(event);
    if (event.target.classList.contains('btn-previous-step')) {
      console.log(event.target);
    }
    else if (event.target.classList.contains('btn-play-pause')) {
      if (!this.main.timerStatus) {
        this.main.startTimer(this.main.delay);
      }
      else if (this.main.timerStatus) {
        this.main.stopTimer();
      }
    }
    else if (event.target.classList.contains('btn-next-step')) {
      //console.log(event.target);
      this.main.nextStep();
    }
    else if (event.target.classList.contains('btn-reset')) {
      console.log(event.target);
    }
    else if (event.target.classList.contains('range-delay')) {
      //console.log(this.rangeDelay.value);
      this.main.delay = this.rangeDelay.value;
      this.main.stopTimer();
      this.main.startTimer(this.main.delay);

    }
  }


}



let body = document.querySelector('body');
body.onload = function() {
  let main = new Main();
  let controlPanel = new ControlPanel(main);
}
//body.onload = new Main();
//body.onload = new ControlPanel();