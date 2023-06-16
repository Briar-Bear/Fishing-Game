// reset tension meter back to 0 when fish got away
// something wrong on line 226

// Import stylesheets
import './style.css';
import Fish from './Fish.js';
import Rod from './Rod.js';
import Timer from './Timer.js';
import Meter from './Ui.js';

// Global Variables

const game = {
  currentFish: null,
  currentRod: null,
  castDistance: 0,
  fish: [],
  rod: [],
  getFish() {
    this.currentFish = this.fish[Math.floor(Math.random() * this.fish.length)];
  },
  getRod() {
    this.currentRod = this.rod[Math.floor(Math.random() * this.rod.length)];
  },
};

const fishermanImg = document.createElement('img');
fishermanImg.src = './imgs/fisherman.jpg';

document.body.append(fishermanImg);

// all fish data
const fishData = [
  {
    name: 'Goldfish',
    strength: 1,
    points: 10,
  },
  {
    name: 'Perch',
    strength: 3,
    points: 30,
  },
  {
    name: 'Guppy',
    strength: 4,
    points: 20,
  },
  {
    name: 'Carp',
    strength: 6,
    points: 30,
  },
  {
    name: 'Bass',
    strength: 6,
    points: 60,
  },
  {
    name: 'Trout',
    strength: 7,
    points: 40,
  },
  {
    name: 'Pike',
    strength: 8,
    points: 50,
  },
  {
    name: 'Salmon',
    strength: 8,
    points: 70,
  },
  {
    name: 'Shark',
    strength: 9,
    points: 100,
  },
];

for (let i = 0; i < fishData.length; i++) {
  const item = fishData[i];

  game.fish.push(new Fish(item));
}

// all rod data
const rodData = [
  {
    name: 'Poor Rod',
    tension: 0,
    distance: 0,
    range: 10,
  },
  {
    name: 'Good Rod',
    tension: 0,
    distance: 0,
    range: 10,
  },
  {
    name: 'Great Rod',
    tension: 0,
    distance: 0,
    range: 10,
  },
];

for (let i = 0; i < rodData.length; i++) {
  const rodItem = rodData[i];

  game.rod.push(new Rod(rodItem));
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
  distanceMeter.changeLength(castDistance * 2);

  if (
    distanceMeter.fgHeight >= distanceMeter.bgHeight ||
    tensionMeter.fgHeight >= tensionMeter.bgHeight
  ) {
    distanceTimer.stop();

    const caughtImg = document.createElement('img');
    caughtImg.src = './imgs/fishCaught.jpg';

    document.body.append(caughtImg);

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

  if (
    tensionMeter.fgHeight >= tensionMeter.bgHeight ||
    distanceMeter.fgHeight >= distanceMeter.bgHeight
  ) {
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

    game.getFish();
    game.castDistance = castDistance;
    console.log(game.currentFish);
  } else {
    console.log('Still Working!');
  }
}, 1000);

// event listeners to cast out the line
castBtn.addEventListener('click', () => {
  const castImg = document.createElement('img');
  castImg.src = './imgs/casting.jpg';

  document.body.append(castImg);

  game.getRod();
  const cast = game.currentRod.cast();

  if (cast > 1) {
    biteTimer.start(cast);
    console.log('You cast your line out ' + cast + 'm');
  } else {
    console.log('Try again');
  }
});

// event listeners to reel in the fish
reelBtn.addEventListener('mousedown', () => {
  const reelingImg = document.createElement('img');
  reelingImg.src = './imgs/reelIn.jpg';

  document.body.append(reelingImg);

  tensionTimerDecrement.stop();
  distanceTimerDecrement.stop();

  tensionTimer.start(game.currentFish.strength);
  distanceTimer.start({
    castDistance: game.castDistance,
    fishName: game.currentFish.name,
  });
  console.log('reeling in!');
});

// event listener that alters the tension and distance of the meters when letting go of the mouse click
reelBtn.addEventListener('mouseup', () => {
  distanceTimer.stop();
  tensionTimer.stop();

  tensionTimerDecrement.start(game.currentFish.strength);
  distanceTimerDecrement.start(game.castDistance);
});

reelBtn.disabled = true;

castBtn.textContent = 'Cast Line';
reelBtn.textContent = 'Reel In';

document.body.append(castBtn, reelBtn, tensionMeter.view, distanceMeter.view);
