
let particles = [];
let slider;
let mouseInteraction;
let showLines;
let pAmount;
function setup() {
  createCanvas(windowWidth, windowHeight);
  CreateParticles();
  slider = createSlider(1, 150, 70);
  slider.position(220, 5);
  slider.size(80);
  pAmount = createSlider(0, 300, 50);
  pAmount.position(200, 30);
  mouseInteraction = createSlider(0, 1, 1);
  mouseInteraction.position(580, 5);
  mouseInteraction.size(70);
  showLines = createSlider(0, 1, 1);
  showLines.position(580, 30);
  showLines.size(70);
  //particles.push(new Particle(width/2, height/2, 70, 51));
}

function particleAdjust() {
    while (particles.length != pAmount.value()) {
        if (pAmount.value() > particles.length) {
            NewParticle();
        } else if (pAmount.value() < particles.length) {
            let randomIndex = Math.floor(Math.random() * particles.length);

            particles.splice(randomIndex, 1)[0];
        }
    }
}

function texts() {
    fill(0,0,0);
    textSize(20);
    text(`Attraction Force (${slider.value()})`, 20, 20);
    text(`Particles (${pAmount.value()})`, 20, 40);

    particleAdjust();

    let isOn;
    if (mouseInteraction.value() == 1) {
        isOn = "On";
    } else {
        isOn = "Off";
    }
    text(`Mouse Interaction? (${isOn})`, 360, 20);
    
    if (showLines.value() == 1) {
        isOn = "On";
    } else {
        isOn = "Off";
    }
    text(`Show Lines (${isOn})`, 400, 45);
    fill(255,255,255);
}

function NewParticle() {
    let rx = random(0, width);
    let ry = random(0, height);
    let rr = random(15, 30);
    particles.push(new Particle(rx, ry, rr, particles.length));
}

function CreateParticles() {
  for (let i = 0; i < 75; i++) {
    NewParticle();
  }
}

function drawLines() {
  let lines = [];
  let mouseAttraction = true;
  for (let a of particles) {
    if (mouseInteraction.value() == 1) {
      fill(0, 200, 0);
      circle(mouseX, mouseY, 20);
      fill (255, 255, 255);
      let md = dist(a.x, a.y, mouseX, mouseY);
      if (md < slider.value()) {
        if (showLines.value() == 1) {
            line(a.x, a.y, mouseX, mouseY);
        }
        let mx = mouseX - a.x;
        let my = mouseY - a.y;
        const MOUSE_ATTRACTION = 0.05;
        a.x += mx * MOUSE_ATTRACTION;
        a.y += my * MOUSE_ATTRACTION;
      }
    }
    for (let b of particles) {
      if (a.id == b.id || a.radius > b.radius) {
        continue;
      }
      // a is smaller than b
      let d = dist(a.x, a.y, b.x, b.y);
      if (d < slider.value()) {
        let dx = b.x - a.x;
        let dy = b.y - a.y;
        if (showLines.value() == 1) {
            line(a.x, a.y, b.x, b.y);
        }
        let ef = ceil(d);
        let ATTRACTION = 0.002;
        //console.log(d);
        a.vx += dx * ATTRACTION;
        a.vy += dy * ATTRACTION;
        fill(255,0,0);
        //circle(a.x, a.y, 5);
        fill(255,255,255);
        
        //try to not go inside circle
        stroke(100,200,3);
        //line(a.x,a.y, a.x, a.y + a.radius + b.radius);
        stroke(0, 0, 0);
        let overlap = a.radius + b.radius - d;
        if (overlap > 0) {
          // Normalize the direction vector
          let norm = createVector(dx, dy).normalize();
          // Move particle a out of particle b
          a.vx -= norm.x; // Move half the overlap distance
          a.vy -= norm.y; // Move half the overlap distance
        }
        let max = 2;
        if (a.vx > max) {
          a.vx = max;
        } else if (a.vy > max) {
          a.vy = max;
        } else if (a.vx < -max) {
          a.vx = -max;
        } else if (a.vy < -max) {
          a.vy = -max;
        }
      }
    }
  }
}

function draw() {
  background(220);
  for (let p of particles) {
    p.Simulate();
    p.Render();
  }
  drawLines();
  texts();
}