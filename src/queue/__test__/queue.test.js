const Queue = require('../');

function populateQueue(queue, length) {
  for (let i = 0; i < length; i++) {
    queue.add(`foo${i}`);
  }
}

describe('Queue class', () => {
  let queue;

  beforeEach(() => {
    queue = new Queue();
  });

  describe('add()', () => {
    test('should add an items to the array', () => {
      queue.add('foo');
      expect(queue.list.length).toEqual(1);
      expect(queue.list[0]).toEqual('foo');
    });

    test('should add multiple items to the array', () => {
      const length = 10;
      populateQueue(queue, length)
      expect(queue.list.length).toEqual(length);
      expect(queue.list[length -1 ]).toEqual('foo0');
    });
  });

  describe('clear()', () => {
    test('should remove all items', () => {
      populateQueue(queue, 7);
      queue.clear();
      expect(queue.list.length).toEqual(0);
    });
  });

  describe('peek()', () => {
    test('should return undefined if there are no items', () => {
      expect(queue.peek()).toBeUndefined();
    });

    test('should return first item if there\'s only one', () => {
      queue.add('foo');
      expect(queue.peek()).toEqual('foo');
    });

    test('should return first item if there are multiple items', () => {
      populateQueue(queue, 11);
      expect(queue.peek()).toEqual('foo0');
    });
  });

  describe('remove()', () => {
    test('should return undefined when there are no items', () => {
      expect(queue.remove()).toBeUndefined();
    });

    test('should return and remove last element on queue', () => {
      const length = 8;
      populateQueue(queue, length);

      for (let i = 0; i < length; i++) {
        expect(queue.remove()).toEqual(`foo${i}`);
      }
    });
  });

  describe('size()', () => {
    test('should return 0 when there are no elements on queue', () => {
      expect(queue.size()).toEqual(0);
    });

    test('should return size of queue', () => {
      const length = 8;
      populateQueue(queue, length);
      expect(queue.size()).toEqual(length);
    });
  });

});