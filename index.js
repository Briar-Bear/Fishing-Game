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
const biteTimer = new Timer();
const poorRod = new Rod(0, 0, 10);

const tensionMeter = new Meter({
  barWidth: 50,
  barHeight: 250,
  fgColor: 'blue',
});

const distanceMeter = new Meter({
  barWidth: 50,
  barHeight: 250,
  fgColor: 'black',
  position: 50,
});

// bind events

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
  console.log('reeling in!');
});

// event listener that alters the tension and distance of the meters when letting go of the mouse click
reelBtn.addEventListener('mouseup', () => {});

reelBtn.disabled = true;

castBtn.textContent = 'Cast Line';
reelBtn.textContent = 'Reel In';

document.body.append(castBtn, reelBtn, tensionMeter.view, distanceMeter.view);
