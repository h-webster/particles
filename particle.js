ATTRACTION_FORCE = 1;

class Particle {
  constructor(x, y, radius, id) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.id = id;
    
    let direction1 = random(-1, 1);
    let direction2 = random(-1, 1);
    let rng = random(0, 1);
    let inverse_rng = 1-rng;
    rng *= (direction1 < 0) ? -1 : 1;
    inverse_rng *= (direction2 < 0) ? -1 : 1;
    let speed = 0.5;
    this.vx = rng * (30-radius) * 0.5;
    this.vy = inverse_rng * (30-radius) * 0.5;
    
    if (this.radius > 30) {
      this.vx = 0.1;
      this.vy = 0.1;
    }
  }
  Render() {
    circle(this.x, this.y, this.radius);
  }
  EdgeBounce() {
    if (this.x > width || this.x < 0) {
      this.vx *= -0.98;
      if (this.x > width) {
        this.x = width;
      } else if (this.x < 0) {
        this.x = 0;
      }
    }
    if (this.y > height || this.y < 0) {
      this.vy *= -0.98;
      if (this.y > height) {
        this.y = height;
      } else if (this.y < 0) {
        this.y = 0;
      }
    }
  }
  Simulate() {
    this.EdgeBounce();
    
    this.x += this.vx;
    this.y += this.vy;
  }
}