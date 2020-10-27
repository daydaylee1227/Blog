// https://leetcode-cn.com/problems/implement-trie-prefix-tree/

const TrieNode = function () {
  this.next = Object.create(null);
  this.isEnd = false;
};
const Trie = function () {
  this.root = new TrieNode();
};

Trie.prototype.insert = function (word) {
  if (!word) return false;
  let node = this.root;
  for (let i = 0; i < word.length; ++i) {
    if (!node.next[word[i]]) {
      node.next[word[i]] = new TrieNode();
    }
    node = node.next[word[i]];
  }
  node.isEnd = true;
  return true;
};

Trie.prototype.search = function (word) {
  if (!word) return false;
  let node = this.root;
  for (let i = 0; i < word.length; ++i) {
    if (node.next[word[i]]) {
      node = node.next[word[i]];
    } else {
      return false;
    }
  }
  return node.isEnd;
};

Trie.prototype.startsWith = function (prefix) {
  if (!prefix) return true;
  let node = this.root;
  for (let i = 0; i < prefix.length; ++i) {
    if (node.next[prefix[i]]) {
      node = node.next[prefix[i]];
    } else {
      return false;
    }
  }
  return true;
};
