const Node = require('../node');

describe('Node', () => {
  test('should fail when passing no args', () => {
    expect(() => {
      new Node()
    }).toThrow('[Node.js]: data argument is required');
  });

  test('should create node when passing just the data arg', () => {
    const node = new Node('foo1');
    expect(node).toEqual({ data: 'foo1', next: null });
  });

  test('should create node and store data and next args', () => {
    const first = new Node('foo1');
    const second = new Node('foo2', first);
    expect(second).toEqual({ data: 'foo2', next: first });
  });
});