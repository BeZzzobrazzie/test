




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

  let i = new Creatures(0, 5, step);
  i.create(ctx);

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


class Creatures {
  constructor(x, y, step) {
    this.step = step;
    this.currentPos = {x: this.step * x + 1, y: this.step * y + 1};
  }


  create(ctx) {
    ctx.fillStyle = 'blue';
    ctx.fillRect(this.currentPos.x, this.currentPos.y, 18, 18);
  }

}


let body = document.querySelector('body');
body.onload = draw;