// Timer Functions and prototypes
export default function Timer (duration, callback) {
  this.duration = duration
  this.callback = callback
  this.id
}

Timer.prototype.start = function () {
  this.id = setInterval(this.duration, this.callback)
}

Timer.prototype.stop = function () {
  clearInterval(this.id)
}

const biteTimer = new Timer (() => {
  const number = Math.floor(Math.random() * 5)
   
  if(number) {
    console.log('start')
    reelBtn.disabled = false
    biteTimer.stop()
  }  else {
    console.log('Still Working!')
  }
}, 1000)