// Rod function and prototypes
export default function Rod({ tension, distance, range }) {
  this.tension = tension;
  this.distance = distance;
  this.range = range;
  // this.timer = new Timer();
}

Rod.prototype.randomNumber = function (max) {
  return Math.floor(Math.random() * max);
};

Rod.prototype.cast = function () {
  return this.randomNumber(this.range);
};

Rod.prototype.lineTension = function (tensionNumber) {
  return this.tension();
};

Rod.prototype.fishDistance = function () {
  return this.distance(20 + Math.floor(Math.random() * 60));
};
