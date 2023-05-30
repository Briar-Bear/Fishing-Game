// Timer Functions and prototypes
export default function Timer(callback, duration) {
  this.callback = callback;
  this.duration = duration;
  this.id;
}

Timer.prototype.start = function () {
  this.id = setInterval(this.callback, this.duration);
};

Timer.prototype.stop = function () {
  clearInterval(this.id);
};
