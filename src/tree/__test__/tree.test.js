const { Tree } = require('../index');
const Node = require('../node');

describe('Tree', () => {

  describe('constructor', () => {
    test('should create a new tree with root node', () => {
      const tree = new Tree('CEO');
      expect(tree._root.data).toEqual('CEO');
      expect(tree._root.children.length).toEqual(0);
      expect(tree._root.parent).toBeNull();
    });
  });

  describe('traverseDephtFirst()', () => {

    test('should traverse all nodes', () => {
      const tree = new Tree('one');

      tree._root.children.push(new Node('two'));
      tree._root.children[0].parent = tree;

      tree._root.children.push(new Node('three'));
      tree._root.children[1].parent = tree;

      tree._root.children.push(new Node('four'));
      tree._root.children[2].parent = tree;

      tree._root.children[0].children.push(new Node('five'));
      tree._root.children[0].children[0].parent = tree._root.children[0];

      tree._root.children[0].children.push(new Node('six'));
      tree._root.children[0].children[1].parent = tree._root.children[0];

      tree._root.children[2].children.push(new Node('seven'));
      tree._root.children[2].children[0].parent = tree._root.children[2];

      const expectedLogs = ['five', 'six', 'two', 'three', 'seven', 'four', 'one'];
      let counter = 0;

      tree.traverseDepthFirst((node) => {
        expect(node.data).toEqual(expectedLogs[counter]);
        counter++;
      });
    });
  });

  describe('traverseBreadthFirst()', () => {
    test('should traverse all nodes', () => {
      const tree = new Tree('one');

      tree._root.children.push(new Node('two'));
      tree._root.children[0].parent = tree;

      tree._root.children.push(new Node('three'));
      tree._root.children[1].parent = tree;

      tree._root.children.push(new Node('four'));
      tree._root.children[2].parent = tree;

      tree._root.children[0].children.push(new Node('five'));
      tree._root.children[0].children[0].parent = tree._root.children[0];

      tree._root.children[0].children.push(new Node('six'));
      tree._root.children[0].children[1].parent = tree._root.children[0];

      tree._root.children[2].children.push(new Node('seven'));
      tree._root.children[2].children[0].parent = tree._root.children[2];

      const expected = ['one', 'two', 'three', 'four', 'five', 'six', 'seven'];
      let counter = 0;

      tree.traverseBreadthFirst((node) => {
        expect(node.data).toEqual(expected[counter]);
        counter++;
      });
    });
  });

  describe('contains()', () => {

    test('should not find the root node if its the only one', () => {
      const tree = new Tree('one');

      expect(tree.contains('one')).toBeTruthy();
    });

    test('should not find the node', () => {
      const tree = new Tree('one');

      tree._root.children.push(new Node('two'));
      tree._root.children[0].parent = tree;

      tree._root.children.push(new Node('three'));
      tree._root.children[1].parent = tree;

      tree._root.children.push(new Node('four'));
      tree._root.children[2].parent = tree;

      expect(tree.contains('oneMillion')).toBeFalsy();
    });

    test('should find the node', () => {
      const tree = new Tree('one');

      tree._root.children.push(new Node('two'));
      tree._root.children[0].parent = tree;

      tree._root.children.push(new Node('three'));
      tree._root.children[1].parent = tree;

      tree._root.children.push(new Node('four'));
      tree._root.children[2].parent = tree;

      tree._root.children[0].children.push(new Node('five'));
      tree._root.children[0].children[0].parent = tree._root.children[0];

      tree._root.children[0].children.push(new Node('six'));
      tree._root.children[0].children[1].parent = tree._root.children[0];

      tree._root.children[2].children.push(new Node('seven'));
      tree._root.children[2].children[0].parent = tree._root.children[2];

      expect(tree.contains('seven')).toBeTruthy();
      expect(tree.contains('three')).toBeTruthy();
    });
  });

  describe('find()', () => {
    test('should find root node if it is the only one', () => {
      const tree = new Tree('one');
      expect(tree.find('one').data).toEqual('one');
    });

    test('should find last node when there are multiple nodes', () => {
      const tree = new Tree('one');

      tree._root.children.push(new Node('two'));
      tree._root.children[0].parent = tree;

      tree._root.children.push(new Node('three'));
      tree._root.children[1].parent = tree;

      tree._root.children.push(new Node('four'));
      tree._root.children[2].parent = tree;

      expect(tree.find('four').data).toEqual('four');
    });

    test('should find node amongst multiple nodes', () => {
      const tree = new Tree('one');

      tree._root.children.push(new Node('two'));
      tree._root.children[0].parent = tree;

      tree._root.children.push(new Node('three'));
      tree._root.children[1].parent = tree;

      tree._root.children.push(new Node('four'));
      tree._root.children[2].parent = tree;

      expect(tree.find('three').data).toEqual('three');
    });

    test('should return null if node is not found', () => {
      const tree = new Tree('one');

      tree._root.children.push(new Node('two'));
      tree._root.children[0].parent = tree;

      tree._root.children.push(new Node('three'));
      tree._root.children[1].parent = tree;

      tree._root.children.push(new Node('four'));
      tree._root.children[2].parent = tree;

      expect(tree.find('fooooo')).toBeNull();
    });
  });

  describe('add()', () => {
    test('should add to root node if toData arg is not supplied', () => {
      const tree = new Tree('foo');
      tree.add('one');

      let child = tree.find('one');
      expect(child.parent).toEqual(tree._root);
      expect(tree._root.children[0].data).toEqual('one');
    });
    test('should add to existing node', () => {
      const tree = new Tree('one');

      tree._root.children.push(new Node('two'));
      tree._root.children[0].parent = tree;

      tree._root.children.push(new Node('three'));
      tree._root.children[1].parent = tree;

      tree._root.children.push(new Node('four'));
      tree._root.children[2].parent = tree;

      tree.add('foo', 'three');

      let parent = tree.find('three');
      let node = tree.find('foo');

      expect(parent.children.includes(node)).toBeTruthy();
      expect(node.parent).toEqual(parent);
    });
  });

  describe('remove()', () => {
    test('should not be able to remove root', () => {
      const tree = new Tree('one');

      expect(() => {
        tree.remove('one')
      }).toThrow();
    });
    test('should throw if trying to remove', () => {
      const tree = new Tree('one');

      tree._root.children.push(new Node('two'));
      tree._root.children[0].parent = tree;

      tree._root.children.push(new Node('three'));
      tree._root.children[1].parent = tree;

      tree._root.children.push(new Node('four'));
      tree._root.children[2].parent = tree;

      const removed = tree.remove('two', 'one');
      let parent = tree.find('one');
      let childData = parent.children.map(n => n.data);

      expect(childData.includes('two')).toBeFalsy();
      expect(removed).toBeTruthy();
    });
    test('should not remove unexisting node', () => {
      const tree = new Tree('one');

      tree._root.children.push(new Node('two'));
      tree._root.children[0].parent = tree;

      tree._root.children.push(new Node('three'));
      tree._root.children[1].parent = tree;

      tree._root.children.push(new Node('four'));
      tree._root.children[2].parent = tree;

      let length = tree._root.children.length;
      let removed = tree.remove('foooooo', 'one');

      expect(tree._root.children.length).toEqual(length);
      expect(removed).toBeFalsy();
    });

  });

});

