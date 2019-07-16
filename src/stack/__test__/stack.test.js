const Stack = require('../')

describe('Stack', () => {
  let stack;

  beforeEach(() => {
    stack = new Stack();
  });

  describe('push()', () => {
    test('should push an item', () => {
      stack.push('foo');
      expect(stack.list.length).toEqual(1);
    });

    test('should push multiple items', () => {
      const length = 10;

      for (let i = 0; i < length; i++) {
        stack.push(`item-${i}`);
      }

      expect(stack.list[length -1]).toEqual(`item-${length - 1}`);
    });
  });

  describe('pop()', () => {
    test('should return undefined if there are no items', () => {
      expect(stack.pop()).toBeUndefined();
    });

    test('should return the last element on the stack', () => {
      const length = 10;

      for (let i = 0; i < length; i++) {
        stack.push(`item-${i}`);
      }

      expect(stack.pop()).toEqual(`item-${length - 1}`);
    });
  });

  describe('clear()', () => {
    test('should clear stack', () => {
      const length = 10;

      for (let i = 0; i < length; i++) {
        stack.push(`item-${i}`);
      }

      stack.clear();

      expect(stack.list.length).toEqual(0);
    });
  });

  describe('size()', () => {
    test('should return 0 if there are no items in the stack', () => {
      expect(stack.size()).toEqual(0);
    });

    test('should return length of items in the stack', () => {
      const length = 5;

      for (let i = 0; i < length; i++) {
        stack.push(`item-${i}`);
      }

      expect(stack.size()).toEqual(length);
    });
  });

  describe('peek()', () => {
    test('should return undefined if there are no items in the stack', () => {
      expect(stack.peek()).toBeUndefined();
    });

    test('should return last element on stack', () => {
      const length = 5;

      for (let i = 0; i < length; i++) {
        stack.push(`item-${i}`);
      }

      expect(stack.peek()).toEqual(`item-${length - 1}`);
    });
  });

});