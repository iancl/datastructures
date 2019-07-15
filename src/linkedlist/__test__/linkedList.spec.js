const sinon = require('sinon');
const LinkedList = require('../linkedList');

describe('LinkedList', () => {
  let linkedList;

  beforeEach(() => {
    linkedList = new LinkedList();
  });

  describe('creation', () => {
    test('instantiation', () => {
      let list = new LinkedList();

      // head must be null
      expect(list.head).toBeNull();
    });
  });

  describe('insertFirst()', () => {
    test('should add one when there\'s no head', () => {
      linkedList.insertFirst('foo1');
      expect(linkedList.head).toEqual({
        data: 'foo1',
        next: null
      });
    });

    test('should insert node to the first position', () => {
      let count = 4;
      const list = new LinkedList();

      for (let i = 0; i < count; i++) {
        list.insertFirst(`foo${i}`);
      }

      expect(list.head.data).toEqual(`foo${count - 1}`);
      expect(list.head.next.data).toEqual(`foo${count - 2}`);
    });
  });

  describe('getFirst()', () => {
    test('should return null when there\'s no nodes', () => {
      expect(linkedList.getFirst()).toBeNull();
    });

    test('should return first element when theres only one node', () => {
      linkedList.insertFirst('foo');
      expect(linkedList.getFirst().data).toEqual('foo');
      expect(linkedList.getFirst().next).toEqual(null);
    });

    test('should return first element when there are multiple nodes', () => {
      const length = 6;

      for (let i = 0; i < length; i++) {
        linkedList.insertLast(`foo${i}`);
      }

      expect(linkedList.getFirst().data).toEqual('foo0');
    });
  });

  describe('size()', () => {
    test('should return 0 if there\'s no nodes', () => {
      expect(linkedList.size()).toEqual(0);
    });

    test('should return length of array if there are any nodes', () => {
      const lengths = [1, 2, 3, 4];
      // This is O(2n) but at least these are unit tests and we should only generate
      // a small array :D
      for (let length of lengths) {
        const list = new LinkedList();

        // populate each of the linked lists with a fixed element length
        for (let i = 0; i < length; i++) {
          list.insertFirst(`foo${i}`);
        }

        // here's the assertion
        expect(list.size()).toEqual(length);
      }
    });
  });

  describe('insertLast()', () => {
    test('should insert at head of there isn\'t one', () => {
      linkedList.insertLast('foo');

      expect(linkedList.size()).toEqual(1);
      expect(linkedList.getFirst().data).toEqual('foo');
      expect(linkedList.getFirst().next).toEqual(null);
    });

  test('should insert "n" number of nodes', () => {
    const length = 10;

    for (let i = 0; i < length; i ++) {
      linkedList.insertLast(`foo${i}`);
    }

    expect(linkedList.size()).toEqual(length);
    expect(linkedList.getLast().data).toEqual(`foo${length - 1}`);
    expect(linkedList.getLast().next).toEqual(null);
  });

  test('should insert at last when there are existing nodes', () => {
    const length = 10;

    for (let i = 0; i < length; i++) {
      linkedList.insertLast(`foo${i}`);
    }

    // insert a new node at the last pos
    linkedList.insertLast('foo9090');
    expect(linkedList.getLast().data).toEqual('foo9090');
  });
});

describe('getAt()', () => {
    test('should return null if there\'s no head', () => {
      let max = 10;
      let num = Math.floor(
        parseInt(((Math.random() * max) + 1))
      );

      expect(linkedList.getAt(num)).toBeNull();
    });

    test('should return head if there\'s only the head ', () => {
      linkedList.insertFirst('foo');
      expect(linkedList.getAt(0).data).toEqual('foo');
    });

    test('should return the node at the nth position', () => {
      const length = 4;

      // populate each of the linked lists with a fixed element length
      for (let i = 0; i < length; i++) {
        linkedList.insertLast(`foo${i}`);
      }

      // each of the nodes have a data attr related to the index "i" when
      // they where created: i.e: foo0 to foo{length}
      for (let i = 0; i < length; i++) {
        expect(linkedList.getAt(i).data).toEqual(`foo${i}`);
      }
    });

    test('should return null if index is out of bounds', () => {
      const length = 4;

      // populate each of the linked lists with a fixed element length
      for (let i = 0; i < length; i++) {
        linkedList.insertFirst(`foo${i}`);
      }

      expect(linkedList.getAt(100)).toBeNull();
    });
  });

  describe('getLast()', () => {
    test('should return null if there aren\'t any nodes', () => {
      expect(linkedList.getLast()).toBeNull();
    });

    test('should return head if only head node exists', () => {
      linkedList.insertFirst('foo');
      expect(linkedList.getLast().data).toEqual('foo');
    });

    test('should return last node if there are multiple nodes', () => {
      const length = 4;

      // populate each of the linked lists with a fixed element length
      for (let i = 0; i < length; i++) {
        linkedList.insertFirst(`foo${i}`);
      }

      linkedList.insertLast('foo9090');
      expect(linkedList.getLast().data).toEqual('foo9090');
    });
  });

  describe('insertAt()', () => {
    test('should insert at head if there are no nodes', () => {
      linkedList.insertAt(9, 'foo');
      expect(linkedList.head.data).toEqual('foo');
      expect(linkedList.head.next).toEqual(null);
    });

    test('should insert after head if index is out of bounds and there is no head', () => {
      linkedList.insertAt(9, 'foo2');
      expect(linkedList.getLast().data).toEqual('foo2');
      expect(linkedList.getLast().next).toEqual(null);
    });

    test('should insert after head if index is out of bounds and head exists', () => {
      linkedList.insertFirst('foo1');
      linkedList.insertAt(9, 'foo2');
      expect(linkedList.getLast().data).toEqual('foo2');
    });

    test('should insert after head if head exists and index is 1', () => {
      linkedList.insertFirst('foo1');
      linkedList.insertAt(1, 'foo2');
      expect(linkedList.getLast().data).toEqual('foo2');
    });

    test('should insert between nodes when index is in range', () => {
      const length = 3;

      // populate each of the linked lists with a fixed element length
      for (let i = 0; i < length; i++) {
        linkedList.insertLast(`foo${i}`);
      }

      let currentIndex = 1;
      let nextIndex = currentIndex + 1;
      let prevIndex = currentIndex - 1;

      linkedList.insertAt(currentIndex, 'foo-newNode');

      let current = linkedList.getAt(currentIndex);
      let next = linkedList.getAt(nextIndex);
      let prev = linkedList.getAt(prevIndex);

      // size should have increased
      expect(linkedList.size()).toEqual(length + 1);
      expect(current.data).toEqual('foo-newNode');
      expect(prev.next.data).toEqual('foo-newNode');
      expect(prev.data).toEqual(`foo0`);
      expect(next.data).toEqual(`foo1`);
    });
  });

  describe('removeAt()', () => {
    test('should not throw if there\'s no nodes', () => {
      linkedList.removeAt(9);
    });

    test('should remove first node if there\'s only one node ', () => {
      linkedList.insertFirst('foo')
      linkedList.removeAt(0);
      expect(linkedList.size()).toEqual(0);
    });

    test('should remove first node', () => {
      const length = 3;

      // populate each of the linked lists with a fixed element length
      for (let i = 0; i < length; i++) {
        linkedList.insertLast(`foo${i}`);
      }

      let indexToRemove = 0;

      expect(linkedList.getFirst().data).toEqual('foo0');
      linkedList.removeAt(indexToRemove);
      expect(linkedList.size()).toEqual(length - 1);
      expect(linkedList.getFirst().data).toEqual('foo1');
    });

    test('should not throw if index is out of bounds', () => {
      const length = 3;

      // populate each of the linked lists with a fixed element length
      for (let i = 0; i < length; i++) {
        linkedList.insertLast(`foo${i}`);
      }

      let indexToRemove = 4;
      linkedList.removeAt(indexToRemove);
      expect(linkedList.size()).toEqual(length);
    });

    test('should remove last node', () => {
      const length = 3;

      // populate each of the linked lists with a fixed element length
      for (let i = 0; i < length; i++) {
        linkedList.insertLast(`foo${i}`);
      }

      let indexToRemove = 2;

      expect(linkedList.getAt(indexToRemove).data).toEqual('foo2');
      linkedList.removeAt(indexToRemove);
      expect(linkedList.size()).toEqual(length - 1);
      expect(linkedList.getLast().data).toEqual('foo1');
      expect(linkedList.getFirst().data).toEqual('foo0');
    });

    test('should remove node at index', () => {
      const length = 3;

      // populate each of the linked lists with a fixed element length
      for (let i = 0; i < length; i++) {
        linkedList.insertLast(`foo${i}`);
      }

      let indexToRemove = 1;

      expect(linkedList.getAt(indexToRemove).data).toEqual('foo1');
      linkedList.removeAt(indexToRemove);
      expect(linkedList.size()).toEqual(length - 1);
      expect(linkedList.getAt(indexToRemove).data).toEqual('foo2');
      expect(linkedList.getFirst().data).toEqual('foo0');
    });
  });

  describe('removeFirst()', () => {
    test('should not throw if there are no nodes', () => {
      expect(() => {
        linkedList.removeFirst();
      }).not.toThrow();
    });

    test('should remove head of there\'s only one node', () => {
      linkedList.insertFirst('foo');
      linkedList.removeFirst();
      expect(linkedList.head).toBeNull();
    });

    test('should remove head if there are multiple nodes', () => {
      const length = 3;

      // populate each of the linked lists with a fixed element length
      for (let i = 0; i < length; i++) {
        linkedList.insertLast(`foo${i}`);
      }

      linkedList.removeFirst();
      expect(linkedList.head.data).toEqual('foo1');
    });
  });

  describe('removeLast()', () => {
    test('should not throw if there are no nodes', () => {
      expect(() => {
        linkedList.removeLast();
      }).not.toThrow();
    });

    test('should remove node if there\'s only one node', () => {
      linkedList.insertFirst('foo');
      linkedList.removeLast();
      expect(linkedList.head).toBeNull();
    });

    test('should remove last if there are multiple nodes', () => {
      const length = 3;

      // populate each of the linked lists with a fixed element length
      for (let i = 0; i < length; i++) {
        linkedList.insertLast(`foo${i}`);
      }

      linkedList.removeLast();
      expect(linkedList.getLast().data).toEqual('foo1');
    });
  });

  describe('forEach', () => {
    test('should return null if there are no nodes', () => {
      const spy = sinon.spy();
      linkedList.forEach(spy);

      expect(spy.calledWith(null)).toBeTruthy();
      expect(spy.calledOnce).toBeTruthy();

    });

    test('should invoke callback with head node if there\'s only one node', () => {
      const spy = sinon.spy();
      linkedList.insertFirst('foo');
      linkedList.forEach(spy);

      let callArgs = spy.getCall(0).args;
      expect(callArgs[0]).toEqual({data: 'foo', next: null});
      expect(callArgs[1]).toEqual(0);
      expect(spy.calledOnce).toBeTruthy();
    });

    test('should iterate through all nodes', () => {
      const length = 3;

      // populate each of the linked lists with a fixed element length
      for (let i = 0; i < length; i++) {
        linkedList.insertLast(`foo${i}`);
      }

      const spy = sinon.spy();

      linkedList.forEach(spy);

      for (let i = 0; i < length; i++) {
        const args = spy.getCall(i).args;

        expect(args[0].data).toEqual(`foo${i}`);
        expect(args[1]).toEqual(i);
      }

      expect(spy.callCount).toEqual(length);
    });
  });

  describe('clear()', () => {
    test('should not throw if there are no nodes', () => {
      expect(() => {
        linkedList.clear();
      }).not.toThrow();
    });

    test('should remove head if there\'s only one node', () => {
      linkedList.insertFirst('foo');
      linkedList.clear();
      expect(linkedList.size()).toEqual(0);
    });

    test('should remove all nodes', () => {
      const length = 10;

      // populate each of the linked lists with a fixed element length
      for (let i = 0; i < length; i++) {
        linkedList.insertLast(`foo${i}`);
      }

      linkedList.clear();
      expect(linkedList.size()).toEqual(0);
    });
  });

});
