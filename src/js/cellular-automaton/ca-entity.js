import { getRandomCell } from "./ca-func";

export class CAEntity {
  constructor(step, cWidth, cHeight, ctx, main) {
    this.step = step;
    this.currentCell;
    this.cWidth = cWidth;
    this.cHeight = cHeight;
    this.ctx = ctx;
    this.main = main;
    this.name;
    this.type;
  }

  create(color, type) {
    let randomCell = getRandomCell(this.main.arrCells);

    this.currentCell = this.main.cells[randomCell];
    this.currentCell.obj = this;

    //this.name = getId(this.main.objects[type]);
    //this.main.objects[type][this.name] = this;

    
    this.drawEntity(this.ctx, color, this.currentCell);
    // ctx.fillStyle = color;
    // ctx.fillRect(this.currentCell.x, this.currentCell.y, this.currentCell.size, this.currentCell.size);

    //console.log(this);
  }

  // die(ctx) {
  //   if (this.name in this.main.objects[type]) {
  //     ctx.fillStyle = 'white';
  //     ctx.fillRect(this.currentPos.x, this.currentPos.y, 18, 18);
  //     delete this.main.objects[type][this.name];
  //   }
  // }

  drawEntity(ctx, color, cell) {
    ctx.fillStyle = color;
    ctx.fillRect(cell.x, cell.y, this.step - 2, this.step - 2);
  }

}