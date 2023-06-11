// Import stylesheets
import './style.css';
import Fish from './Fish.js';
import Rod from './Rod.js';
import Timer from './Timer.js';
import Meter from './Ui.js';

// Global Variables

// all fish data
const fishData = [
  [
    {
      name: 'Goldfish',
      strength: 1,
      points: 10,
    },
  ],
  [
    {
      name: 'Perch',
      strength: 3,
      points: 30,
    },
  ],
  [
    {
      name: 'Guppy',
      strength: 4,
      points: 20,
    },
  ],
  [
    {
      name: 'Carp',
      strength: 6,
      points: 30,
    },
  ],
  [
    {
      name: 'Bass',
      strength: 6,
      points: 60,
    },
  ],
  [
    {
      name: 'Trout',
      strength: 7,
      points: 40,
    },
  ],
  [
    {
      name: 'Pike',
      strength: 8,
      points: 50,
    },
  ],
  [
    {
      name: 'Salmon',
      strength: 8,
      points: 70,
    },
  ],
  [
    {
      name: 'Shark',
      strength: 9,
      points: 100,
    },
  ],
];

const fishes = [];

for (let i = 0; i < fishData.length; i++) {
  const item = fishData[i];

  fishes.push(new Fish(...item));
}

function getFish(fishes) {
  return fishes[Math.floor(Math.random() * fishes.length)];
}

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
const distanceTimer = new Timer(({ castDistance, fishName }) => {
  distanceMeter.changeLength(castDistance);

  if (distanceMeter.fgHeight >= distanceMeter.bgHeight) {
    distanceTimer.stop();
    console.log('You caught a ' + fishName);

    reelBtn.disabled = true;
    castBtn.disabled = false;
  }
}, 500);

// a timer to reduce the progress bar of the distanceMeter
const distanceTimerDecrement = new Timer((castDistance) => {
  distanceMeter.changeLength(-castDistance);

  if (distanceMeter.fgHeight <= 0) {
    distanceTimerDecrement.stop();
    console.log('Fish has got away!');

    reelBtn.disabled = true;
    castBtn.disabled = false;
  }
}, 500);

// a timer to increase the progress bar of the tensionMeter
const tensionTimer = new Timer((fishStrength) => {
  tensionMeter.changeLength(fishStrength);

  if (tensionMeter.fgHeight >= tensionMeter.bgHeight) {
    tensionTimer.stop();
    console.log('Line has Snapped');

    reelBtn.disabled = true;
    castBtn.disabled = false;
  }
}, 500);

// a timer to reduce the progress bar of the tensionMeter
const tensionTimerDecrement = new Timer((fishStrength) => {
  tensionMeter.changeLength(-fishStrength * 2);

  if (tensionMeter.fgHeight <= 0) {
    tensionTimerDecrement.stop();
  }
}, 500);

const biteTimer = new Timer((rodDistance) => {
  const castDistance = Math.floor(Math.random() * rodDistance);

  if (castDistance) {
    console.log('start');
    reelBtn.disabled = false;
    castBtn.disabled = true;

    biteTimer.stop();

    const fish = getFish(fishes);
    console.log(fish);

    // event listeners to reel in the fish
    reelBtn.addEventListener('mousedown', () => {
      tensionTimerDecrement.stop();
      distanceTimerDecrement.stop();

      tensionTimer.start(fish.strength);
      distanceTimer.start({ castDistance, fishName: fish.name });
      console.log('reeling in!');
    });

    // event listener that alters the tension and distance of the meters when letting go of the mouse click
    reelBtn.addEventListener('mouseup', () => {
      distanceTimer.stop();
      tensionTimer.stop();

      tensionTimerDecrement.start(fish.strength);
      distanceTimerDecrement.start(castDistance);
    });
  } else {
    console.log('Still Working!');
  }
}, 1000);

// event listeners to cast out the line
castBtn.addEventListener('click', () => {
  const cast = poorRod.cast();

  if (cast > 1) {
    biteTimer.start(cast);
    console.log('You cast your line out ' + cast + 'm');
  } else {
    console.log('Try again');
  }
});

const poorRod = new Rod(0, 0, 10);

reelBtn.disabled = true;

castBtn.textContent = 'Cast Line';
reelBtn.textContent = 'Reel In';

document.body.append(castBtn, reelBtn, tensionMeter.view, distanceMeter.view);
