

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";

function make(completed, method_Opt, contentTypeOpt, url) {
  var method_ = method_Opt !== undefined ? method_Opt : /* Get */0;
  var contentType = contentTypeOpt !== undefined ? contentTypeOpt : /* Json */0;
  var xhr = new XMLHttpRequest();
  var method_$1 = method_ ? "POST" : "GET";
  xhr.onload = (function (param) {
      var status = xhr.status;
      var text = Belt_Option.getWithDefault(Caml_option.nullable_to_opt(xhr.responseText), "");
      if (status === 200) {
        return Curry._1(completed, {
                    TAG: 0,
                    _0: {
                      status: status,
                      text: text
                    },
                    [Symbol.for("name")]: "Ok"
                  });
      } else {
        return Curry._1(completed, {
                    TAG: 1,
                    _0: {
                      status: status,
                      text: text
                    },
                    [Symbol.for("name")]: "Error"
                  });
      }
    });
  xhr.onerror = (function (param) {
      return Curry._1(completed, {
                  TAG: 1,
                  _0: {
                    status: xhr.status,
                    text: "Connection error"
                  },
                  [Symbol.for("name")]: "Error"
                });
    });
  xhr.open(method_$1, url);
  if (contentType) {
    xhr.setRequestHeader("Content-Type", "text/plain");
  } else {
    xhr.setRequestHeader("Content-Type", "application/json");
  }
  return xhr;
}

function send(req) {
  req.send();
  
}

function abort(req) {
  req.abort();
  
}

export {
  make ,
  send ,
  abort ,
  
}
/* No side effect */