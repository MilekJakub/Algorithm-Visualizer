class LinkedList {

  constructor() {
      this.head = null;
      this.size = 0;
  }

  get(index) {
    let current = this.head;
    let count = 0;
 
    while(current != null) {
      if(count === index)
        return current;

      current = current.next;
      count++;
    }
 
    return null;
  }

  getLast() {
    let current = this.head;
    if(!current) return null;
 
    while(current.next != null)
      current = current.next;
 
    return current;
  }

  add(element) {
    const node = new Node(element);
    let current;
 
    if (this.head == null)
      this.head = node;

    else {
      current = this.head;
 
      while (current.next) {
        current = current.next;
      }
 
      current.next = node;
      current.next.previous = current;
    }

    this.size++;
  }

  removeElement(element) {
    let current = this.head;
    let prev = null;
 
    while (current != null) {
      if (current.element === element) {
        if (prev == null) 
            this.head = current.next;
        else
            prev.next = current.next;

        this.size--;
        return true;
      }

      prev = current;
      current = current.next;
    }

    return false;
  }

  clear() {
    this.head = null;
    this.size = 0;
  }
 
  isEmpty() {
    return this.size == 0;
  }
}

class Node {
  constructor(element) {
    this.element = element;
    this.previous = null;
    this.next = null
  }
}

export { LinkedList };
