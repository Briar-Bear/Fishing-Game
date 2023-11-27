// fish function and prototypes
export default function Fish({ name, strength, points, value }) {
  this.name = name;
  this.strength = strength;
  this.points = points;
  this.value = value;
}

Fish.prototype.caught = function () {
  return (
    'You caught a ' + this.name + '!' + ' Thats ' + this.points + ' points!'
  );
};
