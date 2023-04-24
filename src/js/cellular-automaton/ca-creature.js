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
    console.log('до движения');
    console.log(this);
    this.decide();
    console.log('после движения');
    console.log(this);
  }

  decide() {
    //console.log(this);
    let view = this.sense();
    for (let key in view) {
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
      this.currentCell[direction].obj.die();
      this.go(direction);

    }

  }

  sleep() {

  }

  go(direction) {

    if (this.currentCell[direction] !== null && this.currentCell[direction].obj === null) { 
      console.log(this.currentCell[direction]);
      console.log(this.currentCell[direction].obj);

      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(this.currentCell.x, this.currentCell.y, this.currentCell.size, this.currentCell.size);
      this.currentCell.obj = null;

      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(this.currentCell[direction].x, this.currentCell[direction].y, this.currentCell.size, this.currentCell.size);
      this.currentCell = this.currentCell[direction];
      this.currentCell.obj = this;
    }
  }
}