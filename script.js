const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 394;
canvas.height = 394;

const mouse = {
  x: undefined,
  y: undefined,
  radius: 70,
  offsetX: 10,
  offsetY: 10,
  directionX: undefined,
  directionY: undefined,
  moving: false,
  stepCounter: 0,
};

let canvasPosition = canvas.getBoundingClientRect();
canvas.addEventListener("mousemove", function (e) {
  mouse.directionX = e.x - canvasPosition.left - mouse.x;
  mouse.directionY = e.y - canvasPosition.top - mouse.y;
  mouse.x = e.x - canvasPosition.left;
  mouse.y = e.y - canvasPosition.top;
  console.log(mouse.x, mouse.y);
  let newStep = mouse.stepCounter + 1;
  if (newStep === mouse.stepCounter) mouse.moving = false;
  else mouse.moving = true;
  mouse.stepCounter = newStep;
});
canvas.addEventListener("mouseleave", function (e) {
  mouse.x = undefined;
  mouse.y = undefined;
  mouse.moving = false;
});

const imageGrid = [];

const myImage = new Image();
myImage.src = "https://github.com/rafael-angonese.png";
const cellWidth = canvas.width / 35;
const cellHeight = canvas.height / 55;

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = cellWidth;
    this.height = cellHeight;
    this.dx = 0;
    this.dy = 0;
    this.distance = 0;
    this.baseX = x;
    this.baseY = y;
    this.drawOffsetX = 0;
    this.drawOffsetY = 0;
  }
  update() {
    let dx = mouse.x - (this.x + this.width / 2);
    let dy = mouse.y - (this.y + this.height / 2);
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (
      distance < mouse.radius &&
      this.drawOffsetX < cellWidth &&
      this.drawOffsetX > -cellWidth &&
      this.drawOffsetY < cellHeight &&
      this.drawOffsetY > -cellHeight &&
      mouse.moving
    ) {
      this.drawOffsetX -= dx;
      this.drawOffsetY -= dy;
    } else {
      if (this.drawOffsetX !== 0) {
        this.drawOffsetX -= this.drawOffsetX / 12;
      }
      if (this.drawOffsetY !== 0) {
        this.drawOffsetY -= this.drawOffsetY / 12;
      }
    }
  }
  draw() {
    ctx.drawImage(
      myImage,
      this.x + this.drawOffsetX,
      this.y + this.drawOffsetY,
      cellWidth,
      cellHeight,
      this.x,
      this.y,
      cellWidth,
      cellHeight
    );
  }
}

function init() {
  for (let y = 0; y < canvas.height; y += cellHeight) {
    for (let x = 0; x < canvas.width; x += cellWidth) {
      imageGrid.push(new Cell(x, y));
    }
  }
}
init();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < imageGrid.length; i++) {
    imageGrid[i].update();
    imageGrid[i].draw();
  }
  requestAnimationFrame(animate);
}

myImage.addEventListener("load", function () {
  console.log("loaded");
  animate();
});

window.addEventListener("resize", function () {
  canvasPosition = canvas.getBoundingClientRect();
});
