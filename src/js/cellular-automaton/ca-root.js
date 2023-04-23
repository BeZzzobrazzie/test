import { CAField } from "./ca-field";

export class CARoot {
  constructor(canvasClass) {
    this.canvas = document.querySelector(canvasClass);
    this.cHeight = this.canvas.getAttribute('height');
    this.cWidth = this.canvas.getAttribute('width');
    this.ctx = this.canvas.getContext('2d');
    this.step = 20;

    this.cells = {};
    this.arrCells = [];

    this.canvasField = new CAField(this.cHeight, this.cWidth, this.ctx, this.step, this.cells, this.arrCells);


  }

  


}


