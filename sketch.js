let interCol = [];
let stepsPerSegment = 20;

// keyframes are: time in minutes-since-midnight -> 4 anchor colors
let keyframes = [];

function setup() {
  createCanvas(500, 500);
  noStroke();
  textFont('monospace');

  keyframes = [
    { t: toMin(0, 0),   cols: [color("#000000"), color("#000000"), color("#000000"), color("#00091c")] }, // 00:00
    { t: toMin(5, 0),  cols: [color("#001133"), color("#002265"), color("#002B80"), color("#0048D9")] }, // 05:30
    { t: toMin(6, 0),   cols: [color("#002265"), color("#002B80"), color("#0048D9"), color("#007ED9")] }, // 06:00
    { t: toMin(7, 0),  cols: [color("#002B80"), color("#0048D9"), color("#007ED9"), color("#D94800")] }, // 07:30
    { t: toMin(8, 0),  cols: [color("#0048D9"), color("#007ED9"), color("#0095FF"), color("#FFAA80")] }, // 08:30
    { t: toMin(11, 0),  cols: [color("#007ED9"), color("#0095FF"), color("#7FCAFF"), color("#FFE6D9")] }, // 11:00
    { t: toMin(15, 0),  cols: [color("#005AD9"), color("#0086E5"), color("#5ABAFF"), color("#FFF6F2")] }, // 15:00
    { t: toMin(17, 0),  cols: [color("#0152C4"), color("#0077CC"), color("#0095FF"), color("#FFAA7F")] }, // 17:00
    { t: toMin(19, 0),  cols: [color("#00409A"), color("#0044CC"), color("#0055FF"), color("#FF817F")] }, // 19:00
    { t: toMin(20, 0), cols: [color("#002354"), color("#002B80"), color("#0044CC"), color("#FF7FF2")] }, // 20:30
    { t: toMin(21, 0),  cols: [color("#001533"), color("#002265"), color("#002B80"), color("#8A7FFF")] }, // 21:00
    { t: toMin(24, 0),  cols: [color("#000000"), color("#000000"), color("#000000"), color("#00091c")] }, // wraps to 00:00
  ];
}

function draw() {
  let nowMin = toMin(hour(), minute()) + second() / 60;
  // let nowMin = toMin(0,30);

  let anchors = getBlendedAnchors(nowMin);
  interCol = buildGradient(anchors, stepsPerSegment);

  drawGradient(interCol);
  timeDisplay();
}

// --- helper functions ---
function toMin(h, m) {
  return h * 60 + m;
}

function getBlendedAnchors(nowMin) {
  for (let i = 0; i < keyframes.length - 1; i++) {
    let k0 = keyframes[i];
    let k1 = keyframes[i + 1];
    let isLastSegment = (i === keyframes.length - 2);

    if (nowMin >= k0.t && (nowMin < k1.t || isLastSegment)) {
      let amt = constrain(map(nowMin, k0.t, k1.t, 0, 1), 0, 1);
      let blended = [];
      for (let j = 0; j < k0.cols.length; j++) {
        blended.push(lerpColor(k0.cols[j], k1.cols[j], amt));
      }
      return blended;
    }
  }
  return keyframes[0].cols; // before first keyframe
}

function buildGradient(anchors, steps) {
  let result = [];
  for (let i = 0; i < anchors.length - 1; i++) {
    let c1 = anchors[i];
    let c2 = anchors[i + 1];
    for (let s = 0; s < steps; s++) {
      let amt = s / steps;
      result.push(lerpColor(c1, c2, amt));
    }
  }
  result.push(anchors[anchors.length - 1]);
  return result;
}

function drawGradient(cols) {
  let heightStep = height / cols.length;
  for (let i = 0; i < cols.length; i++) {
    fill(cols[i]);
    rect(0, i * heightStep, width, heightStep);
  }
}

function timeDisplay() {
  fill(255);
  textSize(8);
  noStroke();
  text(`${nf(hour(),2)}:${nf(minute(),2)}:${nf(second(),2)}`, 10, 20);
}