

export class CAField {
  constructor(cHeight, cWidth, ctx, step, cells, arrCells) {
    this.createLogicField(cHeight, cWidth, step, cells, arrCells);
    this.drawField(cHeight, cWidth, ctx, step);
  }

  drawField(cHeight, cWidth, ctx, step) {
    for (let i = 0; i <= cWidth; i = i + step) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, cHeight);
      ctx.stroke();
      ctx.closePath();
    }
    for (let i = 0; i <= cHeight; i = i + step) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(cWidth, i);
      ctx.stroke();
      ctx.closePath();
    }  
  }

  createLogicField(cHeight, cWidth, step, cells, arrCells) {
    for (let y = 1, a = 1; y <= cHeight; y = y + step, a++) {
      for (let x = 1, b = 1; x <= cWidth; x = x + step, b++) {
        let addressCell = (a - 1) * (cWidth / step) + b;
        cells[addressCell] = {obj: null, addressCell: addressCell, x: x, y: y, size: step - 2};
        arrCells[addressCell - 1] = addressCell;

        // a - строка, b - столбец
        // a = ceil(addressCell / cWidth)
        // b = addressCell % cWidth
        // x = (b - 1) * 20 + 1
        // y = (a - 1) * 20 + 1
      }
    }

    for (let y = 1, a = 1; y <= cHeight; y = y + step, a++) {
      for (let x = 1, b = 1; x <= cWidth; x = x + step, b++) {
        let addressCell = (a - 1) * (cWidth / step) + b;

        if (addressCell - cWidth / step <= 0) {
          cells[addressCell].up = null;
        }
        else {
          cells[addressCell].up = cells[addressCell - cWidth / step];
        }

        if (addressCell + 1 > cWidth / step * a) {
          cells[addressCell].right = null;
        }
        else {
          cells[addressCell].right = cells[addressCell + 1];
        }

        if (addressCell + cWidth / step > cWidth / step * cHeight / step) {
          cells[addressCell].bottom = null;
        }
        else {
          cells[addressCell].bottom = cells[addressCell + cWidth / step];
        }

        if (addressCell - 1 <= cWidth / step * a - cWidth / step) {
          cells[addressCell].left = null;
        }
        else {
          cells[addressCell].left = cells[addressCell - 1];
        }
      }
    }

    // console.log("Object cells: ");
    // console.log(cells);
  }

}

