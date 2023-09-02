/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/ex-color-pallet/ex-color-pallet.js":
/*!*******************************************************!*\
  !*** ./src/blocks/ex-color-pallet/ex-color-pallet.js ***!
  \*******************************************************/
/***/ (() => {

eval("\n// let elem = document.querySelector('.ex-color-pallet');\n// console.log(elem);\n// elem.style.height = '100px';\n// elem.style.width = '100px';\n// elem.style.backgroundColor = 'red';\n\nlet left = document.querySelector('.pallet__body_r');\nlet centr = document.querySelector('.pallet__body_g');\nlet right = document.querySelector('.pallet__body_b');\n\nlet colorLeft = getComputedStyle(left).backgroundColor;\nlet colorCentr = getComputedStyle(centr).backgroundColor;\nlet colorRight = getComputedStyle(right).backgroundColor;\n\nconsole.log(colorLeft);\nconsole.log(extrudeRGB(colorLeft));\n\nlet i = mixColor(rgb2hex(extrudeRGB(colorLeft)[0] * 1, extrudeRGB(colorLeft)[1]  * 1, extrudeRGB(colorLeft)[2] * 1), rgb2hex(extrudeRGB(colorRight)[0]  * 1, extrudeRGB(colorRight)[1]  * 1, extrudeRGB(colorRight)[2]  * 1));\n\nconsole.log();\ncentr.style.backgroundColor = i;\n// let a;\n// let b;\n\n// let rangeOne;\n// let rangeTwo;\n\n// rangeOne = Math.abs(a - b);\n// rangeTwo = 255 - Math.max(a, b) + Math.min(a, b);\n\n\nfunction extrudeRGB(stringRGB) {\n  let a = stringRGB.slice(4, -1);\n  a = a.split(',');\n  return a;\n}\n\n\nfunction mixColor(colorOne, colorTwo) {\n  let rOne = parseInt(colorOne.slice(1, 3), 16);\n  let gOne = parseInt(colorOne.slice(3, 5), 16);\n  let bOne = parseInt(colorOne.slice(5), 16);\n\n  let rTwo = parseInt(colorTwo.slice(1, 3), 16);\n  let gTwo = parseInt(colorTwo.slice(3, 5), 16);\n  let bTwo = parseInt(colorTwo.slice(5), 16);\n\n\n  let result = rgb2hex(Math.round((rOne + rTwo) / 2), Math.round((gOne + gTwo) / 2), Math.round((bOne + bTwo) / 2));\n\n  return result;\n}\n\nfunction componentToHex(c) {\n  var hex = c.toString(16);\n  return hex.length == 1 ? \"0\" + hex : hex;\n}\n\nfunction rgb2hex(r, g, b) {\n  return \"#\" + componentToHex(r) + componentToHex(g) + componentToHex(b);\n}\n\n//# sourceURL=webpack://prtf_hotel/./src/blocks/ex-color-pallet/ex-color-pallet.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/blocks/ex-color-pallet/ex-color-pallet.js"]();
/******/ 	
/******/ })()
;