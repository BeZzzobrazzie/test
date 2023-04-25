import { CAEntity } from "./ca-entity";
import { convertIntToDirection, getRandomInt } from "./ca-func";

export class CACreature extends CAEntity {
  constructor(step, cWidth, cHeight, ctx, main, color) {
    super(step, cWidth, cHeight, ctx, main, color);
    this.type = 'creatures';
    this.create(color);
  }

  exist() {
    //let direction = getRandomInt(1, 5);
    //this.sense();
    //this.decide();

    console.log(this.color + ' ' + this.enegry);
    this.enegry -= 1;
    if(this.enegry <= 0) {
      this.die();
      return;
    }
    this.decide();

  }

  decide() {
    //console.log(this);
    let view = this.sense();
    for (let key in view) {
      if (this.enegry >= 50) {
        this.reproduce();
        return;
      }
      if (view[key] == 'apples') {
        //console.log('direction: ' + key + ' value: ' + view[key]);
        this.eat(key);
        return;
      }
    }
    this.go(convertIntToDirection(getRandomInt(1, 5)));

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

  

  eat(direction) {
    if (this.currentCell[direction].obj.type == 'apples') {
      this.enegry += 10;
      this.currentCell[direction].obj.die();
      this.go(direction);

    }

  }

  sleep() {

  }

  reproduce() {
    console.log('reproduce');
    this.enegry -= 30;
    
  }

  go(direction) {

    if (this.currentCell[direction] !== null && this.currentCell[direction].obj === null) { 

      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(this.currentCell.x, this.currentCell.y, this.currentCell.size, this.currentCell.size);
      this.currentCell.obj = null;
      this.main.arrCells.push(this.currentCell.addressCell);


      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(this.currentCell[direction].x, this.currentCell[direction].y, this.currentCell.size, this.currentCell.size);
      this.currentCell = this.currentCell[direction];
      this.currentCell.obj = this;

      this.main.arrCells.splice(this.main.arrCells.indexOf(this.currentCell.addressCell), 1);

      
    }
  }
}