/* @ds-bundle: {"format":4,"namespace":"RGBYMediaDesignSystem_80632e","components":[{"name":"Burger","sourcePath":"components/actions/Burger.jsx"},{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"CarouselArrow","sourcePath":"components/actions/CarouselArrow.jsx"},{"name":"TextLink","sourcePath":"components/actions/TextLink.jsx"},{"name":"Icon","sourcePath":"components/brand/Icon.jsx"},{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"GLYPHS","sourcePath":"components/brand/glyphs.js"},{"name":"AwardItem","sourcePath":"components/content/AwardItem.jsx"},{"name":"CaseCard","sourcePath":"components/content/CaseCard.jsx"},{"name":"ClientTile","sourcePath":"components/content/ClientTile.jsx"},{"name":"CtaCard","sourcePath":"components/content/CtaCard.jsx"},{"name":"ServiceItem","sourcePath":"components/content/ServiceItem.jsx"},{"name":"StatCard","sourcePath":"components/content/StatCard.jsx"},{"name":"TeamMember","sourcePath":"components/content/TeamMember.jsx"},{"name":"BUDGET_STEPS","sourcePath":"components/forms/BudgetSlider.jsx"},{"name":"BudgetSlider","sourcePath":"components/forms/BudgetSlider.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"ChoiceChip","sourcePath":"components/forms/ChoiceChip.jsx"},{"name":"FileAttach","sourcePath":"components/forms/FileAttach.jsx"},{"name":"TextField","sourcePath":"components/forms/TextField.jsx"},{"name":"Modal","sourcePath":"components/overlay/Modal.jsx"},{"name":"Notice","sourcePath":"components/overlay/Notice.jsx"}],"sourceHashes":{"components/actions/Burger.jsx":"6cbd7f0ec97b","components/actions/Button.jsx":"922ef36e7b5c","components/actions/CarouselArrow.jsx":"931476a5fbd4","components/actions/TextLink.jsx":"94c308047807","components/brand/Icon.jsx":"96b04b54171e","components/brand/Logo.jsx":"265cae24ae2f","components/brand/glyphs.js":"11daafab8ac6","components/content/AwardItem.jsx":"09023af036a1","components/content/CaseCard.jsx":"9922d36770d2","components/content/ClientTile.jsx":"4c46244fdccc","components/content/CtaCard.jsx":"57db90024da2","components/content/ServiceItem.jsx":"54c5363f6541","components/content/StatCard.jsx":"6585dc01917e","components/content/TeamMember.jsx":"99ae83a99e92","components/forms/BudgetSlider.jsx":"681739e9b58d","components/forms/Checkbox.jsx":"a957bff48422","components/forms/ChoiceChip.jsx":"b6cff4352bda","components/forms/FileAttach.jsx":"f85addcc8ae4","components/forms/TextField.jsx":"8c686f63e405","components/overlay/Modal.jsx":"363f94c822e1","components/overlay/Notice.jsx":"8f0b421c7c07","content/archive/cases-legacy-v1.js":"a9b8b99e4ea1","content/cases/cases.js":"d631d0baf107","content/clients/clients.js":"939a9ece72a3","content/news/news.js":"8a6bb7da8d89","release/doc-page.js":"f52ae9c02fca","release/stand/content/archive/cases-legacy-v1.js":"a9b8b99e4ea1","release/stand/content/cases/cases.js":"d631d0baf107","release/stand/content/clients/clients.js":"939a9ece72a3","release/stand/content/news/news.js":"8a6bb7da8d89","release/stand/ui_kits/main/gh-publish.js":"24cc4f81dac8","release/stand/ui_kits/main/route.js":"f285119a06ca","release/stand/ui_kits/main/site-release.js":"b0af3dcc0093","release/stand/ui_kits/main/typo.js":"10a29754d7c0","ui_kits/main/gh-publish.js":"24cc4f81dac8","ui_kits/main/route.js":"f285119a06ca","ui_kits/main/site-release.js":"b0af3dcc0093","ui_kits/main/typo.js":"10a29754d7c0"},"inlinedExternals":[],"unexposedExports":[{"name":"formatBudget","sourcePath":"components/forms/BudgetSlider.jsx"}]} */

(() => {

const __ds_ns = (window.RGBYMediaDesignSystem_80632e = window.RGBYMediaDesignSystem_80632e || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/actions/Burger.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** 36×12 two-line menu toggle; morphs to × when open. */
function Burger({
  open = false,
  color,
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": "\u041C\u0435\u043D\u044E",
    "aria-expanded": open,
    className: "rg-burger" + (open ? " rg-burger--open" : "") + (className ? " " + className : ""),
    style: {
      color
    }
  }, rest), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null));
}
Object.assign(__ds_scope, { Burger });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Burger.jsx", error: String((e && e.message) || e) }); }

