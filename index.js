// Import stylesheets
import './style.css';
import Fish from './Fish.js';
import castBtn from './Game.js';
import Timer from './Rod.js';
import './Timer.js';
import Meter from './Ui.js';

// Global Variables
const castBtn = document.createElement('button');
const reelBtn = document.createElement('button');

reelBtn.disabled = true;

castBtn.textContent = 'Cast Line';
reelBtn.textContent = 'Reel In';

document.body.append(castBtn, reelBtn);

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
