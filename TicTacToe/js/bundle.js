/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/board.js":
/*!*********************!*\
  !*** ./js/board.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MoveError = __webpack_require__(/*! ./moveError */ \"./js/moveError.js\");\n\nclass Board {\n  constructor() {\n    this.grid = Board.makeGrid();\n  }\n\n  isEmptyPos(pos) {\n    if (!Board.isValidPos(pos)) {\n      throw new MoveError('Is not valid position!');\n    }\n\n    return (this.grid[pos[0]][pos[1]] === null);\n  }\n\n  isOver() {\n    if (this.winner() != null) {\n      return true;\n    }\n\n    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {\n      for (let colIdx = 0; colIdx < 3; colIdx++) {\n        if (this.isEmptyPos([rowIdx, colIdx])) {\n          return false;\n        }\n      }\n    }\n\n    return true;\n  }\n\n  placeMark(pos, mark) {\n    if (!this.isEmptyPos(pos)) {\n      throw new MoveError('Is not an empty position!');\n    }\n\n    this.grid[pos[0]][pos[1]] = mark;\n  }\n\n  print() {\n    const strs = [];\n    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {\n      const marks = [];\n      for (let colIdx = 0; colIdx < 3; colIdx++) {\n        marks.push(\n          this.grid[rowIdx][colIdx] ? this.grid[rowIdx][colIdx] : \" \"\n        );\n      }\n      strs.push(`${marks.join('|')}\\n`);\n    }\n\n    console.log(strs.join('-----\\n'));\n  }\n\n  winner() {\n    const posSeqs = [\n      // horizontals\n      [[0, 0], [0, 1], [0, 2]],\n      [[1, 0], [1, 1], [1, 2]],\n      [[2, 0], [2, 1], [2, 2]],\n      // verticals\n      [[0, 0], [1, 0], [2, 0]],\n      [[0, 1], [1, 1], [2, 1]],\n      [[0, 2], [1, 2], [2, 2]],\n      // diagonals\n      [[0, 0], [1, 1], [2, 2]],\n      [[2, 0], [1, 1], [0, 2]]\n    ];\n\n    for (let i = 0; i < posSeqs.length; i++) {\n      const winner = this.winnerHelper(posSeqs[i]);\n      if (winner != null) {\n        return winner;\n      }\n    }\n\n    return null;\n  }\n\n  winnerHelper(posSeq) {\n    for (let markIdx = 0; markIdx < Board.marks.length; markIdx++) {\n      const targetMark = Board.marks[markIdx];\n      let winner = true;\n      for (let posIdx = 0; posIdx < 3; posIdx++) {\n        const pos = posSeq[posIdx];\n        const mark = this.grid[pos[0]][pos[1]];\n\n        if (mark != targetMark) {\n          winner = false;\n        }\n      }\n\n      if (winner) {\n        return targetMark;\n      }\n    }\n\n    return null;\n  }\n\n  static isValidPos(pos) {\n    return (0 <= pos[0]) &&\n    (pos[0] < 3) &&\n    (0 <= pos[1]) &&\n    (pos[1] < 3);\n  }\n\n  static makeGrid() {\n    const grid = [];\n\n    for (let i = 0; i < 3; i++) {\n      grid.push([]);\n      for (let j = 0; j < 3; j++) {\n        grid[i].push(null);\n      }\n    }\n\n    return grid;\n  }\n}\n\nBoard.marks = ['x', 'o'];\n\nmodule.exports = Board;\n\n\n//# sourceURL=webpack:///./js/board.js?");

/***/ }),

/***/ "./js/game.js":
/*!********************!*\
  !*** ./js/game.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Board = __webpack_require__(/*! ./board */ \"./js/board.js\");\nconst MoveError = __webpack_require__(/*! ./moveError */ \"./js/moveError.js\");\n\nclass Game {\n  constructor() {\n    this.board = new Board();\n    this.currentPlayer = Board.marks[0];\n  }\n\n  isOver() {\n    return this.board.isOver();\n  }\n\n  playMove(pos) {\n    this.board.placeMark(pos, this.currentPlayer);\n    this.swapTurn();\n  }\n\n  promptMove(reader, callback) {\n    const game = this;\n\n    this.board.print();\n    console.log(`Current Turn: ${this.currentPlayer}`);\n\n    reader.question('Enter rowIdx: ', rowIdxStr => {\n      const rowIdx = parseInt(rowIdxStr);\n      reader.question('Enter colIdx: ', colIdxStr => {\n        const colIdx = parseInt(colIdxStr);\n        callback([rowIdx, colIdx]);\n      });\n    });\n  }\n\n  run(reader, gameCompletionCallback) {\n    this.promptMove(reader, move => {\n      try {\n        this.playMove(move);\n      } catch (e) {\n        if (e instanceof MoveError) {\n          console.log(e.msg);\n        } else {\n          throw e;\n        }\n      }\n\n      if (this.isOver()) {\n        this.board.print();\n        if (this.winner()) {\n          console.log(`${this.winner()} has won!`);\n        } else {\n          console.log('NO ONE WINS!');\n        }\n        gameCompletionCallback();\n      } else {\n        // continue loop\n        this.run(reader, gameCompletionCallback);\n      }\n    });\n  }\n\n  swapTurn() {\n    if (this.currentPlayer === Board.marks[0]) {\n      this.currentPlayer = Board.marks[1];\n    } else {\n      this.currentPlayer = Board.marks[0];\n    }\n  }\n\n  winner() {\n    return this.board.winner();\n  }\n}\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///./js/game.js?");

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const View = __webpack_require__(/*! ./ttt-view.js */ \"./js/ttt-view.js\");// require appropriate file\nconst Game = __webpack_require__(/*! ./game.js */ \"./js/game.js\");// require appropriate file\n\n$( () => {\n  // Your code here\n  const game = new Game();\n  const $ttt = $(\".ttt\");\n  new View(game, $ttt);\n  // const $title = $(\"h1\");\n  // $title.css(\"color\", \"black\");\n  \n});\n\n\n//# sourceURL=webpack:///./js/main.js?");