// components/actions/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Square, flat button. Bold 24 label, tight tracking. */
function Button({
  variant = "blue",
  size = "l",
  children,
  className = "",
  ...rest
}) {
  const cls = "rg-btn rg-btn--" + variant + (size === "m" ? " rg-btn--m" : "") + (className ? " " + className : "");
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: cls
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/actions/TextLink.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** «Подробнее +» — blue bold link with a plus that rotates when open. */
function TextLink({
  children = "Подробнее",
  open = false,
  sign = "+",
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: "rg-link" + (open ? " rg-link--open" : "") + (className ? " " + className : ""),
    "aria-expanded": open
  }, rest), /*#__PURE__*/React.createElement("span", null, children), sign ? /*#__PURE__*/React.createElement("span", {
    className: "rg-link__sign"
  }, sign) : null);
}
Object.assign(__ds_scope, { TextLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/TextLink.jsx", error: String((e && e.message) || e) }); }

// components/brand/glyphs.js
try { (() => {
// Generated from the Figma SVG exports in assets/. name → { vb, body }
const GLYPHS = {
  "chevron": {
    "vb": "-1 -1 14 8",
    "body": "<path d=\"M 0.707 -0.707 C 0.317 -1.098 -0.317 -1.098 -0.707 -0.707 C -1.098 -0.317 -1.098 0.317 -0.707 0.707 L 0 0 L 0.707 -0.707 Z M 6 6 L 5.293 6.707 C 5.683 7.098 6.317 7.098 6.707 6.707 L 6 6 Z M 12.707 0.707 C 13.098 0.317 13.098 -0.317 12.707 -0.707 C 12.317 -1.098 11.683 -1.098 11.293 -0.707 L 12 0 L 12.707 0.707 Z M 0 0 L -0.707 0.707 L 5.293 6.707 L 6 6 L 6.707 5.293 L 0.707 -0.707 L 0 0 Z M 6 6 L 6.707 6.707 L 12.707 0.707 L 12 0 L 11.293 -0.707 L 5.293 5.293 L 6 6 Z\" fill-rule=\"nonzero\"/>"
  },
  "arrow": {
    "vb": "-1.5 -1.5 21 11",
    "body": "<path d=\"M 0.997 -1.121 C 0.377 -1.671 -0.571 -1.616 -1.121 -0.997 C -1.671 -0.377 -1.616 0.571 -0.997 1.121 L 0 0 L 0.997 -1.121 Z M 9 8 L 8.003 9.121 C 8.572 9.626 9.428 9.626 9.997 9.121 L 9 8 Z M 18.997 1.121 C 19.616 0.571 19.671 -0.377 19.121 -0.997 C 18.571 -1.616 17.623 -1.671 17.003 -1.121 L 18 0 L 18.997 1.121 Z M 0 0 L -0.997 1.121 L 8.003 9.121 L 9 8 L 9.997 6.879 L 0.997 -1.121 L 0 0 Z M 9 8 L 9.997 9.121 L 18.997 1.121 L 18 0 L 17.003 -1.121 L 8.003 6.879 L 9 8 Z\" fill-rule=\"nonzero\"/>"
  },
  "check": {
    "vb": "-0.6 -0.6 11.866999999999999 8.533",
    "body": "<path d=\"M 11.02 0.354 C 11.215 0.158 11.215 -0.158 11.02 -0.354 C 10.825 -0.549 10.508 -0.549 10.313 -0.354 L 10.667 0 L 11.02 0.354 Z M 3.333 7.333 L 2.98 7.687 C 3.175 7.882 3.492 7.882 3.687 7.687 L 3.333 7.333 Z M 0.354 3.646 C 0.158 3.451 -0.158 3.451 -0.354 3.646 C -0.549 3.842 -0.549 4.158 -0.354 4.354 L 0 4 L 0.354 3.646 Z M 10.667 0 L 10.313 -0.354 L 2.98 6.98 L 3.333 7.333 L 3.687 7.687 L 11.02 0.354 L 10.667 0 Z M 3.333 7.333 L 3.687 6.98 L 0.354 3.646 L 0 4 L -0.354 4.354 L 2.98 7.687 L 3.333 7.333 Z\" fill-rule=\"nonzero\"/>"
  },
  "paperclip": {
    "vb": "-0.6 -0.6 14.158999999999999 14.94",
    "body": "<path d=\"M 13.312 6.795 C 13.508 6.6 13.508 6.283 13.312 6.088 C 13.117 5.893 12.801 5.893 12.605 6.088 L 12.959 6.441 L 13.312 6.795 Z M 6.832 12.568 L 6.479 12.215 L 6.479 12.215 L 6.832 12.568 Z M 4.002 13.74 L 4.002 14.24 L 4.002 13.74 Z M 0 9.738 L -0.5 9.738 L 0 9.738 Z M 1.172 6.908 L 1.526 7.262 L 1.172 6.908 Z M 7.299 0.781 L 6.945 0.428 L 7.299 0.781 Z M 9.186 0 L 9.186 0.5 L 9.186 0 Z M 11.072 4.555 L 11.426 4.909 L 11.426 4.908 L 11.072 4.555 Z M 4.939 10.681 L 4.586 10.328 L 4.585 10.328 L 4.939 10.681 Z M 3.052 8.795 L 2.699 8.441 L 2.699 8.441 L 3.052 8.795 Z M 9.066 3.495 C 9.261 3.3 9.261 2.984 9.066 2.788 C 8.871 2.593 8.554 2.593 8.359 2.788 L 8.712 3.141 L 9.066 3.495 Z M 12.959 6.441 L 12.605 6.088 L 6.479 12.215 L 6.832 12.568 L 7.186 12.922 L 13.312 6.795 L 12.959 6.441 Z M 6.832 12.568 L 6.479 12.215 C 5.822 12.871 4.931 13.24 4.002 13.24 L 4.002 13.74 L 4.002 14.24 C 5.196 14.24 6.341 13.766 7.186 12.922 L 6.832 12.568 Z M 4.002 13.74 L 4.002 13.24 C 3.073 13.24 2.183 12.871 1.526 12.215 L 1.172 12.568 L 0.819 12.922 C 1.663 13.766 2.808 14.24 4.002 14.24 L 4.002 13.74 Z M 1.172 12.568 L 1.526 12.215 C 0.869 11.558 0.5 10.667 0.5 9.738 L 0 9.738 L -0.5 9.738 C -0.5 10.932 -0.026 12.077 0.819 12.922 L 1.172 12.568 Z M 0 9.738 L 0.5 9.738 C 0.5 8.809 0.869 7.918 1.526 7.262 L 1.172 6.908 L 0.819 6.555 C -0.026 7.399 -0.5 8.544 -0.5 9.738 L 0 9.738 Z M 1.172 6.908 L 1.526 7.262 L 7.652 1.135 L 7.299 0.781 L 6.945 0.428 L 0.819 6.555 L 1.172 6.908 Z M 7.299 0.781 L 7.652 1.135 C 8.059 0.728 8.611 0.5 9.186 0.5 L 9.186 0 L 9.186 -0.5 C 8.345 -0.5 7.539 -0.166 6.945 0.428 L 7.299 0.781 Z M 9.186 0 L 9.186 0.5 C 9.761 0.5 10.312 0.728 10.719 1.135 L 11.072 0.781 L 11.426 0.428 C 10.832 -0.166 10.026 -0.5 9.186 -0.5 L 9.186 0 Z M 11.072 0.781 L 10.719 1.135 C 11.125 1.542 11.354 2.093 11.354 2.668 L 11.854 2.668 L 12.354 2.668 C 12.354 1.828 12.02 1.022 11.426 0.428 L 11.072 0.781 Z M 11.854 2.668 L 11.354 2.668 C 11.354 3.243 11.125 3.795 10.719 4.201 L 11.072 4.555 L 11.426 4.908 C 12.02 4.314 12.354 3.508 12.354 2.668 L 11.854 2.668 Z M 11.072 4.555 L 10.719 4.201 L 4.586 10.328 L 4.939 10.681 L 5.292 11.035 L 11.426 4.909 L 11.072 4.555 Z M 4.939 10.681 L 4.585 10.328 C 4.429 10.484 4.217 10.572 3.996 10.572 L 3.996 11.072 L 3.996 11.572 C 4.482 11.572 4.948 11.379 5.292 11.035 L 4.939 10.681 Z M 3.996 11.072 L 3.996 10.572 C 3.774 10.572 3.562 10.484 3.406 10.328 L 3.052 10.681 L 2.699 11.035 C 3.043 11.379 3.509 11.572 3.996 11.572 L 3.996 11.072 Z M 3.052 10.681 L 3.406 10.328 C 3.249 10.172 3.161 9.959 3.161 9.738 L 2.661 9.738 L 2.161 9.738 C 2.161 10.225 2.355 10.691 2.699 11.035 L 3.052 10.681 Z M 2.661 9.738 L 3.161 9.738 C 3.161 9.517 3.249 9.305 3.406 9.148 L 3.052 8.795 L 2.699 8.441 C 2.355 8.785 2.161 9.252 2.161 9.738 L 2.661 9.738 Z M 3.052 8.795 L 3.406 9.149 L 9.066 3.495 L 8.712 3.141 L 8.359 2.788 L 2.699 8.441 L 3.052 8.795 Z\" fill-rule=\"nonzero\"/>"
  },
  "vk": {
    "vb": "0 0 24 16",
    "body": "<path d=\"M 13.072 16 C 4.872 16 0.195 9.993 0 0 L 4.107 0 C 4.243 7.336 7.271 10.443 9.669 11.083 L 9.669 0 L 13.536 0 L 13.536 6.327 C 15.907 6.053 18.395 3.171 19.233 0 L 23.1 0 C 22.456 3.907 19.757 6.791 17.839 7.976 C 19.759 8.936 22.831 11.452 24 16 L 19.743 16 C 18.828 12.957 16.549 10.603 13.536 10.283 L 13.536 16 L 13.072 16 Z\"/>"
  },
  "telegram": {
    "vb": "0 0 20.513 17",
    "body": "<path d=\"M 1.41 7.318 C 6.917 4.919 10.589 3.338 12.426 2.574 C 17.671 0.392 18.761 0.013 19.472 0 C 19.628 -0.003 19.978 0.036 20.204 0.22 C 20.395 0.375 20.448 0.584 20.473 0.731 C 20.498 0.878 20.529 1.213 20.504 1.475 C 20.22 4.462 18.99 11.71 18.364 15.055 C 18.099 16.471 17.578 16.945 17.073 16.992 C 16.205 17.072 15.502 16.57 14.719 16.012 C 14.513 15.866 14.302 15.715 14.081 15.57 C 13.213 15.001 12.543 14.545 11.87 14.087 C 11.254 13.667 10.637 13.247 9.866 12.739 C 8.261 11.681 8.932 11.033 9.828 10.169 C 9.847 10.152 9.865 10.134 9.883 10.117 C 10.011 9.993 10.143 9.865 10.273 9.73 C 10.334 9.666 10.623 9.398 11.034 9.015 C 11.061 8.99 11.089 8.964 11.117 8.938 L 11.118 8.937 C 11.301 8.767 11.505 8.578 11.722 8.375 C 13.244 6.957 15.415 4.913 15.477 4.647 C 15.489 4.597 15.5 4.411 15.389 4.313 C 15.279 4.215 15.116 4.248 14.998 4.275 C 14.832 4.313 12.176 6.068 7.031 9.541 C 6.277 10.059 5.594 10.311 4.982 10.298 C 4.308 10.283 3.011 9.916 2.046 9.603 C 1.905 9.557 1.766 9.513 1.633 9.471 C 0.653 9.163 -0.067 8.937 0.005 8.362 C 0.048 8.022 0.516 7.674 1.41 7.318 Z\" fill-rule=\"nonzero\"/>"
  },
  "clip": {
    "vb": "0 0 17.351 19.895",
    "body": "<path d=\"M 7.001 19.894 C 5.622 19.914 4.268 19.52 3.115 18.763 C 1.961 18.007 1.061 16.921 0.531 15.648 C 0 14.375 -0.136 12.971 0.138 11.62 C 0.413 10.268 1.087 9.029 2.072 8.064 L 8.786 1.429 C 9.701 0.514 10.942 0 12.236 0 C 13.53 0 14.771 0.514 15.686 1.429 C 16.602 2.344 17.116 3.585 17.116 4.88 C 17.116 6.174 16.602 7.415 15.686 8.33 L 9.091 14.856 C 8.561 15.365 7.854 15.649 7.12 15.649 C 6.385 15.649 5.678 15.365 5.148 14.856 C 4.888 14.598 4.682 14.291 4.541 13.952 C 4.401 13.614 4.329 13.251 4.33 12.885 C 4.332 12.145 4.626 11.437 5.148 10.913 L 10.146 5.925 C 10.285 5.786 10.473 5.708 10.669 5.708 C 10.864 5.708 11.052 5.786 11.191 5.925 C 11.328 6.066 11.404 6.255 11.404 6.452 C 11.404 6.649 11.328 6.838 11.191 6.979 L 6.183 11.948 C 6.055 12.078 5.955 12.232 5.889 12.401 C 5.823 12.571 5.792 12.752 5.798 12.934 C 5.799 13.282 5.937 13.615 6.183 13.861 C 6.433 14.102 6.767 14.237 7.115 14.237 C 7.462 14.237 7.796 14.102 8.046 13.861 L 14.612 7.305 C 15.243 6.669 15.598 5.81 15.598 4.914 C 15.598 4.018 15.243 3.159 14.612 2.523 C 13.967 1.91 13.111 1.569 12.221 1.569 C 11.331 1.569 10.476 1.91 9.831 2.523 L 3.176 9.138 C 2.669 9.642 2.267 10.241 1.993 10.901 C 1.719 11.561 1.577 12.269 1.577 12.983 C 1.577 13.698 1.719 14.405 1.993 15.065 C 2.267 15.725 2.669 16.324 3.176 16.828 C 4.196 17.847 5.579 18.419 7.021 18.419 C 8.463 18.419 9.845 17.847 10.866 16.828 L 16.071 11.623 C 16.139 11.55 16.22 11.492 16.311 11.451 C 16.402 11.411 16.5 11.389 16.599 11.388 C 16.698 11.386 16.797 11.404 16.889 11.441 C 16.981 11.478 17.064 11.534 17.135 11.604 C 17.205 11.674 17.26 11.758 17.297 11.85 C 17.335 11.942 17.353 12.041 17.351 12.14 C 17.349 12.239 17.328 12.337 17.287 12.428 C 17.247 12.518 17.189 12.6 17.116 12.668 L 11.93 17.873 C 11.284 18.52 10.515 19.031 9.669 19.378 C 8.822 19.725 7.916 19.901 7.001 19.894 L 7.001 19.894 Z\" fill-rule=\"nonzero\"/>"
  },
  "globe": {
    "vb": "0 0 20.001 20.004",
    "body": "<path d=\"M 10 20.004 C 7.465 20.017 5.022 19.051 3.182 17.306 C 2.178 16.372 1.377 15.241 0.83 13.984 C 0.283 12.727 0 11.37 0 9.999 C 0 8.628 0.283 7.271 0.83 6.014 C 1.377 4.757 2.178 3.626 3.182 2.692 C 5.031 0.962 7.468 0 10 0 C 12.532 0 14.97 0.962 16.819 2.692 C 17.823 3.626 18.623 4.757 19.171 6.014 C 19.718 7.271 20.001 8.628 20.001 9.999 C 20.001 11.37 19.718 12.727 19.171 13.984 C 18.623 15.241 17.823 16.372 16.819 17.306 C 14.976 19.047 12.535 20.013 10 20.004 L 10 20.004 Z M 10 1.399 C 7.719 1.401 5.532 2.309 3.919 3.922 C 2.305 5.535 1.398 7.722 1.396 10.004 C 1.398 12.285 2.305 14.472 3.919 16.085 C 5.532 17.698 7.719 18.606 10 18.608 C 12.282 18.606 14.469 17.698 16.082 16.085 C 17.695 14.472 18.602 12.285 18.605 10.004 C 18.602 7.722 17.695 5.535 16.082 3.922 C 14.469 2.309 12.282 1.401 10 1.399 L 10 1.399 Z\" fill-rule=\"nonzero\"/>"
  },
  "mark": {
    "vb": "0 0 74.105 64.002",
    "body": "<path d=\"M 53.469 18.689 L 53.469 12.35 L 74.105 12.35 L 74.105 28.299 L 69.373 28.299 L 68.721 24.986 C 67.769 26.241 66.572 27.107 65.133 27.582 C 63.691 28.06 61.761 28.298 59.341 28.298 L 36.5 28.298 C 32.994 28.298 30.001 27.76 27.528 26.683 C 25.053 25.606 23.17 24.018 21.879 21.918 C 20.587 19.819 19.942 17.243 19.942 14.189 L 19.942 14.148 C 19.942 11.094 20.587 8.512 21.879 6.399 C 23.17 4.285 25.053 2.692 27.528 1.615 C 30.001 0.538 32.994 0 36.5 0 L 60.727 0 C 62.929 0 64.771 0.103 66.253 0.307 C 67.735 0.511 69.047 0.873 70.189 1.391 C 71.331 1.909 72.391 2.646 73.37 3.6 L 68.271 9.327 C 67.563 8.509 66.645 7.976 65.517 7.731 C 64.388 7.487 62.791 7.364 60.725 7.364 L 36.499 7.364 C 34.676 7.364 33.141 7.604 31.889 8.079 C 30.637 8.557 29.692 9.3 29.054 10.308 C 28.414 11.318 28.095 12.599 28.095 14.151 L 28.095 14.192 C 28.095 15.72 28.414 16.987 29.054 17.995 C 29.692 19.005 30.637 19.746 31.889 20.224 C 33.139 20.701 34.676 20.939 36.499 20.939 L 59.339 20.939 C 60.67 20.939 61.778 20.898 62.663 20.816 C 63.546 20.735 64.335 20.564 65.028 20.305 C 65.721 20.046 66.299 19.658 66.762 19.139 L 66.762 18.689 L 53.465 18.689 L 53.469 18.689 Z M 10.277 28.299 L 7.859 19.828 C 7.74 19.83 7.625 19.835 7.503 19.835 L 6.932 19.835 L 6.932 28.301 L 0 28.301 L 0 0 L 7.505 0 C 10.659 0 13.011 0.669 14.561 2.003 C 16.11 3.34 16.885 5.398 16.885 8.179 L 16.885 11.94 C 16.885 13.713 16.538 15.179 15.844 16.338 C 15.366 17.138 14.717 17.798 13.908 18.325 L 17.619 28.299 L 10.277 28.299 Z M 9.951 8.752 C 9.951 7.989 9.754 7.43 9.359 7.075 C 8.966 6.722 8.345 6.542 7.503 6.542 L 6.932 6.542 L 6.932 13.536 L 7.503 13.536 C 8.345 13.536 8.964 13.358 9.359 13.003 C 9.753 12.65 9.951 12.09 9.951 11.326 L 9.951 8.75 L 9.951 8.752 Z M 48.232 37.582 C 50.175 38.836 51.148 40.786 51.148 43.43 C 51.148 45.285 50.7 46.676 49.802 47.602 C 48.905 48.53 47.572 49.157 45.806 49.483 C 47.927 49.701 49.62 50.308 50.884 51.304 C 52.148 52.299 52.781 53.942 52.781 56.231 C 52.781 58.822 51.808 60.765 49.864 62.059 C 47.92 63.354 45.113 64.002 41.443 64.002 L 0.085 64.002 L 0.085 35.702 L 39.77 35.702 C 43.468 35.702 46.289 36.331 48.232 37.583 L 48.232 37.582 Z M 8.242 57.621 L 41.441 57.621 C 42.475 57.621 43.262 57.443 43.806 57.088 C 44.351 56.735 44.622 56.134 44.622 55.289 C 44.622 54.444 44.344 53.878 43.785 53.509 C 43.227 53.142 42.445 52.957 41.44 52.957 L 8.242 52.957 L 8.242 57.619 L 8.242 57.621 Z M 8.242 46.662 L 39.688 46.662 C 40.803 46.662 41.631 46.513 42.175 46.211 C 42.72 45.911 42.991 45.311 42.991 44.412 C 42.991 43.838 42.847 43.382 42.562 43.042 C 42.276 42.701 41.895 42.456 41.42 42.305 C 40.943 42.156 40.394 42.08 39.768 42.08 L 8.242 42.08 L 8.242 46.66 L 8.242 46.662 Z M 63.383 48.051 L 65.422 35.701 L 73.049 35.701 L 66.849 54.512 L 66.849 64 L 59.915 64 L 59.915 54.881 L 53.715 35.701 L 61.342 35.701 L 63.381 48.051 L 63.383 48.051 Z\" fill-rule=\"evenodd\"/>"
  },
  "reg": {
    "vb": "0 0 8.038 8.038",
    "body": "<path d=\"M 2.612 5.828 L 2.612 2.12 L 4.491 2.12 C 4.642 2.12 4.806 2.164 4.984 2.251 C 5.161 2.334 5.312 2.465 5.436 2.643 C 5.563 2.817 5.627 3.038 5.627 3.306 C 5.627 3.577 5.561 3.808 5.431 3.999 C 5.3 4.187 5.141 4.329 4.954 4.426 C 4.769 4.523 4.595 4.572 4.431 4.572 L 3.075 4.572 L 3.075 3.969 L 4.18 3.969 C 4.29 3.969 4.409 3.914 4.537 3.803 C 4.667 3.693 4.733 3.527 4.733 3.306 C 4.733 3.078 4.667 2.924 4.537 2.844 C 4.409 2.763 4.297 2.723 4.2 2.723 L 3.426 2.723 L 3.426 5.828 L 2.612 5.828 Z M 4.853 4.079 L 5.778 5.828 L 4.883 5.828 L 3.979 4.079 L 4.853 4.079 Z M 4.019 8.038 C 3.463 8.038 2.942 7.934 2.457 7.727 C 1.971 7.519 1.544 7.231 1.176 6.863 C 0.807 6.494 0.519 6.067 0.311 5.582 C 0.104 5.096 0 4.575 0 4.019 C 0 3.463 0.104 2.942 0.311 2.457 C 0.519 1.971 0.807 1.544 1.176 1.176 C 1.544 0.807 1.971 0.519 2.457 0.311 C 2.942 0.104 3.463 0 4.019 0 C 4.575 0 5.096 0.104 5.582 0.311 C 6.067 0.519 6.494 0.807 6.863 1.176 C 7.231 1.544 7.519 1.971 7.727 2.457 C 7.934 2.942 8.038 3.463 8.038 4.019 C 8.038 4.575 7.934 5.096 7.727 5.582 C 7.519 6.067 7.231 6.494 6.863 6.863 C 6.494 7.231 6.067 7.519 5.582 7.727 C 5.096 7.934 4.575 8.038 4.019 8.038 Z M 4.019 7.074 C 4.582 7.074 5.094 6.936 5.556 6.662 C 6.019 6.387 6.387 6.019 6.662 5.556 C 6.936 5.094 7.074 4.582 7.074 4.019 C 7.074 3.456 6.936 2.944 6.662 2.482 C 6.387 2.02 6.019 1.651 5.556 1.377 C 5.094 1.102 4.582 0.965 4.019 0.965 C 3.456 0.965 2.944 1.102 2.482 1.377 C 2.02 1.651 1.651 2.02 1.377 2.482 C 1.102 2.944 0.965 3.456 0.965 4.019 C 0.965 4.582 1.102 5.094 1.377 5.556 C 1.651 6.019 2.02 6.387 2.482 6.662 C 2.944 6.936 3.456 7.074 4.019 7.074 Z\" fill-rule=\"nonzero\"/>"
  },
  "c_rgby": {
    "vb": "0 0 48.632 42.001",
    "body": "<path d=\"M 35.089 12.265 L 35.089 8.105 L 48.632 8.105 L 48.632 18.571 L 45.526 18.571 L 45.098 16.397 C 44.473 17.221 43.688 17.789 42.743 18.101 C 41.797 18.414 40.53 18.57 38.942 18.57 L 23.953 18.57 C 21.652 18.57 19.688 18.217 18.065 17.511 C 16.441 16.804 15.205 15.762 14.358 14.384 C 13.51 13.006 13.087 11.315 13.087 9.311 L 13.087 9.285 C 13.087 7.28 13.51 5.586 14.358 4.199 C 15.205 2.812 16.441 1.767 18.065 1.06 C 19.688 0.353 21.652 0 23.953 0 L 39.852 0 C 41.297 0 42.506 0.068 43.479 0.201 C 44.451 0.335 45.312 0.573 46.061 0.913 C 46.811 1.253 47.507 1.736 48.149 2.363 L 44.803 6.121 C 44.338 5.584 43.736 5.234 42.996 5.074 C 42.255 4.913 41.206 4.833 39.851 4.833 L 23.952 4.833 C 22.756 4.833 21.749 4.99 20.927 5.302 C 20.106 5.615 19.486 6.103 19.067 6.765 C 18.647 7.427 18.437 8.268 18.437 9.287 L 18.437 9.314 C 18.437 10.316 18.647 11.148 19.067 11.809 C 19.486 12.472 20.106 12.959 20.927 13.272 C 21.747 13.585 22.756 13.741 23.952 13.741 L 38.941 13.741 C 39.815 13.741 40.542 13.714 41.123 13.661 C 41.702 13.607 42.22 13.495 42.675 13.325 C 43.13 13.155 43.509 12.9 43.813 12.56 L 43.813 12.265 L 35.087 12.265 L 35.089 12.265 Z M 6.745 18.571 L 5.158 13.012 C 5.08 13.013 5.004 13.017 4.924 13.017 L 4.549 13.017 L 4.549 18.573 L 0 18.573 L 0 0 L 4.925 0 C 6.995 0 8.539 0.439 9.556 1.315 C 10.572 2.192 11.081 3.542 11.081 5.367 L 11.081 7.836 C 11.081 8.999 10.853 9.961 10.398 10.722 C 10.084 11.247 9.658 11.68 9.127 12.026 L 11.562 18.571 L 6.745 18.571 Z M 6.531 5.743 C 6.531 5.243 6.401 4.876 6.142 4.643 C 5.884 4.411 5.476 4.294 4.924 4.294 L 4.549 4.294 L 4.549 8.883 L 4.924 8.883 C 5.476 8.883 5.882 8.766 6.142 8.533 C 6.4 8.302 6.531 7.934 6.531 7.433 L 6.531 5.742 L 6.531 5.743 Z M 31.652 24.663 C 32.927 25.486 33.566 26.766 33.566 28.501 C 33.566 29.718 33.272 30.631 32.683 31.239 C 32.094 31.848 31.219 32.259 30.06 32.473 C 31.452 32.616 32.563 33.015 33.393 33.668 C 34.222 34.321 34.637 35.4 34.637 36.902 C 34.637 38.602 33.999 39.877 32.724 40.726 C 31.447 41.576 29.605 42.001 27.197 42.001 L 0.056 42.001 L 0.056 23.43 L 26.099 23.43 C 28.526 23.43 30.377 23.842 31.652 24.664 L 31.652 24.663 Z M 5.409 37.814 L 27.196 37.814 C 27.874 37.814 28.391 37.697 28.748 37.464 C 29.105 37.233 29.283 36.838 29.283 36.283 C 29.283 35.729 29.101 35.358 28.734 35.115 C 28.368 34.874 27.854 34.753 27.195 34.753 L 5.409 34.753 L 5.409 37.812 L 5.409 37.814 Z M 5.409 30.622 L 26.045 30.622 C 26.777 30.622 27.32 30.524 27.678 30.326 C 28.035 30.129 28.213 29.735 28.213 29.145 C 28.213 28.769 28.119 28.47 27.931 28.246 C 27.744 28.023 27.494 27.862 27.182 27.763 C 26.869 27.665 26.508 27.615 26.098 27.615 L 5.409 27.615 L 5.409 30.621 L 5.409 30.622 Z M 41.595 31.533 L 42.933 23.429 L 47.938 23.429 L 43.87 35.773 L 43.87 42 L 39.319 42 L 39.319 36.016 L 35.251 23.429 L 40.256 23.429 L 41.594 31.533 L 41.595 31.533 Z\" fill-rule=\"evenodd\"/>"
  },
  "c_ten": {
    "vb": "0 0 304.189 216",
    "body": "<path d=\"M 196.19 0 C 255.658 0 304.189 48.532 304.189 108 C 304.189 167.468 255.658 216 196.19 216 C 136.723 216 88.191 168.152 88.191 108 C 88.191 48.532 136.04 0 196.19 0 Z M 87.493 188.66 L 49.215 188.66 L 0 31.445 L 87.493 31.445 L 87.493 188.66 Z M 196.19 67.671 C 174.318 67.671 155.862 86.127 155.862 108 C 155.862 129.873 174.318 148.329 196.19 148.329 C 218.064 148.329 235.837 129.873 236.52 108 C 236.519 86.127 218.064 67.671 196.19 67.671 Z\" fill-rule=\"nonzero\"/>"
  },
  "c_ring": {
    "vb": "0 0 36.000 35.999",
    "body": "<path d=\"M 5.272 5.272 C 12.302 -1.757 23.699 -1.757 30.728 5.272 C 37.757 12.301 37.757 23.698 30.728 30.727 C 23.699 37.756 12.302 37.756 5.272 30.727 C -1.757 23.698 -1.757 12.301 5.272 5.272 Z M 17.476 11.164 C 15.829 11.165 14.25 11.818 13.084 12.982 L 5.823 20.244 C 5.535 20.532 5.305 20.874 5.149 21.251 C 4.993 21.627 4.913 22.032 4.913 22.439 C 4.913 22.846 4.993 23.25 5.149 23.627 C 5.305 24.003 5.534 24.346 5.823 24.634 C 6.111 24.923 6.453 25.151 6.83 25.307 C 7.206 25.463 7.61 25.544 8.018 25.544 C 8.426 25.543 8.829 25.463 9.206 25.307 C 9.582 25.151 9.925 24.923 10.213 24.634 L 21.871 12.976 C 20.704 11.814 19.123 11.163 17.476 11.164 Z M 27.978 10.461 C 27.571 10.462 27.167 10.542 26.791 10.698 C 26.414 10.854 26.072 11.083 25.784 11.372 L 14.126 23.029 C 15.293 24.193 16.874 24.847 18.522 24.847 C 20.17 24.847 21.752 24.193 22.918 23.029 L 30.179 15.761 C 30.76 15.178 31.086 14.389 31.086 13.567 C 31.086 12.744 30.76 11.955 30.179 11.372 L 30.173 11.372 C 29.885 11.083 29.543 10.854 29.167 10.698 C 28.79 10.542 28.386 10.461 27.978 10.461 Z\" fill-rule=\"nonzero\"/>"
  }
};
Object.assign(__ds_scope, { GLYPHS });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/glyphs.js", error: String((e && e.message) || e) }); }

// components/brand/Icon.jsx
try { (() => {
const LINE = {
  plus: 1,
  close: 1
};
/** Icon set copied from the Figma file. Inline SVG, inherits currentColor. */
function Icon({
  name,
  size,
  color,
  open = false,
  className = "",
  style
}) {
  const s = size ? {
    width: size,
    height: size
  } : null;
  if (LINE[name]) return /*#__PURE__*/React.createElement("span", {
    className: "rg-lines rg-lines--" + name + (open ? " rg-lines--open" : "") + (className ? " " + className : ""),
    style: {
      color,
      ...s,
      ...style
    },
    "aria-hidden": "true"
  });
  const g = __ds_scope.GLYPHS[name];
  if (!g) return null;
  return /*#__PURE__*/React.createElement("svg", {
    className: "rg-icon rg-icon--" + name + (className ? " " + className : ""),
    viewBox: g.vb,
    fill: "currentColor",
    preserveAspectRatio: "xMidYMid meet",
    style: {
      color,
      ...s,
      ...style
    },
    "aria-hidden": "true",
    dangerouslySetInnerHTML: {
      __html: g.body
    }
  });
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Icon.jsx", error: String((e && e.message) || e) }); }

// components/actions/CarouselArrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** 98px round arrow from the Clients carousel — the only rounded shape in the system. */
function CarouselArrow({
  dir = "next",
  tone = "blue",
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": dir === "prev" ? "Назад" : "Вперёд",
    className: "rg-arrow rg-arrow--" + dir + " rg-arrow--" + tone + (className ? " " + className : "")
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow"
  }));
}
Object.assign(__ds_scope, { CarouselArrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/CarouselArrow.jsx", error: String((e && e.message) || e) }); }

// components/brand/Logo.jsx
try { (() => {
/** RGBY mark with ® — monochrome, colored via currentColor. */
function Logo({
  size = "l",
  color,
  className = "",
  style
}) {
  const cls = "rg-logo" + (size === "s" ? " rg-logo--s" : size === "footer" ? " rg-logo--footer" : "") + (className ? " " + className : "");
  return /*#__PURE__*/React.createElement("span", {
    className: cls,
    style: {
      color,
      ...style
    },
    role: "img",
    "aria-label": "RGBY"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "rg-logo__mark",
    viewBox: __ds_scope.GLYPHS.mark.vb,
    fill: "currentColor",
    dangerouslySetInnerHTML: {
      __html: __ds_scope.GLYPHS.mark.body
    }
  }), /*#__PURE__*/React.createElement("svg", {
    className: "rg-logo__reg",
    viewBox: __ds_scope.GLYPHS.reg.vb,
    fill: "currentColor",
    dangerouslySetInnerHTML: {
      __html: __ds_scope.GLYPHS.reg.body
    }
  }));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/content/AwardItem.jsx
try { (() => {
/** Award row with chevron; expands into numbered breakdown (e.g. "6 — Лучший проект"). */
function AwardItem({
  name,
  summary,
  items = [],
  card = false,
  defaultOpen = false,
  className = ""
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  return /*#__PURE__*/React.createElement("div", {
    className: "rg-award" + (open ? " rg-award--open" : "") + (card ? " rg-award--card" : "") + (className ? " " + className : "")
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "rg-award__head",
    "aria-expanded": open,
    onClick: () => items.length && setOpen(!open)
  }, /*#__PURE__*/React.createElement("span", {
    className: "rg-award__text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rg-award__name"
  }, name), /*#__PURE__*/React.createElement("span", {
    className: "rg-award__sum"
  }, summary)), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron"
  })), items.length ? /*#__PURE__*/React.createElement("div", {
    className: "rg-award__body"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "rg-award__rows"
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    className: "rg-award__row",
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "rg-award__count"
  }, it.count), /*#__PURE__*/React.createElement("span", null, it.label)))))) : null);
}
Object.assign(__ds_scope, { AwardItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/AwardItem.jsx", error: String((e && e.message) || e) }); }

// components/content/CaseCard.jsx
try { (() => {
const RATIO = {
  vertical: 678.46 / 572,
  horizontal: 188 / 334.66
};
const norm = f => f === "horizontal" || f === "landscape" || f === "wide" ? "horizontal" : "vertical";
/** Portfolio case: cover + year, ■ title, short description. Click opens the case modal. */
function CaseCard({
  cover,
  video,
  year,
  title,
  description,
  format = "vertical",
  onOpen,
  className = ""
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "rg-case" + (className ? " " + className : ""),
    style: {
      width: "100%"
    },
    onClick: onOpen
  }, /*#__PURE__*/React.createElement("div", {
    className: "rg-case__media",
    style: {
      paddingTop: RATIO[norm(format)] * 100 + "%"
    }
  }, video ? /*#__PURE__*/React.createElement("video", {
    src: video,
    poster: cover,
    muted: true,
    loop: true,
    playsInline: true,
    autoPlay: true
  }) : cover ? /*#__PURE__*/React.createElement("img", {
    src: cover,
    alt: title,
    loading: "lazy"
  }) : null, /*#__PURE__*/React.createElement("span", {
    className: "rg-case__open"
  }, "\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043A\u0435\u0439\u0441")), /*#__PURE__*/React.createElement("div", {
    className: "rg-case__info"
  }, year ? /*#__PURE__*/React.createElement("span", {
    className: "rg-case__year"
  }, year) : null, /*#__PURE__*/React.createElement("span", {
    className: "rg-case__title"
  }, title), description ? /*#__PURE__*/React.createElement("span", {
    className: "rg-case__desc"
  }, description) : null));
}
Object.assign(__ds_scope, { CaseCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/CaseCard.jsx", error: String((e && e.message) || e) }); }

// components/content/ClientTile.jsx
try { (() => {
/** Client logo tile. Logos are monochrome marks from the file. */
function ClientTile({
  logo = "rgby",
  tone = "mist",
  className = "",
  style
}) {
  const g = __ds_scope.GLYPHS["c_" + logo];
  return /*#__PURE__*/React.createElement("div", {
    className: "rg-client rg-client--" + tone + (className ? " " + className : ""),
    style: style
  }, logo === "sprite" || !g ? /*#__PURE__*/React.createElement("i", {
    className: "rg-client__img"
  }) : /*#__PURE__*/React.createElement("svg", {
    className: "rg-client__logo rg-client__logo--" + logo,
    viewBox: g.vb,
    fill: "currentColor",
    dangerouslySetInnerHTML: {
      __html: g.body
    }
  }));
}
Object.assign(__ds_scope, { ClientTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ClientTile.jsx", error: String((e && e.message) || e) }); }

// components/content/CtaCard.jsx
try { (() => {
/** «Не нашли свою задачу?» card that closes the services grid. */
function CtaCard({
  title = "Не нашли свою задачу?",
  text = "Оформляем всё, что выходит в эфир и вокруг него. Расскажите — соберём решение под вас",
  action = "Написать нам",
  tone = "blue",
  onAction,
  className = ""
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "rg-cta" + (tone === "ink" ? " rg-cta--ink" : tone === "outline" ? " rg-cta--outline" : "") + (className ? " " + className : "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "rg-cta__text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rg-cta__title"
  }, title), /*#__PURE__*/React.createElement("span", {
    className: "rg-cta__desc"
  }, text)), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: tone === "outline" ? "blue" : "paper",
    onClick: onAction
  }, action));
}
Object.assign(__ds_scope, { CtaCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/CtaCard.jsx", error: String((e && e.message) || e) }); }

// components/content/ServiceItem.jsx
try { (() => {
/** "Что мы делаем" entry: title, muted description, price (+unit), «Подробнее +» disclosure. */
function ServiceItem({
  title,
  description,
  price,
  unit,
  details = [],
  showLink = true,
  size = "m",
  surface = "none",
  priceSize = "m",
  onDiscuss,
  defaultOpen = false,
  className = ""
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const cls = "rg-service" + (open ? " rg-service--open" : "") + (size === "l" ? " rg-service--l" : "") + (priceSize === "xl" ? " rg-service--xl" : "") + (surface === "grey" ? " rg-service--card" : surface === "white" ? " rg-service--white" : "") + (className ? " " + className : "");
  return /*#__PURE__*/React.createElement("div", {
    className: cls
  }, /*#__PURE__*/React.createElement("div", {
    className: "rg-service__text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rg-service__title"
  }, title), /*#__PURE__*/React.createElement("span", {
    className: "rg-service__desc"
  }, description)), /*#__PURE__*/React.createElement("div", {
    className: "rg-service__foot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rg-service__price"
  }, price, unit ? /*#__PURE__*/React.createElement("span", {
    className: "rg-service__unit"
  }, unit) : null), showLink && details.length ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "rg-service__details"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("ul", {
    className: "rg-service__list"
  }, details.map((d, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, d))), onDiscuss ? /*#__PURE__*/React.createElement(__ds_scope.TextLink, {
    sign: "\u2192",
    onClick: onDiscuss
  }, "\u041E\u0431\u0441\u0443\u0434\u0438\u0442\u044C \u0437\u0430\u0434\u0430\u0447\u0443") : null)), /*#__PURE__*/React.createElement(__ds_scope.TextLink, {
    open: open,
    onClick: () => setOpen(!open)
  }, open ? "Свернуть" : "Подробнее")) : null));
}
Object.assign(__ds_scope, { ServiceItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ServiceItem.jsx", error: String((e && e.message) || e) }); }

// components/content/StatCard.jsx
try { (() => {
/** Hero number card: 84 Bold value + 24 Medium label. Counts up when `animate` and visible. */
function StatCard({
  value = "20+",
  label = "лет в эфире",
  tone = "muted",
  animate = false,
  className = ""
}) {
  const ref = React.useRef(null);
  const m = String(value).match(/^(\d+)(.*)$/);
  const [n, setN] = React.useState(animate && m ? 0 : null);
  React.useEffect(() => {
    if (!animate || !m || !ref.current) return;
    const target = +m[1];
    let raf, t0;
    const step = t => {
      t0 = t0 || t;
      const p = Math.min(1, (t - t0) / 1400);
      setN(Math.round(target * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    const wait = () => {
      const r = ref.current && ref.current.getBoundingClientRect();
      if (r && !document.documentElement.hasAttribute("data-preloading") && r.top < window.innerHeight * 0.9 && r.bottom > 0) raf = requestAnimationFrame(step);else raf = requestAnimationFrame(wait);
    };
    raf = requestAnimationFrame(wait);
    return () => cancelAnimationFrame(raf);
  }, [animate, value]);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: "rg-stat" + (tone === "blue" ? " rg-stat--blue" : "") + (className ? " " + className : "")
  }, /*#__PURE__*/React.createElement("span", {
    className: "rg-stat__value"
  }, n == null ? value : n + m[2]), /*#__PURE__*/React.createElement("span", {
    className: "rg-stat__label"
  }, label));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/content/TeamMember.jsx
try { (() => {
/** Team profile: name, role, photo, two highlighted positions and a compact career list. */
function TeamMember({
  name,
  role,
  photo,
  highlights = [],
  career = [],
  layout = "name-first",
  photoRatio = 502 / 453,
  className = ""
}) {
  const head = /*#__PURE__*/React.createElement("div", {
    className: "rg-member__head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rg-member__name"
  }, name), /*#__PURE__*/React.createElement("span", {
    className: "rg-member__role"
  }, role));
  const pic = /*#__PURE__*/React.createElement("div", {
    className: "rg-member__photo",
    style: {
      paddingTop: photoRatio * 100 + "%"
    }
  }, photo ? /*#__PURE__*/React.createElement("img", {
    src: photo,
    alt: name,
    loading: "lazy"
  }) : null);
  return /*#__PURE__*/React.createElement("div", {
    className: "rg-member" + (className ? " " + className : "")
  }, layout === "photo-first" ? /*#__PURE__*/React.createElement(React.Fragment, null, pic, head, /*#__PURE__*/React.createElement("div", {
    className: "rg-member__divider"
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, head, pic), /*#__PURE__*/React.createElement("div", {
    className: "rg-member__career"
  }, highlights.map((h, i) => /*#__PURE__*/React.createElement("div", {
    className: "rg-member__main",
    key: i
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, h.org), /*#__PURE__*/React.createElement("span", null, h.role)), /*#__PURE__*/React.createElement("span", {
    className: "rg-member__period"
  }, h.period))), career.length ? /*#__PURE__*/React.createElement("div", {
    className: "rg-member__rows"
  }, career.map((c, i) => /*#__PURE__*/React.createElement("div", {
    className: "rg-member__row",
    key: i
  }, /*#__PURE__*/React.createElement("span", null, c.org), /*#__PURE__*/React.createElement("span", null, c.role), /*#__PURE__*/React.createElement("span", null, c.period)))) : null));
}
Object.assign(__ds_scope, { TeamMember });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/TeamMember.jsx", error: String((e && e.message) || e) }); }

// components/forms/BudgetSlider.jsx
try { (() => {
const BUDGET_STEPS = [0, 250, 500, 750, 1000, 1500, 2000, 2500, 3000, 3800];
function formatBudget(k) {
  if (k <= 0) return "Пока не знаю";
  if (k < 1000) return k + "к";
  return (k / 1000).toString().replace(/\.0$/, "") + " млн";
}
/** Square-thumb budget slider. mode="single" (0 = «Пока не знаю») or mode="range" (two thumbs, tick labels). */
function BudgetSlider({
  mode = "single",
  value,
  onChange,
  label = "Ориентировочный бюджет",
  steps = BUDGET_STEPS,
  className = ""
}) {
  const track = React.useRef(null);
  const [drag, setDrag] = React.useState(-1);
  const max = steps.length - 1;
  const v = value != null ? value : mode === "range" ? [2, max] : 0;
  const idx = Array.isArray(v) ? v : [v];
  const pct = i => i / max * 100;
  const pick = (clientX, which) => {
    const r = track.current.getBoundingClientRect();
    const i = Math.round(Math.min(1, Math.max(0, (clientX - r.left) / r.width)) * max);
    if (mode === "range") {
      const n = [...idx];
      n[which] = i;
      if (n[0] > n[1]) n.reverse();
      onChange && onChange(n);
    } else onChange && onChange(i);
  };
  const down = e => {
    const r = track.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width * max;
    const which = mode === "range" ? Math.abs(x - idx[0]) <= Math.abs(x - idx[1]) ? 0 : 1 : 0;
    setDrag(which);
    pick(e.clientX, which);
    const mv = ev => pick(ev.clientX, which);
    const up = () => {
      setDrag(-1);
      window.removeEventListener("pointermove", mv);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", mv);
    window.addEventListener("pointerup", up);
  };
  const key = e => {
    const d = e.key === "ArrowRight" || e.key === "ArrowUp" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowDown" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    if (mode === "range") onChange && onChange([idx[0], Math.min(max, Math.max(idx[0], idx[1] + d))]);else onChange && onChange(Math.min(max, Math.max(0, idx[0] + d)));
  };
  const text = mode === "range" ? formatBudget(steps[idx[0]] || 0).replace("Пока не знаю", "0") + " — " + formatBudget(steps[idx[1]]) + " ₽" : idx[0] === 0 ? formatBudget(0) : formatBudget(steps[idx[0]]) + " ₽";
  const left = mode === "range" ? pct(idx[0]) : 0,
    right = mode === "range" ? pct(idx[1]) : pct(idx[0]);
  return /*#__PURE__*/React.createElement("div", {
    className: "rg-budget" + (mode === "range" ? " rg-budget--range" : "") + (className ? " " + className : "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "rg-budget__head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rg-budget__label"
  }, label), /*#__PURE__*/React.createElement("span", {
    className: "rg-budget__value"
  }, text)), /*#__PURE__*/React.createElement("div", {
    className: "rg-budget__track",
    ref: track,
    onPointerDown: down,
    tabIndex: 0,
    role: "slider",
    "aria-valuemin": 0,
    "aria-valuemax": max,
    "aria-valuenow": idx[idx.length - 1],
    "aria-valuetext": text,
    onKeyDown: key
  }, /*#__PURE__*/React.createElement("div", {
    className: "rg-budget__fill",
    style: {
      left: left + "%",
      width: right - left + "%"
    }
  }), idx.map((i, n) => /*#__PURE__*/React.createElement("div", {
    key: n,
    className: "rg-budget__thumb" + (drag === n ? " rg-budget__thumb--drag" : ""),
    style: {
      left: pct(i) + "%"
    }
  })), mode === "range" ? idx.map((i, n) => /*#__PURE__*/React.createElement("span", {
    key: "t" + n,
    className: "rg-budget__tick",
    style: {
      left: pct(i) + "%",
      transform: "translateX(" + (pct(i) < 18 ? "0" : pct(i) > 82 ? "-100%" : "-50%") + ")"
    }
  }, formatBudget(steps[i]).replace("Пока не знаю", "0"))) : null));
}
Object.assign(__ds_scope, { BUDGET_STEPS, formatBudget, BudgetSlider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/BudgetSlider.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** 16px outline checkbox on blue. */
function Checkbox({
  checked,
  onChange,
  children,
  error,
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: "rg-check" + (error ? " rg-check--error" : "") + (className ? " " + className : "")
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    checked: checked,
    onChange: onChange
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "rg-check__box"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check"
  })), /*#__PURE__*/React.createElement("span", null, children));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/ChoiceChip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Task-type toggle ("ТВ / Медиапроект"). */
function ChoiceChip({
  selected = false,
  children,
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-pressed": selected,
    className: "rg-chip" + (selected ? " rg-chip--on" : "") + (className ? " " + className : "")
  }, rest), children);
}
Object.assign(__ds_scope, { ChoiceChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/ChoiceChip.jsx", error: String((e && e.message) || e) }); }

// components/forms/FileAttach.jsx
try { (() => {
/** "Прикрепить бриф или референсы" — file picker with a filename summary ("бриф.docx +1"). */
function FileAttach({
  label = "Прикрепить бриф или референсы",
  files = [],
  onFiles,
  accept,
  multiple = true,
  className = ""
}) {
  const summary = files.length ? files[0].name + (files.length > 1 ? " +" + (files.length - 1) : "") : "";
  return /*#__PURE__*/React.createElement("div", {
    className: "rg-attach" + (className ? " " + className : "")
  }, /*#__PURE__*/React.createElement("label", {
    className: "rg-attach__btn"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "paperclip"
  }), /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("input", {
    type: "file",
    multiple: multiple,
    accept: accept,
    onChange: e => onFiles && onFiles(Array.from(e.target.files || []))
  })), summary ? /*#__PURE__*/React.createElement("span", {
    className: "rg-attach__files",
    title: files.map(f => f.name).join(", ")
  }, summary) : null);
}
Object.assign(__ds_scope, { FileAttach });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/FileAttach.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Brief-form field on blue. Translucent paper fill; turns solid paper with blue text when focused/filled. */
function TextField({
  label,
  required,
  multiline,
  value,
  onChange,
  error,
  className = "",
  ...rest
}) {
  const Tag = multiline ? "textarea" : "input";
  const filled = value != null && String(value).length > 0;
  return /*#__PURE__*/React.createElement("label", {
    className: "rg-field" + (filled ? " rg-field--filled" : "") + (error ? " rg-field--error" : "") + (className ? " " + className : "")
  }, label ? /*#__PURE__*/React.createElement("span", {
    className: "rg-field__label"
  }, label, required ? " *" : "") : null, /*#__PURE__*/React.createElement(Tag, _extends({
    className: "rg-field__control",
    value: value,
    onChange: onChange,
    rows: multiline ? 3 : undefined
  }, rest)), error ? /*#__PURE__*/React.createElement("span", {
    className: "rg-field__error"
  }, error) : null);
}
Object.assign(__ds_scope, { TextField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextField.jsx", error: String((e && e.message) || e) }); }

// components/overlay/Modal.jsx
try { (() => {
/** Right-side sheet over a 60% ink scrim. Esc / scrim click closes. Locks page scroll while open. */
function Modal({
  open,
  onClose,
  title,
  actions,
  children,
  className = ""
}) {
  React.useEffect(() => {
    if (!open) return;
    const k = e => e.key === "Escape" && onClose && onClose();
    window.addEventListener("keydown", k);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", k);
      document.documentElement.style.overflow = "";
    };
  }, [open]);
  return /*#__PURE__*/React.createElement("div", {
    className: "rg-modal" + (open ? " rg-modal--open" : "") + (className ? " " + className : ""),
    "aria-hidden": !open,
    role: "dialog",
    "aria-modal": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rg-modal__scrim",
    onClick: onClose
  }), /*#__PURE__*/React.createElement("div", {
    className: "rg-modal__panel",
    "data-lenis-prevent": ""
  }, /*#__PURE__*/React.createElement("div", {
    className: "rg-modal__bar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-label",
    style: {
      opacity: .5
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--sp-10)",
      alignItems: "center"
    }
  }, actions, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "rg-modal__close",
    "aria-label": "\u0417\u0430\u043A\u0440\u044B\u0442\u044C",
    onClick: onClose
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "close"
  })))), children));
}
Object.assign(__ds_scope, { Modal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlay/Modal.jsx", error: String((e && e.message) || e) }); }

// components/overlay/Notice.jsx
try { (() => {
/** «Закон о русификации» pop-up: ink panel, 32 Bold title, 60% body, × close. */
function Notice({
  title = "Закон о русификации",
  children,
  variant = "card",
  onClose,
  className = "",
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    className: "rg-notice" + (variant === "wide" ? " rg-notice--wide" : variant === "compact" ? " rg-notice--compact" : "") + (className ? " " + className : ""),
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    className: "rg-notice__body"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rg-notice__title"
  }, title), /*#__PURE__*/React.createElement("span", {
    className: "rg-notice__text"
  }, children)), onClose ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "rg-notice__close",
    "aria-label": "\u0417\u0430\u043A\u0440\u044B\u0442\u044C",
    onClick: onClose
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "close"
  })) : null);
}
Object.assign(__ds_scope, { Notice });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlay/Notice.jsx", error: String((e && e.message) || e) }); }


















__ds_ns.Burger = __ds_scope.Burger;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.CarouselArrow = __ds_scope.CarouselArrow;

__ds_ns.TextLink = __ds_scope.TextLink;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.GLYPHS = __ds_scope.GLYPHS;

__ds_ns.AwardItem = __ds_scope.AwardItem;

__ds_ns.CaseCard = __ds_scope.CaseCard;

__ds_ns.ClientTile = __ds_scope.ClientTile;

__ds_ns.CtaCard = __ds_scope.CtaCard;

__ds_ns.ServiceItem = __ds_scope.ServiceItem;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.TeamMember = __ds_scope.TeamMember;

__ds_ns.BUDGET_STEPS = __ds_scope.BUDGET_STEPS;

__ds_ns.BudgetSlider = __ds_scope.BudgetSlider;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.ChoiceChip = __ds_scope.ChoiceChip;

__ds_ns.FileAttach = __ds_scope.FileAttach;

__ds_ns.TextField = __ds_scope.TextField;

__ds_ns.Modal = __ds_scope.Modal;

__ds_ns.Notice = __ds_scope.Notice;

})();
