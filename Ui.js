export default Meter.prototype.create = function () {
  const background = document.createElement('div')
  const foreground = document.createElement('div')
  
  background.append(foreground)

  this.fg = foreground
  this.view = background

  //bg (background) elements
  this.changeBgColor(this.bgColor)
  this.changeBgWidth(this.barWidth)
  this.changeBgHeight(this.barHeight)
  
  //fg (foreground) elements
  this.changeFgColor(this.fgColor)
  this.changeFgHeight(this.barHeight)
  this.changeFgWidth(this.barWidth)
}

// bg (background) prototypes
Meter.prototype.changeBgColor = function (bgColor) {
  this.view.style.backgroundColor = bgColor
}

Meter.prototype.changeBgWidth = function (barWidth) {
  this.view.style.width = barWidth + 'px'
}

Meter.prototype.changeBgHeight = function (barHeight) {
  this.view.style.height = barHeight + 'px'
}

// fg (foreground) prototypes
Meter.prototype.changeFgColor = function (fgColor) {
  this.fg.style.backgroundColor = fgColor
}

Meter.prototype.changeFgWidth = function (barWidth) {
  this.fg.style.width = barWidth + 'px'
}

Meter.prototype.changeFgHeight = function (barHeight) {
  this.fg.style.height = barHeight + 'px'
}


const tensionMeter = new Meter({
  barWidth: 50,
  barHeight: 250,
  fgColor: 'blue',
})

document.body.append(tensionMeter.view)