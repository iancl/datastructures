const Node = require('./node');

class Tree {
  constructor (data) {
    if (data == null) {
      throw new Error('[Tree.constructor]: data args is required');
    }
    this._root = new Node(data);
  }

  /**
   * Adds a node to the tree.
   * If toData arg is not specified then it will try to attach it to the root
   * node.
   * It throws when the parent node is not found
   * @param {String} data data attribute of the new node
   * @param {String} toData data attribute of the parent node
   */
  add(data, toData = this._root.data) {
    let node = this.find(toData);

    if (!node) {
      throw new Error(
        `[Tree.add] cannot add add a node to a node that does not exist`);
    }

    let child = new Node(data);
    child.parent = node;
    node.children.push(child)
  }

  /**
   * Performs a breadth first traverse to attempt to find the node that contains
   * the specified data
   * @param {any} data
   * @returns {Boolean}
   */
  contains(data) {
    if (this._root.data === data) {
      return true;
    }

    const nodes = [this._root];
    let currentNode = nodes.shift();
    let found = false;

    while(currentNode) {
      if (currentNode.data === data) {
        found = true;
        break;
      }

      nodes.push(...currentNode.children);
      currentNode = nodes.shift();
    }

    return found;
  }

  /**
   * Makes a breadth first traverse to attempt to find the node with the
   * specified data
   * @param {String} data
   * @returns {Node}
   */
  find(data) {
    const nodes = [this._root];
    let currentNode = nodes.shift();
    let node = null;

    while (currentNode) {
      if (currentNode.data === data) {
        node = currentNode;
        break;
      }

      nodes.push(...currentNode.children);
      currentNode = nodes.shift();
    }

    return node;
  }

  /**
   * removes a node from the specified node
   * @param {any} data
   * @param {any} fromData
   * @returns {Boolean}
   */
  remove(data, fromData) {

    if (fromData == null) {
      throw new Error('[tree.remove]: fromData argument is required');
    }

    let parent = this.find(fromData);
    let removed = false;

    if (!parent) {
      throw new Error(
        `[tree.remove]: cannot remove a node from a node that does not exist`);
    }

    let nodes = parent.children;

    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i];

      if (node.data === data) {
        parent.children.splice(i, 1);
        removed = true;
        break;
      }
    }

    return removed;
  }

  /**
   * Traverses the tree in a breadth first fashion and invokes the specified
   * callback for each of the nodes.
   * @param {Function} callback
   *
   *            [1]
   *
   *        [2]       [3]
   *
   *       [4][5]    [6][7]
   *
   * in this order: 1, 2, 3, 4, 5, 6, 7
   */
  traverseBreadthFirst(callback) {
    let nodes = [this._root];
    let currentNode = nodes.shift();

    while (currentNode) {
      nodes.push(...currentNode.children);
      callback(currentNode);
      currentNode = nodes.shift();
    }
  }

  /**
   * Traverses the tree in a depth first fashion and invokes the specified
   * callback for each of the nodes.
   * @param {Function} callback
   *            [1]
   *
   *   [2]      [3]        [4]
   *
   * [5][6]    [7][8]    [9][10]
   *
   * in this order: 5, 6, 2, 7, 8, 3, 9, 10, 4
   */
  traverseDepthFirst(callback, currentNode = this._root) {
    for (let i = 0; i < currentNode.children.length; i++) {
      this.traverseDepthFirst(callback, currentNode.children[i]);
    }

    callback(currentNode);
  }
}

module.exports = { Tree };