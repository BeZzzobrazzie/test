import { CAEntity } from "./ca-entity";

export class Creature extends CAEntity {
  constructor(step, cWidth, cHeight, ctx, main) {
    super(step, cWidth, cHeight, ctx, main);
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