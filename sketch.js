// https://github.com/blindman67/SimplexNoiseJS

const seed = Date.now();
const openSimplex = openSimplexNoise(seed);

const R = 1.2;
const L = 160;
const scl = 0.013;
const radius = 150;

const particles = [];

let t = 0;

function setup() {
  createCanvas(600, 600);

  pixelDensity(1.0);
  class Particle {
    constructor() {
      this.r = Math.sqrt(random(1)) * radius;
      this.the = random(TWO_PI);
      this.y = height / 2 + this.r * Math.sin(random(TWO_PI));
      this.x = width / 2 + this.r * Math.cos(random(TWO_PI));
    }
    update(t) {
      const intensity = Math.pow(
        // We map from 0, radius -> 1, 0 — Further our means less intensity!
        map(dist(this.x, this.y, width / 2, height / 2), 0, radius, 1, 0),
        0.75
      );

      const x =
        this.x +
        intensity *
          L *
          openSimplex.noise4D(
            scl * this.x,
            scl * this.y,
            R * Math.cos(TWO_PI * t),
            R * Math.sin(TWO_PI * t)
          );

      const y =
        this.y +
        intensity *
          L *
          openSimplex.noise4D(
            100 + scl * this.x,
            scl * this.y,
            R * Math.cos(TWO_PI * t),
            R * Math.sin(TWO_PI * t)
          );

      stroke(255);
      strokeWeight(1);
      point(x, y);
    }
  }

  for (var i = 0; i < 4000; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(0);
  t += 0.0034;
  particles.forEach(p => p.update(t));
}
