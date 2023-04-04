class Difference {
  constructor(parent, items) {
    this.parent = document.querySelector(parent);
    this.items = this.parent.querySelectorAll(items);
    this.counter = 0;
  }
  hideItems() {
    this.items.forEach((item, i, arr) => {
      if (i !== arr.length - 1) {
        item.style.display = 'none';
        item.classList.add('animated', 'slideInDown');
      }
    });
  }
  bindTriggers() {
    this.parent.querySelector('.plus').addEventListener('click', () => {
      if (this.counter >= this.items.length - 2) {
        this.items[this.counter].style.display = 'flex';
        this.items[this.items.length - 1].remove();
      } else {
        this.items[this.counter].style.display = 'flex';
        this.counter++;
      }
    });
  }
  init() {
    this.hideItems();
    this.bindTriggers();
  }
}
export default Difference;
