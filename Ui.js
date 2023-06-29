export default function Meter({
  bgColor = 'black',
  fgColor = 'blue',
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

  if (position === 'left') {
    this.fgWidth = 0;
    this.heightUnit = '%';
    this.widthUnit = 'px';
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
  this.view.style.backgroundImage = 'url(' + fgImageUrl + ')';
  this.view.style.backgroundSize = 50 + 'px';
  this.view.style.backgroundRepeat = 'no-repeat';
};

Meter.prototype.changeFgWidth = function (barWidth) {
  this.fg.style.width = this.fgWidth + this.widthUnit;
};

Meter.prototype.changeFgHeight = function (barHeight) {
  this.fg.style.height = this.fgHeight + this.heightUnit;
};

Meter.prototype.changeLength = function (barNumber) {
  if (this.posotion !== 'left') {
    this.fgWidth += barNumber;
    this.fg.style.width = this.fgWidth + this.widthUnit;
  } else {
    this.fgHeight += barNumber;
    this.fg.style.height = this.fgHeight + this.heightUnit;
  }
};

Meter.prototype.changePosition = function (position) {
  if (position === 'left') {
    // this.view.style.transform = 'translate(100px) rotate(270deg)';
  }
};
