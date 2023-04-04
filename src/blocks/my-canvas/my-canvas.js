

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

    this.createField();
    this.drawField();

    for (let i = 0; i < 10; i++) {
      new Creature(getRandomInt(0, this.cWidth / this.step), getRandomInt(0, this.cHeight / this.step), this.step, this.cWidth, this.cHeight, this.ctx, this);
      new Apple(getRandomInt(0, this.cWidth / this.step), getRandomInt(0, this.cHeight / this.step), this.step, this.cWidth, this.cHeight, this.ctx, this);
    };

    this.timer();
  }

  createField() {
    for (let y = 1, a = 1; y <= this.cHeight; y = y + this.step, a++) {
      for (let x = 1, b = 1; x <= this.cWidth; x = x + this.step, b++) {
        //console.log('a: ' + a + ' b: ' + b + ' cell: ' + ((a - 1) * (this.cWidth / this.step) + b));
        let addressCell = (a - 1) * (this.cWidth / this.step) + b;
        this.cells[addressCell] = {x: x, y: y, size: 18};
      }
    }


    for (let y = 1, a = 1; y <= this.cHeight; y = y + this.step, a++) {
      for (let x = 1, b = 1; x <= this.cWidth; x = x + this.step, b++) {
        let addressCell = (a - 1) * (this.cWidth / this.step) + b;
        this.cells[addressCell].up = this.cells[addressCell - this.cWidth / this.step];
        this.cells[addressCell].right = this.cells[addressCell + 1];
        this.cells[addressCell].bottom = this.cells[addressCell + this.cWidth / this.step];
        this.cells[addressCell].left = this.cells[addressCell - 1];
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


  timer() {
    let thisObj = this;
    let timerId = setTimeout(function tick() {
      for (let key in thisObj.objects.creatures) {
        thisObj.objects.creatures[key].go();
      }
      timerId = setTimeout(tick, 2000);
    }, 2000, thisObj);
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
    let randomCell;

    while (true) {
      randomCell = getRandomInt(0, this.cWidth / this.step * this.cHeight / this.step);
      if (this.main.cells[randomCell].obj == undefined) {
        break;
      }
    }

    this.currentCell = this.main.cells[randomCell];
    this.currentCell.obj = this;

    this.name = getId(this.main.objects[type]);
    this.main.objects[type][this.name] = this;

    
    ctx.fillStyle = color;
    ctx.fillRect(this.currentCell.x, this.currentCell.y, this.currentCell.size, this.currentCell.size);

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



  }

  sense() {
    
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

  go() {
    let direction = getRandomInt(1, 5);
    //console.log(direction);


    if (direction == 1 && this.currentCell.y >= this.step && this.currentCell.up.obj == undefined) { // up
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(this.currentCell.x, this.currentCell.y, this.currentCell.size, this.currentCell.size);
      this.currentCell.obj = undefined;

      this.ctx.fillStyle = 'blue';
      this.ctx.fillRect(this.currentCell.x, this.currentCell.y - this.step, this.currentCell.size, this.currentCell.size);
      this.currentCell = this.currentCell.up;
      this.currentCell.obj = this;

      //console.log('up');
    }
    if (direction == 2 && this.currentCell.x <= this.cWidth - this.step && this.currentCell.right.obj == undefined) { // right
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(this.currentCell.x, this.currentCell.y, this.currentCell.size, this.currentCell.size);
      this.currentCell.obj = undefined;

      this.ctx.fillStyle = 'blue';
      this.ctx.fillRect(this.currentCell.x + this.step, this.currentCell.y, this.currentCell.size, this.currentCell.size);
      this.currentCell = this.currentCell.right;
      this.currentCell.obj = this;

      //console.log('right');
    }
    if (direction == 3 && this.currentCell.y <= this.cHeight - this.step && this.currentCell.bottom.obj == undefined) { //bottom
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(this.currentCell.x, this.currentCell.y, this.currentCell.size, this.currentCell.size);
      this.currentCell.obj = undefined;

      this.ctx.fillStyle = 'blue';
      this.ctx.fillRect(this.currentCell.x, this.currentCell.y + this.step, this.currentCell.size, this.currentCell.size);
      this.currentCell = this.currentCell.bottom;
      this.currentCell.obj = this;

      //console.log('bottom');
    }
    if (direction == 4 && this.currentCell.x >= this.step && this.currentCell.left.obj == undefined) { // left
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(this.currentCell.x, this.currentCell.y, this.currentCell.size, this.currentCell.size);
      this.currentCell.obj = undefined;

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


let body = document.querySelector('body');
body.onload = new Main();