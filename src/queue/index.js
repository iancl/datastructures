class Queue {
  constructor () {
    this.list = [];
  }

  /**
   * adds an item to the queue
   * @param {any} item
   */
  add(item) {
    this.list.unshift(item);
  }

  /**
   * removes all elements on the queue
   */
  clear() {
    this.list = [];
  }

  /**
   * returns a copy of the first element of the queue
   * @param {any} item
   */
  peek() {
    return this.list.slice(-1)[0];
  }

  /**
   * removes and returns the first element on the queue
   * @param {any} item
   */
  remove () {
    return this.list.pop();
  }

  /**
   * returns the # of elements on the queue
   * @returns {int}
   */
  size() {
    return this.list.length;
  }
}

module.exports = Queue;
