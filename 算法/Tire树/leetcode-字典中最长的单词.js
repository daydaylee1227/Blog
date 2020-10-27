//   https://leetcode-cn.com/problems/longest-word-in-dictionary/



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
  
  // 查找某个串是否存在
  Trie.prototype.search = function (word) {
    if (!word) return false;
    let node = this.root;
    for (let i = 0; i < word.length; ++i) {
      if (node.next[word[i]].isEnd) {  // 判断是不是节点
        node = node.next[word[i]];
      } else {
        return false;
      }
    }
    return node.isEnd;
  };
  
  
  const longestWord = function(words) {
    let trie = new Trie()
    for(let i = 0; i < words.length; i++) {
      trie.insert(words[i])
    }
    let longans = '', length = 0
    for(let i = 0; i < words.length; i++) {
      if(trie.search(words[i]) && words[i].length > length) {         // 遍历后发现有更长的满足条件
        length = words[i].length
        longans = words[i]
      } else if(trie.search(words[i]) && words[i].length  === length) { // 对字符串长度想等的做判断
          longans = longans < words[i] ? longans : words[i]
      }
    }
    return longans
  }