export class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.opacity = Math.random() * 0.25;
    this.size = Math.random() * 2 + 2; // Particle diameter varies from 2px to 4px
    // this.blur = Math.random() + Math.random();
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.01;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.lineWidth = 0;
    ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`; // Particle color is white
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    // ctx.filter = `blur(${this.blur}px)`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}
