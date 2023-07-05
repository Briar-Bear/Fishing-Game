export default function Meter({
  bgColor = 'black',
  fgColor = '',
  bgImageUrl = '',
  fgImageUrl = '',
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
  this.heightUnit = 'px';
  this.widthUnit = '%';

  if (position === 'vertical') {
    this.fgHeight = 0;
    this.fgWidth = barWidth;
    this.heightUnit = '%';
    this.widthUnit = 'px';
    this.bgHeight = 'auto';
  } else {
    this.fgHeight = barHeight;
  }

  this.create();

  if (bgImageUrl) {
    this.changeBgImg(bgImageUrl);
  }

  if (fgImageUrl) {
    this.changeFgImg(fgImageUrl);
  }
}

Meter.prototype.create = function () {
  const background = document.createElement('div');
  const foreground = document.createElement('div');

  background.append(foreground);

  this.fg = foreground;
  this.view = background;

  if (this.position === 'vertical') {
    this.view.style.display = 'flex';
    this.view.style.flexDirection = 'column-reverse';
    this.view.style.flexShrink = '0';
  }

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

Meter.prototype.changeBgImg = function (bgImageUrl) {
  this.view.style.backgroundImage = 'url(' + bgImageUrl + ')';
  this.view.style.backgroundSize = 'contain';
};

Meter.prototype.changeBgWidth = function (barWidth) {
  this.view.style.width = barWidth + this.widthUnit;
};

Meter.prototype.changeBgHeight = function (barHeight) {
  this.view.style.height = barHeight + this.heightUnit;
};

// fg (foreground) prototypes
Meter.prototype.changeFgColor = function (fgColor) {
  this.fg.style.backgroundColor = fgColor;
};

Meter.prototype.changeFgImg = function (fgImageUrl) {
  this.fg.style.backgroundImage = 'url(' + fgImageUrl + ')';
  this.fg.style.backgroundSize = 50 + 'px';
  this.fg.style.backgroundRepeat = 'no-repeat';
  this.fg.style.backgroundPositionX = 'right';
};

Meter.prototype.changeFgWidth = function (barWidth) {
  this.fg.style.width = this.fgWidth + this.widthUnit;
};

Meter.prototype.changeFgHeight = function (barHeight) {
  this.fg.style.height = this.fgHeight + this.heightUnit;
};

Meter.prototype.changeLength = function (barNumber) {
  if (barNumber > 100) {
    barNumber = 100;
  }

  if (this.position === 'vertical') {
    this.fgHeight += barNumber;
    this.fg.style.height = this.fgHeight + this.heightUnit;
  } else {
    this.fgWidth += barNumber;
    this.fg.style.width = this.fgWidth + this.widthUnit;
  }
};

Meter.prototype.barReset = function () {
  const barNumber = 0;

  if (this.position === 'vertical') {
    this.fgHeight = barNumber;
    this.fg.style.height = this.fgHeight + this.heightUnit;
  } else {
    this.fgWidth = barNumber;
    this.fg.style.width = this.fgWidth + this.widthUnit;
  }
};

Meter.prototype.changePosition = function (position) {
  if (position === 'vertical') {
    // this.view.style.transform = 'translate(100px) rotate(270deg)';
  }
};
