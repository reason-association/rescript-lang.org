

import * as Js_mapperRt from "bs-platform/lib/es6/js_mapperRt.js";

var _map = {"CH":"zh","RUS":"ru-RU","SWE":"sv-SE","US":"en-US"};

var _revMap = {"zh":"CH","ru-RU":"RUS","sv-SE":"SWE","en-US":"US"};

function localeToJs(param) {
  return _map[param];
}

function localeFromJs(param) {
  return Js_mapperRt.raiseWhenNotFound(_revMap[param]);
}

var _map$1 = {"long":"long","short":"short","narrow":"narrow"};

function tToJs(param) {
  return param;
}

function tFromJs(param) {
  return Js_mapperRt.raiseWhenNotFound(_map$1[param]);
}

function make(value) {
  return value;
}

var Weekday = {
  tToJs: tToJs,
  tFromJs: tFromJs,
  make: make
};

var _map$2 = {"long":"long","short":"short","narrow":"narrow"};

function tToJs$1(param) {
  return param;
}

function tFromJs$1(param) {
  return Js_mapperRt.raiseWhenNotFound(_map$2[param]);
}

function make$1(value) {
  return value;
}

var Era = {
  tToJs: tToJs$1,
  tFromJs: tFromJs$1,
  make: make$1
};

var _map$3 = {"numeric":"numeric","twoDigit":"2-digit"};

var _revMap$1 = {"numeric":"numeric","2-digit":"twoDigit"};

function tToJs$2(param) {
  return _map$3[param];
}

function tFromJs$2(param) {
  return Js_mapperRt.raiseWhenNotFound(_revMap$1[param]);
}

function make$2(value) {
  return _map$3[value];
}

var Year = {
  tToJs: tToJs$2,
  tFromJs: tFromJs$2,
  make: make$2
};

var _map$4 = {"numeric":"numeric","twoDigit":"2-digit"};

var _revMap$2 = {"numeric":"numeric","2-digit":"twoDigit"};

function tToJs$3(param) {
  return _map$4[param];
}

function tFromJs$3(param) {
  return Js_mapperRt.raiseWhenNotFound(_revMap$2[param]);
}

function make$3(value) {
  return _map$4[value];
}

var Day = {
  tToJs: tToJs$3,
  tFromJs: tFromJs$3,
  make: make$3
};

var _map$5 = {"long":"long","short":"short","narrow":"narrow","numeric":"numeric","twoDigit":"2-digit"};

var _revMap$3 = {"long":"long","short":"short","narrow":"narrow","numeric":"numeric","2-digit":"twoDigit"};

function tToJs$4(param) {
  return _map$5[param];
}

function tFromJs$4(param) {
  return Js_mapperRt.raiseWhenNotFound(_revMap$3[param]);
}

function make$4(value) {
  return _map$5[value];
}

var Month = {
  tToJs: tToJs$4,
  tFromJs: tFromJs$4,
  make: make$4
};

function make$5(localeOpt, options, date) {
  var locale = localeOpt !== undefined ? localeOpt : "US";
  return new (Intl.DateTimeFormat)(localeToJs(locale), options).format(date);
}

var $$Date = {
  Weekday: Weekday,
  Era: Era,
  Year: Year,
  Day: Day,
  Month: Month,
  make: make$5
};

export {
  localeToJs ,
  localeFromJs ,
  $$Date ,
  
}
/* No side effect */