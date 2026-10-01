let h = hour();
let m = minute();
let s = second();

let interCol = [];
let rectNum = 12;

let colors = 4;

let colorSetA = []; // 00:00
let colorSetB = []; // 05:30
let colorSetC = []; // 06:00
let colorSetD = []; // 07:30
let colorSetE = []; // 08:30
let colorSetF = []; // 11:00
let colorSetG = []; // 15:00
let colorSetH = []; // 17:00
let colorSetI = []; // 19:00
let colorSetJ = []; // 20:30
let colorSetK = []; // 21:00
let colorSetL = []; // 00:00 

let c1; 
let c2; 
let currentCol;

function setup() {
  createCanvas(400, 400);
  noStroke();

  let stepsPerSegment = 20; // how smooth each gradient band is
  interCol = [];

  // loop over each pair of adjacent colors
  for (let i = 0; i < colors.length - 1; i++) {
      
    if (h > 0 && h > 5) {
      c1 = colorSetA[i];
      c2 = colorSetA[i + 1];
    } else if (h > 14 && h < 15) {
      c1 = colorSetB[i]
      c2 = colorSetB[i + 1];
    } else {
      c1 = colorSetA[i];
      c2 = colorSetA[i + 1];
    }


    // loop over interpolation amounts between them
    for (let s = 0; s < stepsPerSegment; s++) {
      let amt = s / stepsPerSegment; // 0 to <1
      interCol.push(lerpColor(c1, c2, amt));
    }
  }

  interCol.push(color[colors.length - 1]); // add the final color exactly

  // now draw a rect per entry in interCol
  let heightStep = height / interCol.length;
  for (let i = 0; i < interCol.length; i++) {
    fill(interCol[i]);
    rect(0, i * heightStep, width, heightStep);
  }

}

function draw() {
  timeDisplay();
}

function timeDisplay() {


  fill(255);
  text(`${h}:${m}:${s}`, 10,10)
}

function drawGrads() {

}