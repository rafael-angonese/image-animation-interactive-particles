const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 394;
canvas.height = 394;

const mouse = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    offsetX: 10,
    offsetY: 10,
}
let canvasPosition = canvas.getBoundingClientRect();
canvas.addEventListener('mousemove', function(e){
    mouse.x = e.x - canvasPosition.left;
    mouse.y = e.y - canvasPosition.top;
    console.log(mouse.x, mouse.y)
});

const imageGrid = [];

const myImage = new Image();
myImage.src = "https://github.com/rafael-angonese.png";
const cellWidth = canvas.width/20;
const cellHeight = canvas.height/30;

class Cell {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = cellWidth;
        this.height = cellHeight;
        this.dx = 0;
        this.dy = 0;
        this.distance = 0;
      this.offset = 0;
    }
    update(){
        this.dx = mouse.x - this.x;
        this.dy = mouse.y - this.y;
        this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
      if (this.distance > 300) this.distance = 300;
      this.offset = (350 - this.distance)/100;
    }
    draw(){
        ctx.drawImage(myImage, this.x + this.dx/10 * this.offset, this.y + this.dy/10 * this.offset, cellWidth, cellHeight, this.x, this.y, cellWidth, cellHeight);
    }
}

function init(){
    for (let y = 0; y < canvas.height; y += cellHeight){
        for (let x = 0; x < canvas.width; x += cellWidth){
            imageGrid.push(new Cell(x, y));
        }
    }
}
init();

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < imageGrid.length; i++){
        imageGrid[i].update();
        imageGrid[i].draw();
    }
    requestAnimationFrame(animate);
}

myImage.addEventListener('load', function(){
    console.log('loaded');
    animate();
});

window.addEventListener('resize', function(){
    canvasPosition = canvas.getBoundingClientRect();
})