/***/ }),

/***/ "./js/moveError.js":
/*!*************************!*\
  !*** ./js/moveError.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nconst MoveError = function (msg) { this.msg = msg; };\n\n// MoveError really should be a child class of the built in Error object provided\n// by Javascript, but since we haven't covered inheritance yet, we'll just\n// let it be a vanilla Object for now!\n\nmodule.exports = MoveError;\n\n\n//# sourceURL=webpack:///./js/moveError.js?");

/***/ }),

/***/ "./js/ttt-view.js":
/*!************************!*\
  !*** ./js/ttt-view.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class View {\n  constructor(game, $el) {\n    this.game = game;\n    this.$el = $el;\n    this.setupBoard();\n    this.bindEvents();\n    this.player = 1;\n  }\n\n  bindEvents() {\n    // Install click handlers on the li elements.\n    $(\"li\").on(\"click\", event => {\n      const $square = $(event.currentTarget);\n      // $square.text(\"X\");\n      this.makeMove($square);\n      \n      const pos = $square.data(\"pos\");\n\n      // alert(`${pos} is chosen!`);\n      \n      const listItems = document.querySelectorAll(\"li\");\n      \n      for(let i = 0; i < 9; i = i+3) {\n        if ((listItems[i].textContent === \"X\") && (listItems[i+1].textContent === \"X\") && (listItems[i+2].textContent === \"X\")) {\n          const $ul = $(\"ul\");\n          $ul.children().attr(\"style\", \"background-color:white;font-size:50px;font-weight:800;font-family:sans-serif;\");\n          $( \"li\" ).slice(i,i+3).css( \"background-color\", \"green\" );\n          // const $ul = $(\"ul\");\n          // $ul.children().attr(\"style\", \"background-color:white;font-size:50px;font-weight:800;font-family:sans-serif;\");\n\n          // $one.css(\"background-color\", \"green\"); \n          \n        }\n      }\n      \n      for(let i = 0; i < 3; i++) {\n        if ((listItems[i].textContent === \"X\") && (listItems[i+3].textContent === \"X\") && (listItems[i+6].textContent === \"X\")) {\n          const $ul = $(\"ul\");\n          $ul.children().attr(\"style\", \"background-color:white;font-size:50px;font-weight:800;font-family:sans-serif;\");\n          $( \"li\" ).slice(i,i+1).css( \"background-color\", \"green\" );\n          $( \"li\" ).slice(i+3,i+4).css( \"background-color\", \"green\" );\n          $( \"li\" ).slice(i+6,i+7).css( \"background-color\", \"green\" );\n        }\n      }\n      \n      if ((listItems[0].textContent === \"X\") && (listItems[4].textContent === \"X\") && (listItems[8].textContent === \"X\")) {\n        const $ul = $(\"ul\");\n        $ul.children().attr(\"style\", \"background-color:white;font-size:50px;font-weight:800;font-family:sans-serif;\");\n        $( \"li\" ).slice(0,1).css( \"background-color\", \"green\" );\n        $( \"li\" ).slice(4,5).css( \"background-color\", \"green\" );\n        $( \"li\" ).slice(8,9).css( \"background-color\", \"green\" );\n      }\n      if ((listItems[2].textContent === \"X\") && (listItems[4].textContent === \"X\") && (listItems[6].textContent === \"X\")) {\n        const $ul = $(\"ul\");\n        $ul.children().attr(\"style\", \"background-color:white;font-size:50px;font-weight:800;font-family:sans-serif;\");\n        $( \"li\" ).slice(2,3).css( \"background-color\", \"green\" );\n        $( \"li\" ).slice(4,5).css( \"background-color\", \"green\" );\n        $( \"li\" ).slice(6,7).css( \"background-color\", \"green\" );\n      }\n      \n    });\n  }\n\n  makeMove($square) {\n    $square.css(\"background-color\", \"white\");\n    \n    if (this.player === 1) {\n      $square.text(\"X\");\n    } else {\n      $square.text(\"O\");\n    }\n    \n    $square.css(\"font-size\", \"50px\");\n    $square.css(\"font-weight\", \"800\");\n    $square.css(\"font-family\", \"sans-serif\");\n    const $listItems = $(\"li\");\n    \n    this.player = -this.player;\n    \n\n    // for (let i = 0; i < listItems.length; i++) {\n    //   alert(listItems[i].textContent);\n    // }\n    \n    // for (let row = 0; row < 3; row++) {\n    //   const $one = $listItems[0];\n    //   const $two = $listItems[1];\n    //   const $three = $listItems[2];\n    //   if (($one.data(\"val\") == $two.data(\"val\")) && ($two.data(\"val\") == $three.data(\"val\"))) {\n    //     alert(\"You win!\");\n    //   }\n    // }\n  }\n\n  setupBoard() {\n    const $ul = $(\"<ul>\");\n    \n    for (let row = 0; row < 3; row++) {\n      for (let col = 0; col < 3; col++) {\n        const $li = $(\"<li>\");\n        \n        $li.data(\"pos\", [row,col]);\n        $ul.append($li);\n          \n      }\n    }\n    this.$el.append($ul);\n  }\n}\n\nmodule.exports = View;\n\n\n//# sourceURL=webpack:///./js/ttt-view.js?");

/***/ })

/******/ });