import { CAField } from "./ca-field";
import { CAEntity } from "./ca-entity";
import { CACreature } from "./ca-creature";
import { CAApple } from "./ca-apple";

export class CARoot {
  constructor(canvasClass) {
    this.canvas = document.querySelector(canvasClass);
    this.cHeight = this.canvas.getAttribute('height');
    this.cWidth = this.canvas.getAttribute('width');
    this.ctx = this.canvas.getContext('2d');
    this.step = 20;

    this.cells = {};
    this.arrCells = [];
    this.objects = {creatures: {}, apples: {},};

    this.timerId;
    this.timerStatus = false;
    this.delay = 1000;

    this.canvasField = new CAField(this.cHeight, this.cWidth, this.ctx, this.step, this.cells, this.arrCells);
    //let i = new CAEntity(this.step, this.cWidth, this.cHeight, this.ctx, this);
    //i.create('green');

    // for (let index = 0; index < 2; index++) {
    //   new CACreature(this.step, this.cWidth, this.cHeight, this.ctx, this, 'yellow');
    // }

    let i = new CACreature(this.step, this.cWidth, this.cHeight, this.ctx, this, 'blue');
    let b = new CACreature(this.step, this.cWidth, this.cHeight, this.ctx, this, 'yellow');
    let m = new CAApple(this.step, this.cWidth, this.cHeight, this.ctx, this, 'orange');

    

  }

  timer(delay) {
    let thisObj = this;
    thisObj.timerId = setTimeout(function tick() {
      for (let key in thisObj.objects.creatures) {
        thisObj.objects.creatures[key].exist();
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


