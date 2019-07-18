// --- Directions
// 1) Create a node class.  The constructor
// should accept an argument that gets assigned
// to the data property and initialize an
// empty array for storing children. The node
// class should have methods 'add' and 'remove'.

class Node {
  constructor (data) {
    this.children = [];
    this.data = data;
    this.parent = null;
  }
}

module.exports = Node;