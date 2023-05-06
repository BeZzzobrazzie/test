import { getRandomCell, getId } from "./ca-func";

export class CAEntity {
  constructor(step, cWidth, cHeight, ctx, main, color) {
    this.step = step;
    this.currentCell;
    this.cWidth = cWidth;
    this.cHeight = cHeight;
    this.ctx = ctx;
    this.main = main;
    this.name;
    this.type;
    this.color = color;
    this.enegry = 30;
  }

  create(color, cell = -1) {
    let targetCell;
    if (cell == -1) {
      targetCell = getRandomCell(this.main.listFreeCells);
    }
    else {
      targetCell = cell;
    }
    

    this.currentCell = this.main.cells[targetCell];
    this.currentCell.obj = this;

    this.name = getId(this.main.objects[this.type]);
    this.main.objects[this.type][this.name] = this;

    
    this.drawEntity(this.ctx, color, this.currentCell);

  }

  die() {
    if (this.name in this.main.objects[this.type]) {
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(this.currentCell.x, this.currentCell.y, this.step - 2, this.step - 2);
      this.currentCell.obj = null;
      this.main.listFreeCells[this.currentCell.addressCell] = 1;
      delete this.main.objects[this.type][this.name];
    }
  }

  drawEntity(ctx, color, cell) {
    ctx.fillStyle = color;
    ctx.fillRect(cell.x, cell.y, this.step - 2, this.step - 2);
  }

}