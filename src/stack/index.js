class Stack {

  constructor() {
    this.list = [];
  }

  /**
   * Pushes an item into the stack
   * @param {any} item
   */
  push(item) {
    this.list.push(item);
  }

  /**
   * returns last element on stack
   * @returns {any}
   */
  pop() {
    return this.list.pop();
  }

  /**
   * returns length of stack
   * @returns {Integer} size of stack
   */
  size() {
    return this.list.length;
  }

  /**
   * returns copy of last element on array
   * @returns {any}
   */
  peek() {
    return this.list.slice(-1)[0];
  }

  /**
   * removes all elements on array
   */
  clear() {
    this.list = []
  }
}

module.exports = Stack;
