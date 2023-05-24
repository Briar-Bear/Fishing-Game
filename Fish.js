// fish function and prototypes
export default function Fish(name, strength, points) {
  this.name = name;
  this.strength = strength;
  this.points = points;
}

Fish.prototype.caught = function () {
  return (
    'You caught a ' + this.name + '!' + ' Thats ' + this.points + ' points!'
  );
};
