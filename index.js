// make the fish fight back and you cant reel in during that period
// add a shop
// add an aquarium
// add a catch or release system
// add money to spend at the shop
import 'iconify-icon';
import './style.css';
import Fish from './Fish.js';
import Rod from './Rod.js';
import Timer from './Timer.js';
import Meter from './Ui.js';
import Shop from './Shop.js';

// Global Variables
const fishermanImg = document.createElement('img');

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

// inventory

const inventory = [];

// all fish data
const fishData = [
  {
    name: 'Goldfish',
    strength: 1,
    points: 10,
    value: 1,
  },
  {
    name: 'Perch',
    strength: 3,
    points: 30,
    value: 2,
  },
  {
    name: 'Guppy',
    strength: 4,
    points: 20,
    value: 2,
  },
  {
    name: 'Carp',
    strength: 6,
    points: 30,
    value: 2,
  },
  {
    name: 'Bass',
    strength: 6,
    points: 60,
    value: 3,
  },
  {
    name: 'Trout',
    strength: 7,
    points: 40,
    value: 3,
  },
  {
    name: 'Pike',
    strength: 8,
    points: 50,
    value: 5,
  },
  {
    name: 'Salmon',
    strength: 8,
    points: 70,
    value: 6,
  },
  {
    name: 'Shark',
    strength: 9,
    points: 100,
    value: 9,
  },
];

// shop data

const shopData = [
  {
    stock: 'Small Rod',
    value: 5,
  },
  {
    stock: 'Medium Rod',
    value: 10,
  },
  {
    stock: 'Big Rod',
    value: 15,
  },
  {
    stock: 'Can of Worms',
    value: 2,
  },
  {
    stock: 'Fishing Boat',
    value: 100,
  },
];

// for loops
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
const shopBtn = document.createElement('button');

// bind new functions
const tensionMeter = new Meter({
  barWidth: 50,
  barHeight: 100,
  fgColor: 'blue',
  position: 'vertical',
});

const distanceMeter = new Meter({
  barHeight: 50,
  bgImageUrl:
    'https://streak.club/img/Mix1c2VyX2NvbnRlbnQvdXBsb2Fkcy9pbWFnZS82OTAzLmdpZg==/original/LEVk19.gif',
  fgImageUrl: 'https://i.imgur.com/QXAla8u.gif',
  position: 50,
});

// timer functions

// a timer to increase the progress bar of the distanceMeter
const distanceTimer = new Timer(({ castDistance, fishName }) => {
  distanceMeter.changeLength(castDistance * 2);

  if (distanceMeter.fgWidth >= 100) {
    distanceTimer.stop();
    tensionTimer.stop();

    fishermanImg.src =
      'https://source.unsplash.com/random/900×700/?' + fishName + ',fish,';

    console.log('You caught a ' + fishName);

    // putting the fish into the inventory
    inventory.push(fishName);

    console.log(inventory);

    tensionMeter.barReset();
    distanceMeter.barReset();

    reelBtn.disabled = true;
    castBtn.disabled = false;
  }
}, 500);

// a timer to reduce the progress bar of the distanceMeter
const distanceTimerDecrement = new Timer((castDistance) => {
  distanceMeter.changeLength(-castDistance);

  if (distanceMeter.fgWidth <= 0) {
    distanceTimerDecrement.stop();
    tensionTimerDecrement.stop();
    console.log('Fish has got away!');

    tensionMeter.barReset();
    distanceMeter.barReset();

    reelBtn.disabled = true;
    castBtn.disabled = false;
  }
}, 500);

// a timer to increase the progress bar of the tensionMeter
const tensionTimer = new Timer((fishStrength) => {
  tensionMeter.changeLength(fishStrength);

  if (tensionMeter.fgHeight >= 100) {
    tensionTimer.stop();
    distanceTimer.stop();
    console.log('Line has Snapped');
    tensionMeter.barReset();
    distanceMeter.barReset();

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
  game.getRod();
  const cast = game.currentRod.cast();

  if (cast > 1) {
    biteTimer.start(cast);
    console.log('You cast your line out ' + cast + 'm');
  } else {
    console.log('Try again');
  }
});

//event listener that grants access to the shop
shopBtn.addEventListener('click', () => {
  // removing elements - will make something better
  document.body.innerHTML = '';
  // A button to buy items in shop
  const buyBtn = document.createElement('button');
  buyBtn.textContent = 'Purchase';
  // A button to sell to the shop
  const sellBtn = document.createElement('button');
  sellBtn.textContent = 'Sell';
  // Appending shop buttons
  document.body.append(buyBtn, sellBtn);
});

shopBtn.textContent = 'Shop';

// event listeners to reel in the fish
reelBtn.addEventListener('mousedown', () => {
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

fishermanImg.classList.add('fisherman');
fishermanImg.src =
  'https://images.unsplash.com/photo-1529230117010-b6c436154f25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3907&q=80';

const row = document.createElement('div');
row.classList.add('row');
row.append(fishermanImg, tensionMeter.view);

// button icons
const btnContainer = document.createElement('div');
btnContainer.classList.add('btnContainer');
btnContainer.append(castBtn, reelBtn, shopBtn);

const castIcon = document.createElement('iconify-icon');
castIcon.icon = 'game-icons:boat-fishing';
castBtn.append(castIcon);
castBtn.classList.add('cast-button');

const reelIcon = document.createElement('iconify-icon');
reelIcon.icon = 'twemoji:fishing-pole';
reelBtn.append(reelIcon);
reelBtn.classList.add('reel-button');

const shopIcon = document.createElement('iconify-icon');
shopIcon.icon = 'twemoji:coin';
shopBtn.append(shopIcon);
shopBtn.classList.add('shop-button');

document.body.append(row, btnContainer, distanceMeter.view);
