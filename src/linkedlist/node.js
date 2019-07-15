/**
 * Simple implementation of a linkedList node
 *
 * API:
 * - constructor()
 */
class Node {
  /**
   * Sets up the Node instance
   * @param {any} [required] data
   * @param {Node} next
   */
  constructor(data = null, next = null) {
    if (!data) {
      throw new Error('[Node.js]: data argument is required')
    }

    this.data = data;
    this.next = next;
  }
}

module.exports = Node;