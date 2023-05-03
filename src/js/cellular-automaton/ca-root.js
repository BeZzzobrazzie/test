import { CAField } from "./ca-field";
import { CACreature } from "./ca-creature";
import { CAApple } from "./ca-apple";
import { randColor } from "./ca-func";

export class CARoot {
  constructor(canvasClass) {
    this.canvas = document.querySelector(canvasClass);
    this.cHeight = this.canvas.getAttribute('height');
    this.cWidth = this.canvas.getAttribute('width');
    this.ctx = this.canvas.getContext('2d');
    this.step = 20;

    this.cells = {};
    this.arrCells = [];
    this.listFreeCells = {};
    this.objects = {creatures: {}, apples: {},};

    this.timerId;
    this.timerStatus = false;
    this.delay = 1000;

    this.canvasField = new CAField(this.cHeight, this.cWidth, this.ctx, this.step, this.cells, this.arrCells, this.listFreeCells);
    //let i = new CAEntity(this.step, this.cWidth, this.cHeight, this.ctx, this);
    //i.create('green');
    console.log(this.listFreeCells);

    for (let index = 0; index < 1; index++) {
      new CACreature(this.step, this.cWidth, this.cHeight, this.ctx, this, randColor());
      new CAApple(this.step, this.cWidth, this.cHeight, this.ctx, this, 'orange');
    }

    // let i = new CACreature(this.step, this.cWidth, this.cHeight, this.ctx, this, '#0000ff');
    // let b = new CACreature(this.step, this.cWidth, this.cHeight, this.ctx, this, '#ffff00');
    // let r = new CACreature(this.step, this.cWidth, this.cHeight, this.ctx, this, '#800080');

    //let m = new CAApple(this.step, this.cWidth, this.cHeight, this.ctx, this, 'orange');




  }

  timer(delay) {
    let thisObj = this;
    thisObj.timerId = setTimeout(function tick() {
      for (let key in thisObj.objects.creatures) {
        thisObj.objects.creatures[key].exist();
      }
      for (let index = 0; index < 1; index++) {
        new CAApple(thisObj.step, thisObj.cWidth, thisObj.cHeight, thisObj.ctx, thisObj, 'orange');
      }
      console.log(thisObj.listFreeCells);
      console.log(thisObj.objects);
      console.log(thisObj.cells);

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


