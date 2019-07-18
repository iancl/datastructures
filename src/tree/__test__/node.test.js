const Node = require('../node');

describe.skip('Node', () => {

  describe('constructor', () => {
    test('should create child properties and store data', () => {
      const node = new Node('foo');

      expect(node.data).toEqual('foo');
      expect(node.children).toBeDefined();
      expect(Array.isArray(node.children)).toBeTruthy();
      expect(node.children.length).toEqual(0);
    });
  });

  describe('add()', () => {
    test('should add nodes as children', () => {
      const node = new Node('foo');
      const length = 5;

      for (let i = 0; i < length; i++) {
        node.add(`child-${i}`);
      }

      expect(node.children.length).toEqual(length);
      expect(node.children[0].data).toEqual(`child-0`);
      expect(node.children[length - 1].data).toEqual(`child-4`);
    });
  });

  describe('remove()', () => {
    test('should not throw if there are no nodes', () => {
      const node = new Node('foo');
      expect(() => {
        node.remove('whatever');
      }).not.toThrow();

    });

    test('should not remove if specified node is not found', () => {
      const node = new Node('foo');
      const length = 5;

      for (let i = 0; i < length; i++) {
        node.add(`child-${i}`);
      }

      node.remove('whatever');
      expect(node.children.length).toEqual(length)
    });

    test('should remove only specified node', () => {
      const node = new Node('foo');
      const length = 5;

      for (let i = 0; i < length; i++) {
        node.add(`child-${i}`);
      }

      node.remove('child-3');
      expect(node.children.length).toEqual(length - 1)
      expect(node.children.some(n => n.data === 'child-3')).toBeFalsy();
    });

    test('should remove only node', () => {
      const parent = new Node('parent');

      parent.add('child');
      parent.remove('child');
      expect(parent.children.length).toEqual(0);
    });
  });

});
