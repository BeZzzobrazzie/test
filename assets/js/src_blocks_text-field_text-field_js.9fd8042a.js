"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkprtf_hotel"] = self["webpackChunkprtf_hotel"] || []).push([["src_blocks_text-field_text-field_js"],{

/***/ "./src/blocks/text-field/text-field.js":
/*!*********************************************!*\
  !*** ./src/blocks/text-field/text-field.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TextField\": () => (/* binding */ TextField)\n/* harmony export */ });\nclass TextField {\r\n  constructor(domElement) {\r\n    this.domElement = domElement;\r\n    this.initEventListener(this.domElement);\r\n    console.log('init textField');\r\n  }\r\n\r\n  initEventListener(domElement) {\r\n    domElement.addEventListener('focusin', this);\r\n    domElement.addEventListener('focusout', this);\r\n  }\r\n\r\n\r\n  handleEvent(event) {\r\n    switch(event.type) {\r\n      case 'focusin':\r\n        if(event.target.value == event.target.getAttribute('value')) {\r\n          event.target.value = '';\r\n        }\r\n        break;\r\n      case 'focusout':\r\n        if(event.target.value == '') {\r\n          event.target.value = event.target.getAttribute('value');\r\n        }\r\n        break;\r\n    }\r\n  }\r\n  \r\n}\r\n\r\n\n\n//# sourceURL=webpack://prtf_hotel/./src/blocks/text-field/text-field.js?");

/***/ })

}]);