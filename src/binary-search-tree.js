const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.initial = null;
  }

  root() {
    return this.initial;
  }

  add(data) {
    this.initial = addDecide(this.initial, data);

    function addDecide(node, data) {
      if (!node) {
        return new Node(data);
      }
      if (node.data === data) {
        return node;
      }
      if (data < node.data) {
        node.left = addDecide(node.left, data);
      } else {
        node.right = addDecide(node.right, data);
      }
      return node;
    }
  }

  has(data) {
    return search(this.initial, data);

    function search(node, data) {
      if (!node) {
        return false;
      }
      if (node.data === data) {
        return true;
      }
      return data < node.data
        ? search(node.left, data)
        : search(node.right, data);
    }
  }

  find(data) {
    return find(this.initial, data);

    function find(node, data) {
      if (!node) {
        return null;
      }
      if (node.data === data) {
        return node;
      }
      return data < node.data ? find(node.left, data) : find(node.right, data);
    }
  }

  remove(data) {
    this.root = remove(this.initial, data);

    function remove(node, data) {
      if (!node) {
        return null;
      }
      if (data < node.data) {
        node.left = remove(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = remove(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }
        if (!node.right) {
          node = node.left;
          return node;
        }
        if (!node.left) {
          node = node.right;
          return node;
        }
        let minRight = node.right;
        while (minRight.left) {
          minRight = minRight.left;
        }
        node.data = minRight.data;
        node.right = remove(node.right, minRight.data);
        return node;
      }
    }
  }

  min() {
    let node = this.initial;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    let node = this.initial;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree,
};
