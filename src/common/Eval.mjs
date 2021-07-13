// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "rescript/lib/es6/curry.js";
import * as React from "react";
import * as $$Worker from "../bindings/Worker.mjs";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";
import * as Caml_option from "rescript/lib/es6/caml_option.js";

var source = "EvalSource";

function make(param) {
  return (new Worker(new URL("./EvalWorker.mjs", import.meta.url)));
}

var Config = {
  make: make
};

var EvalWorker = $$Worker.Make(Config);

function workerMessageToAction(message) {
  var message$1 = message.result;
  var forCode = message.forCode;
  if (message$1.TAG === /* Ok */0) {
    return {
            TAG: 1,
            forCode: forCode,
            [Symbol.for("name")]: "Success"
          };
  } else {
    return {
            TAG: 2,
            forCode: forCode,
            message: message$1._0,
            [Symbol.for("name")]: "Exception"
          };
  }
}

function reducer(state, action) {
  if (typeof state === "number") {
    if (action.TAG === /* Evaluate */0) {
      return {
              TAG: 0,
              code: action._0,
              logs: [],
              [Symbol.for("name")]: "Evaluating"
            };
    } else {
      return state;
    }
  }
  switch (state.TAG | 0) {
    case /* Evaluating */0 :
        var logs = state.logs;
        var code = state.code;
        switch (action.TAG | 0) {
          case /* Evaluate */0 :
              return state;
          case /* Success */1 :
              if (action.forCode === code) {
                return {
                        TAG: 1,
                        logs: logs,
                        [Symbol.for("name")]: "Evaluated"
                      };
              } else {
                return state;
              }
          case /* Exception */2 :
              if (action.forCode === code) {
                return {
                        TAG: 2,
                        logs: logs.concat([action.message]),
                        [Symbol.for("name")]: "Error"
                      };
              } else {
                return state;
              }
          case /* Log */3 :
              if (action.forCode === code) {
                return {
                        TAG: 0,
                        code: code,
                        logs: logs.concat([action.message]),
                        [Symbol.for("name")]: "Evaluating"
                      };
              } else {
                return state;
              }
          
        }
    case /* Evaluated */1 :
        if (action.TAG === /* Evaluate */0) {
          return {
                  TAG: 0,
                  code: action._0,
                  logs: [],
                  [Symbol.for("name")]: "Evaluating"
                };
        } else {
          return state;
        }
    case /* Error */2 :
        if (action.TAG === /* Evaluate */0) {
          return {
                  TAG: 0,
                  code: action._0,
                  logs: [],
                  [Symbol.for("name")]: "Evaluating"
                };
        } else {
          return state;
        }
    
  }
}

function useEval(param) {
  var match = React.useReducer(reducer, /* Idle */0);
  var dispatch = match[1];
  var state = match[0];
  var workerRef = React.useRef(undefined);
  React.useEffect((function () {
          workerRef.current = Caml_option.some(Curry._1(EvalWorker.make, undefined));
          return (function (param) {
                    Belt_Option.map(workerRef.current, (function (worker) {
                            return Curry._1(EvalWorker.App.terminate, worker);
                          }));
                    
                  });
        }), []);
  React.useEffect((function () {
          var maybeWorker = workerRef.current;
          if (typeof state !== "number" && state.TAG === /* Evaluating */0) {
            var code = state.code;
            Belt_Option.forEach(maybeWorker, (function (worker) {
                    return Curry._2(EvalWorker.App.postMessage, worker, {
                                source: source,
                                payload: {
                                  _0: code,
                                  [Symbol.for("name")]: "EvalMessage"
                                }
                              });
                  }));
          }
          
        }), [state]);
  return [
          state,
          (function (code) {
              return Curry._1(dispatch, {
                          TAG: 0,
                          _0: code,
                          [Symbol.for("name")]: "Evaluate"
                        });
            })
        ];
}

export {
  source ,
  Config ,
  EvalWorker ,
  workerMessageToAction ,
  reducer ,
  useEval ,
  
}
/* EvalWorker Not a pure module */
