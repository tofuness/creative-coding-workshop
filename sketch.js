// Noise library
// Original author https://twitter.com/etiennejcb/status/912105839107952643
// https://github.com/blindman67/SimplexNoiseJS

const seed = Date.now();
const openSimplex = openSimplexNoise(seed);

const R = 1;
const scl = 0.013;
const radius = 150;

const particles = [];

let t = 0;

function setup() {
  const canvas = createCanvas(600, 600);
  canvas.parent('#content');
  pixelDensity(1.0);

  class Particle {
    constructor() {
      this.r = Math.sqrt(random(1)) * radius;
      this.the = random(TWO_PI);
      this.y = height / 2 + this.r * Math.sin(random(TWO_PI));
      this.x = width / 2 + this.r * Math.cos(random(TWO_PI));
    }
    update(t) {
      const intensity =
        Math.pow(
          // We map from 0, radius -> 1, 0 — Further our means less intensity!
          map(dist(this.x, this.y, width / 2, height / 2), 0, radius, 1, 0),
          0.75
        ) * 200;

      const x =
        this.x +
        intensity *
          openSimplex.noise4D(
            scl * this.x,
            scl * this.y,
            R * Math.cos(TWO_PI * t),
            R * Math.sin(TWO_PI * t)
          );

      const y =
        this.y +
        intensity *
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

  for (var i = 0; i < 5000; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(0);
  t += 0.003;
  particles.forEach(p => p.update(t));
}
