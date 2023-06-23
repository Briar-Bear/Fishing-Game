export default function Meter({
  bgColor = 'black',
  fgColor = 'blue',
  barHeight = 50,
  barWidth = 100,
  position,
}) {
  this.bgColor = bgColor;
  this.fgColor = fgColor;
  this.bgHeight = barHeight;
  this.bgWidth = barWidth;
  this.fgHeight = barHeight;
  this.fgWidth = 0;
  this.position = position;
  this.view;
  this.fg;

  if (position === 'left') {
    this.fgWidth = 0;
  } else {
    this.fgHeight = barHeight;
  }

  this.create();
}

Meter.prototype.create = function () {
  const background = document.createElement('div');
  const foreground = document.createElement('div');

  background.append(foreground);

  this.fg = foreground;
  this.view = background;

  // this.view.style.transform = 'rotate(180deg)';

  //bg (background) elements
  this.changeBgColor(this.bgColor);
  this.changeBgWidth(this.bgWidth);
  this.changeBgHeight(this.bgHeight);
  this.changePosition(this.position);

  //fg (foreground) elements
  this.changeFgColor(this.fgColor);
  this.changeFgHeight(this.fgHeight);
  this.changeFgWidth(this.fgWidth);
};

// bg (background) prototypes
Meter.prototype.changeBgColor = function (bgColor) {
  this.view.style.backgroundColor = bgColor;
};

Meter.prototype.changeBgWidth = function (barWidth) {
  this.view.style.width = barWidth + '%';
};

Meter.prototype.changeBgHeight = function (barHeight) {
  this.view.style.height = barHeight + 'px';
};

// fg (foreground) prototypes
Meter.prototype.changeFgColor = function (fgColor) {
  this.fg.style.backgroundColor = fgColor;
};

Meter.prototype.changeFgWidth = function (barWidth) {
  this.fg.style.width = this.fgWidth + '%';
};

Meter.prototype.changeFgHeight = function (barHeight) {
  this.fg.style.height = this.fgHeight + 'px';
};

Meter.prototype.changeLength = function (barWidth) {
  this.fgWidth += barWidth;
  this.fg.style.width = this.fgWidth + '%';
};

Meter.prototype.changePosition = function (position) {
  if (position === 'left') {
    // this.view.style.transform = 'translate(100px) rotate(270deg)';
  }
};
