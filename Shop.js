export function Shop(stock, value) {
  this.stock = stock;
  this.value = value;
}

Shop.prototype.sold = function () {
  return 'you brought a ' + this.stock + ' for ' + this.value + '!';
};
