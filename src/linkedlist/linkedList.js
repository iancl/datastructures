/**
 * This is a simple LinkedList implementation for javacript
 *
 * API:
 * - clear()
 * - forEach()
 * - getAt()
 * - getFirst()
 * - getLast()
 * - insertAt()
 * - insertFirst()
 * - insertLast()
 * - midpoint()
 * - removeFirst()
 * - removeLast()
 * - removeAt()
 * - size()
 */
 const Node = require('./node');

class LinkedList {
  constructor() {
    this.head = null;
  }

  /**
   * Removes all nodes from list
   */
  clear() {
    if (!this.head) {
      return;
    }

    let current = this.head;
    let next;

    // this removes all nodes after head
    while (current) {
      next = current.next;
      current.next = null;
      current = next;
    }

    // this removes the remaining head
    this.head = null;
  }

  /**
   * Returns a node at the nth position. Returns null of there are no nodes
   * @param {int} index
   * @returns {Node}
   */
  getAt(index) {
    if (!this.head) {
      return null;
    }

    let current = this.head;
    let node = null;
    let count = 0;

    while (current) {
      if (count === index) {
        node = current;
        break;
      }

      current = current.next;
      count++;
    }

    return node;
  }

  /**
   * returns the first node on the list or null if there's no nodes
   * @returns {Node} first node on the list
   */
  getFirst() {
    return this.head;
  }

  /**
   * Implementation of getLast without using other linkedList methods
   */
  getLastRaw() {
    let current = this.head;

    while (current && current.next) {
      current = current.next;
    }

    return current;
  }

  /**
   * returns the last node on the list or null if there's no nodes
   * @returns {Node} first node on the list
   */
  getLast() {
    return this.getAt(this.size() - 1);
  }

  /**
   * invokes the specified callback for each of the nodes in the list and
   * passes its index
   * @param {Function} fn
   */
  forEach(fn) {
    if (!this.head) {
      fn(null);
    }

    let current = this.head;
    let count = 0;

    while (current) {
      fn(current, count);
      current = current.next;
      count++;
    }
  }

  /**
   * inserts a node at the nth position
   * if index is out of bounds, then it inserts at the end
   * @param {int} index
   * @param {any} data
   */
  insertAt(index, data) {
    if (!this.head) {
      this.head = new Node(data);
      return;
    }

    let previous = this.getAt(index - 1) || this.getAt(this.size() - 1);

    if (previous) {
      previous.next = new Node(data, previous.next);
    }
  }

  /**
   * insertAt implementation without the use of other LinkedList methods
   * @param {int} index
   * @param {any} data
   */
  insertAtRaw(index, data) {
    if (!this.head) {
      this.head = new Node(data);
      return;
    }

    if (index === 0) {
      this.head = new Node(data, this.head);
      return;
    }

    let current = this.head;
    let prev;
    let count = 0;

    while (current.next) {
      if (count === index) {
        break;
      }

      prev = current;
      current = current.next;
      count++;
    }

    prev.next = new Node(data, current);
  }

  /**
   * Inserts a node at the begginning of the list
   * @param {any} data
   */
  insertFirst(data) {
    this.head = new Node(data, this.head);
  }

  /**
   * inserts a node at the end of the list
   * @param {any} data
   */
  insertLast(data) {

    // if there's no head insert right at the head manually
    if (!this.head) {
      this.head = new Node(data);
      return this.head;
    }

    // here's the actual algorithm O(n)
    let last = this.head;

    while (last.next) {
      last = last.next;
    }

    last.next = new Node(data);
  }

  /**
   * returns the middle node of the listl
   * if list.size() is odd then get the element in the middle
   * else if list.size() is even then get the last element of the first half
   * @returns {Node}
   */
  midpoint() {

    if (!this.head) {
      return null;
    }
    // slow will move 1 item per iteration
    let slow = this.head;
    // fast will move 2 items per iteration
    let fast = this.head;

    while (fast && fast.next && fast.next.next) {
      slow = slow.next;
      fast = fast.next.next;
    }

    return slow;
  }

  /**
   * Removes a node at the nth index
   * Makes use of other class methods
   * @param {int} index
   */
  removeAt(index) {
    if (!this.head) {
      return;
    }

    if (index === 0) {
      this.head = this.head.next;
    }

    let previous = this.getAt(index - 1);

    if (previous) {
      previous.next = previous.next.next
    }
  }

  /**
   * this is a removeAt implementation without the use of other linked list
   * methods
   * @param {int} index
   */
  removeAtRaw(index) {
    if (!this.head) {
      return;
    }

    if (index === 0) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;
    let count = 0;
    let prev;

    while (current) {
      if (count === index) {
        prev.next = current.next;
        break;
      }

      prev = current;
      current = current.next;
      count++;
    }
  }

  /**
   * removes first node of the list
   */
  removeFirst() {
    if (!this.head) {
      return;
    }

    this.head = this.head.next;
  }

  /**
   * Implementation of removeLast without using other linkedList methods
   */
  removeLast() {
    if (!this.head) {
      return;
    }

    if (!this.head.next) {
      this.head = null;
      return;
    }

    let current = this.head;
    let prev;

    while (current.next) {
      prev = current;
      current = current.next;
    }

    prev.next = null;
  }

  /**
   * returns lenght of list
   */
  size() {
    let current = this.head;
    let count = 0;

    while (current) {
      current = current.next;
      count++;
    }

    return count;
  }
}

module.exports = LinkedList;
