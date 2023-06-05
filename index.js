// Import stylesheets
import './style.css';
import Fish from './Fish.js';
import Rod from './Rod.js';
import Timer from './Timer.js';
import Meter from './Ui.js';

// Global Variables

// list of fish
const goldFish = new Fish('Goldfish', 1, 10);
const perch = new Fish('Perch', 3, 30);
const guppy = new Fish('Guppy', 4, 20);
const carp = new Fish('Carp', 6, 30);
const bass = new Fish('Bass', 6, 60);
const trout = new Fish('Trout', 7, 40);
const pike = new Fish('Pike', 8, 50);
const salmon = new Fish('Salmon', 8, 70);
const shark = new Fish('Shark', 9, 100);

// buttons
const castBtn = document.createElement('button');
const reelBtn = document.createElement('button');

// bind new functions
const tensionMeter = new Meter({
  barWidth: 50,
  barHeight: 250,
  fgColor: 'blue',
});

const distanceMeter = new Meter({
  barWidth: 50,
  barHeight: 250,
  fgColor: 'Green',
  position: 50,
});

distanceMeter.changePosition('left');

// timer functions

// a timer to increase the progress bar of the distanceMeter
const distanceTimer = new Timer(() => {
  distanceMeter.changeLength(10);

  if (distanceMeter.fgHeight >= distanceMeter.bgHeight) {
    distanceTimer.stop();
    console.log('You caught a fish!');
  }
}, 500);

// a timer to reduce the progress bar of the distanceMeter
const distanceTimerDecrement = new Timer(() => {
  distanceMeter.changeLength(-5);

  if (distanceMeter.fgHeight <= 0) {
    distanceTimerDecrement.stop();
    console.log('Fish has got away!');
  }
}, 500);

// a timer to increase the progress bar of the tensionMeter
const tensionTimer = new Timer(() => {
  tensionMeter.changeLength(10);

  if (tensionMeter.fgHeight >= tensionMeter.bgHeight) {
    tensionTimer.stop();
    console.log('Line has Snapped');
  }
}, 500);

// a timer to reduce the progress bar of the tensionMeter
const tensionTimerDecrement = new Timer(() => {
  tensionMeter.changeLength(-5);

  if (tensionMeter.fgHeight <= 0) {
    tensionTimerDecrement.stop();
  }
}, 500);

const biteTimer = new Timer(() => {
  const number = Math.floor(Math.random() * 5);

  if (number) {
    console.log('start');
    reelBtn.disabled = false;
    biteTimer.stop();
  } else {
    console.log('Still Working!');
  }
}, 1000);

const poorRod = new Rod(0, 0, 10);

// event listeners to cast out the line
castBtn.addEventListener('click', () => {
  const cast = poorRod.cast();

  if (cast > 1) {
    biteTimer.start();
    console.log('You cast your line out ' + cast + 'm');
  } else {
    console.log('Try again');
  }
});

// event listeners to reel in the fish
reelBtn.addEventListener('mousedown', () => {
  tensionTimer.start();
  distanceTimer.start();
  console.log('reeling in!');
});

// event listener that alters the tension and distance of the meters when letting go of the mouse click
reelBtn.addEventListener('mouseup', () => {
  distanceTimer.stop();
  tensionTimer.stop();

  tensionTimerDecrement.start();
  distanceTimerDecrement.start();
});

reelBtn.disabled = true;

castBtn.textContent = 'Cast Line';
reelBtn.textContent = 'Reel In';

document.body.append(castBtn, reelBtn, tensionMeter.view, distanceMeter.view);
