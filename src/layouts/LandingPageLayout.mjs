// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Mdx from "../common/Mdx.mjs";
import * as Icon from "../components/Icon.mjs";
import * as Meta from "../components/Meta.mjs";
import * as Next from "../bindings/Next.mjs";
import * as Curry from "rescript/lib/es6/curry.js";
import * as React from "react";
import * as Button from "../components/Button.mjs";
import * as Footer from "../components/Footer.mjs";
import * as Markdown from "../components/Markdown.mjs";
import * as LzString from "lz-string";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";
import * as Navigation from "../components/Navigation.mjs";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as HighlightJs from "../common/HighlightJs.mjs";
import * as ImageGallery from "../components/ImageGallery.mjs";

function LandingPageLayout$Intro(Props) {
  return React.createElement("section", {
              className: "flex justify-center"
            }, React.createElement("div", {
                  className: "max-w-1060 flex flex-col items-center px-5 sm:px-8 lg:box-content"
                }, React.createElement("h1", {
                      className: "hl-title text-center max-w-[53rem]"
                    }, "Fast, Simple, Fully Typed JavaScript from the Future"), React.createElement("h2", {
                      className: "body-lg text-center text-gray-60 my-4 max-w-[40rem]"
                    }, "ReScript is a robustly typed language that compiles to efficient\n            and human-readable JavaScript. It comes with a lightning fast\n            compiler toolchain that scales to any codebase size."), React.createElement("div", {
                      className: "mt-4 mb-2"
                    }, React.createElement(Next.Link.make, {
                          href: "/docs/manual/latest/installation",
                          passHref: true,
                          children: React.createElement(Button.make, {
                                children: "Get started"
                              })
                        }))));
}

var examples = [{
    res: "module Button = {\n  @react.component\n  let make = (~count: int) => {\n    let times = switch count {\n    | 1 => \"once\"\n    | 2 => \"twice\"\n    | n => Belt.Int.toString(n) ++ \" times\"\n    }\n    let msg = \"Click me \" ++ times\n\n    <button> {msg->React.string} </button>\n  }\n}",
    js: "var React = require(\"react\");\n\nfunction Playground$Button(Props) {\n  var count = Props.count;\n  var times = count !== 1 ? (\n      count !== 2 ? String(count) + \" times\" : \"twice\"\n    ) : \"once\";\n  var msg = \"Click me \" + times;\n  return React.createElement(\"button\", undefined, msg);\n}\n\nvar Button = {\n  make: Playground$Button\n};\n\nexports.Button = Button;"
  }];

function LandingPageLayout$PlaygroundHero(Props) {
  var match = React.useState(function () {
        return examples[0];
      });
  var example = match[0];
  return React.createElement("section", {
              className: "relative mt-20 bg-gray-10"
            }, React.createElement("div", {
                  className: "relative flex justify-center w-full"
                }, React.createElement("div", {
                      className: "relative w-full pt-6 pb-8 sm:px-8 md:px-16 max-w-[1400px]"
                    }, React.createElement("div", {
                          className: "relative z-2 flex flex-col md:flex-row bg-gray-90 mx-auto sm:rounded-lg max-w-[1280px]"
                        }, React.createElement("div", {
                              className: "md:w-1/2"
                            }, React.createElement("div", {
                                  className: "body-sm text-gray-40 text-center py-3 sm:rounded-t-lg md:rounded-tl-lg bg-gray-100"
                                }, "Write in ReScript"), React.createElement("pre", {
                                  className: "text-14 px-8 pt-6 pb-12 whitespace-pre-wrap"
                                }, HighlightJs.renderHLJS(undefined, true, example.res, "res", undefined))), React.createElement("div", {
                              className: "md:w-1/2 "
                            }, React.createElement("div", {
                                  className: "body-sm text-gray-40 py-3 text-center md:border-l border-gray-80 bg-gray-100 sm:rounded-tr-lg"
                                }, "Compile to JavaScript"), React.createElement("pre", {
                                  className: "text-14 px-8 pt-6 pb-14 md:border-l border-gray-80 whitespace-pre-wrap"
                                }, HighlightJs.renderHLJS(undefined, true, example.js, "js", undefined)))), React.createElement("div", undefined, React.createElement(Next.Link.make, {
                              href: "/try?code=" + LzString.compressToEncodedURIComponent(example.res) + "}",
                              children: React.createElement("a", {
                                    className: "captions md:px-0 border-b border-gray-40 hover:border-gray-60 text-gray-60",
                                    target: "_blank"
                                  }, "Edit this example in Playground")
                            })), React.createElement("div", {
                          className: "hidden md:block"
                        }, React.createElement("img", {
                              className: "absolute z-0 left-0 top-0 -ml-10 -mt-6",
                              style: {
                                height: "24rem",
                                width: "24rem"
                              },
                              src: "/static/lp/grid.svg"
                            }), React.createElement("img", {
                              className: "absolute z-0 left-0 top-0 -ml-10 mt-10",
                              src: "/static/lp/illu_left.png"
                            })), React.createElement("div", {
                          className: "hidden md:block"
                        }, React.createElement("img", {
                              className: "absolute z-0 right-0 bottom-0 -mb-10 mt-24 -mr-10",
                              style: {
                                height: "24rem",
                                width: "24rem"
                              },
                              src: "/static/lp/grid.svg"
                            }), React.createElement("img", {
                              className: "absolute z-3 right-0 bottom-0 -mr-2 mb-10",
                              src: "/static/lp/illu_right.png"
                            })))));
}

var copyToClipboard = (function(str) {
    try {
      const el = document.createElement('textarea');
      el.value = str;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      const selected =
        document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        if (selected) {
          document.getSelection().removeAllRanges();
          document.getSelection().addRange(selected);
        }
        return true;
      } catch(e) {
        return false;
      }
    });

function LandingPageLayout$QuickInstall$CopyButton(Props) {
  var code = Props.code;
  var match = React.useState(function () {
        return /* Init */0;
      });
  var setState = match[1];
  var state = match[0];
  var buttonRef = React.useRef(null);
  var onClick = function (evt) {
    evt.preventDefault();
    if (copyToClipboard(code)) {
      return Curry._1(setState, (function (param) {
                    return /* Copied */1;
                  }));
    } else {
      return Curry._1(setState, (function (param) {
                    return /* Failed */2;
                  }));
    }
  };
  React.useEffect((function () {
          if (state !== 1) {
            return ;
          }
          var buttonEl = Belt_Option.getExn(Caml_option.nullable_to_opt(buttonRef.current));
          var bannerEl = document.createElement("div");
          bannerEl.className = "foobar opacity-0 absolute top-0 mt-4 -mr-1 px-2 rounded right-0 \n            bg-turtle text-gray-80-tr body-sm\n            transition-all duration-500 ease-in-out ";
          var textNode = document.createTextNode("Copied!");
          bannerEl.appendChild(textNode);
          buttonEl.appendChild(bannerEl);
          var nextFrameId = window.requestAnimationFrame(function (param) {
                bannerEl.classList.toggle("opacity-0");
                bannerEl.classList.toggle("opacity-100");
                
              });
          var timeoutId = setTimeout((function (param) {
                  buttonEl.removeChild(bannerEl);
                  return Curry._1(setState, (function (param) {
                                return /* Init */0;
                              }));
                }), 2000);
          return (function (param) {
                    window.cancelAnimationFrame(nextFrameId);
                    clearTimeout(timeoutId);
                    
                  });
        }), [state]);
  return React.createElement("button", {
              ref: buttonRef,
              className: "relative h-10 w-10 flex justify-center\titems-center ",
              disabled: state === /* Copied */1,
              onClick: onClick
            }, React.createElement(Icon.Copy.make, {
                  className: "w-6 h-6 mt-px text-gray-40 hover:cursor-pointer hover:text-gray-80"
                }));
}

function copyBox(text) {
  return React.createElement("div", {
              className: "flex justify-between items-center pl-6 pr-3 py-3 w-full bg-gray-10 border border-gray-20 rounded max-w-[25rem]"
            }, React.createElement("span", {
                  className: "font-mono text-14  text-gray-70"
                }, text), React.createElement(LandingPageLayout$QuickInstall$CopyButton, {
                  code: text
                }));
}

function LandingPageLayout$QuickInstall$Instructions(Props) {
  return React.createElement("div", {
              className: "w-full max-w-[400px]"
            }, React.createElement("h2", {
                  className: "hl-3 lg:mt-12"
                }, "Quick Install"), React.createElement("div", {
                  className: "captions x text-gray-40 mb-2 mt-1"
                }, "You can quickly add ReScript to your existing JavaScript codebase via npm / yarn:"), React.createElement("div", {
                  className: "w-full space-y-2"
                }, copyBox("npm install rescript --save-dev"), copyBox("npx rescript init .")));
}

function LandingPageLayout$QuickInstall(Props) {
  return React.createElement("section", {
              className: "my-32 sm:px-4 sm:flex sm:justify-center"
            }, React.createElement("div", {
                  className: "max-w-1060 flex flex-col w-full px-5 md:px-8 lg:px-8 lg:box-content "
                }, React.createElement("div", {
                      className: "relative max-w-[28rem]"
                    }, React.createElement("p", {
                          className: "relative z-1 space-y-12 text-gray-80 font-semibold text-24 md:text-32 leading-2"
                        }, React.createElement("span", {
                              className: "bg-fire-5 rounded-lg border border-fire-10 p-1 "
                            }, "Leverage the full power"), " of JavaScript in a robustly typed language without the fear of `any` types.")), React.createElement("div", {
                      className: "w-full mt-12 md:flex flex-col lg:flex-row md:justify-between "
                    }, React.createElement("p", {
                          className: "relative z-1 text-gray-80 font-semibold text-24 md:text-32 leading-2 max-w-[32rem]"
                        }, "ReScript is used to ship and maintain mission-critical products with good UI and UX."), React.createElement("div", {
                          className: "mt-16 lg:mt-0 self-end",
                          style: {
                            maxWidth: "25rem"
                          }
                        }, React.createElement(LandingPageLayout$QuickInstall$Instructions, {})))));
}

function LandingPageLayout$MainUSP$Item(Props) {
  var caption = Props.caption;
  var title = Props.title;
  var mediaOpt = Props.media;
  var polygonDirectionOpt = Props.polygonDirection;
  var paragraph = Props.paragraph;
  var media = mediaOpt !== undefined ? Caml_option.valFromOption(mediaOpt) : "Placeholder";
  var polygonDirection = polygonDirectionOpt !== undefined ? polygonDirectionOpt : /* Down */1;
  var polyPointsLg = polygonDirection ? "80,0 85,100 100,100 100,0" : "85,0 80,100 100,100 100,0";
  var polyPointsMobile = polygonDirection ? "0,100 100,100 100,70 0,80" : "0,100 100,100 100,78 0,72";
  var polyColor = polygonDirection ? "text-fire-30" : "text-fire";
  return React.createElement("div", {
              className: "relative flex justify-center w-full bg-gray-90 px-5 sm:px-8 lg:px-14 overflow-hidden"
            }, React.createElement("div", {
                  className: "relative max-w-1060 z-3 flex flex-wrap justify-center lg:justify-between pb-16 pt-20 md:pb-20 md:pt-32 lg:pb-40 md:space-x-4 w-full"
                }, React.createElement("div", {
                      className: "max-w-[24rem] flex flex-col justify-center mb-6 lg:mb-2"
                    }, React.createElement("div", {
                          className: "hl-overline text-gray-20 mb-4"
                        }, caption), React.createElement("h3", {
                          className: "text-gray-10 mb-4 hl-2 font-semibold"
                        }, title), React.createElement("div", {
                          className: "flex"
                        }, React.createElement("div", {
                              className: "text-gray-30 body-md pr-8"
                            }, paragraph))), React.createElement("div", {
                      className: "relative mt-10 lg:mt-0"
                    }, React.createElement("div", {
                          className: "relative w-full z-2 bg-gray-90 rounded-lg flex md:mt-0 items-center justify-center rounded-lg",
                          style: {
                            maxWidth: "35rem",
                            boxShadow: "0px 4px 55px 0px rgba(230,72,79,0.10)"
                          }
                        }, media), React.createElement("img", {
                          className: "absolute z-1 bottom-0 right-0 -mb-12 -mr-12",
                          style: {
                            maxWidth: "20rem"
                          },
                          src: "/static/lp/grid2.svg"
                        }))), React.createElement("svg", {
                  className: "md:hidden absolute z-1 w-full h-full bottom-0 left-0 " + polyColor,
                  preserveAspectRatio: "none",
                  viewBox: "0 0 100 100"
                }, React.createElement("polygon", {
                      className: "fill-current",
                      points: polyPointsMobile
                    })), React.createElement("svg", {
                  className: "hidden md:block absolute z-1 w-full h-full right-0 top-0 " + polyColor,
                  preserveAspectRatio: "none",
                  viewBox: "0 0 100 100"
                }, React.createElement("polygon", {
                      className: "fill-current",
                      points: polyPointsLg
                    })));
}

var item1 = React.createElement(LandingPageLayout$MainUSP$Item, {
      caption: "Fast and simple",
      title: "The fastest build system on the web",
      media: React.createElement("video", {
            className: "rounded-lg",
            controls: true,
            poster: "/static/lp/fast-build-preview.jpg"
          }, React.createElement("source", {
                src: "https://assets-17077.kxcdn.com/videos/fast-build-3.mp4",
                type: "video/mp4"
              })),
      paragraph: React.createElement(React.Fragment, undefined, React.createElement("p", undefined, "ReScript cares about a consistent and fast\n      feedback loop for any codebase size. Refactor code, pull complex changes,\n      or switch to feature branches as you please. No sluggish CI builds, stale\n      caches, wrong type hints, or memory hungry language servers that slow you\n      down."), React.createElement("p", {
                className: "mt-6"
              }, React.createElement(Next.Link.make, {
                    href: "/docs/manual/latest/build-performance",
                    passHref: true,
                    children: React.createElement(Button.make, {
                          kind: /* PrimaryBlue */1,
                          size: /* Small */0,
                          children: "Learn more"
                        })
                  })))
    });

var item2 = React.createElement(LandingPageLayout$MainUSP$Item, {
      caption: "A robust type system",
      title: React.createElement("span", {
            className: "text-transparent bg-clip-text bg-gradient-to-r from-berry-dark-50 to-fire-50"
          }, "Type Better"),
      media: React.createElement("video", {
            className: "rounded-lg",
            controls: true,
            poster: "/static/lp/type-better-preview.jpg"
          }, React.createElement("source", {
                src: "https://assets-17077.kxcdn.com/videos/type-better-3.mp4",
                type: "video/mp4"
              })),
      polygonDirection: /* Up */0,
      paragraph: "Every ReScript app is fully typed and provides\n      reliable type information for any given value in your program. We\n      prioritize simpler types over complex types for the sake of\n      clarity and easy debugability. No `any`, no magic types, no surprise\n      `undefined`.\n      "
    });

var item3 = React.createElement(LandingPageLayout$MainUSP$Item, {
      caption: "Seamless Integration",
      title: React.createElement(React.Fragment, undefined, React.createElement("span", {
                className: "text-orange-dark"
              }, "The familiar JS ecosystem"), " at your fingertips"),
      media: React.createElement("video", {
            className: "rounded-lg",
            controls: true,
            poster: "/static/lp/interop-example-preview.jpg"
          }, React.createElement("source", {
                src: "https://assets-17077.kxcdn.com/videos/interop-example-2.mp4",
                type: "video/mp4"
              })),
      paragraph: "Use any library from JavaScript, export ReScript\n      libraries to JavaScript, automatically generate TypeScript types. It's\n      like you've never left the good parts of JavaScript at all."
    });

function LandingPageLayout$MainUSP(Props) {
  return React.createElement("section", {
              className: "w-full bg-gray-90 overflow-hidden",
              style: {
                minHeight: "37rem"
              }
            }, item1, item2, item3);
}

function LandingPageLayout$OtherSellingPoints(Props) {
  return React.createElement("section", {
              className: "flex justify-center w-full bg-gray-90 border-t border-gray-80\n            px-4 sm:px-8 lg:px-16 pt-24 pb-20 "
            }, React.createElement("div", {
                  className: "max-w-1060 grid grid-cols-4 md:grid-cols-10 grid-rows-2 gap-8"
                }, React.createElement("div", {
                      className: "pb-24 md:pb-32 row-span-2 row-start-1 col-start-1 col-span-4 md:col-span-6"
                    }, React.createElement(ImageGallery.make, {
                          className: "w-full ",
                          imgClassName: "w-full h-[25.9rem] object-cover rounded-lg",
                          imgSrcs: [
                            "/static/lp/community-3.jpg",
                            "/static/lp/community-2.jpg",
                            "/static/lp/community-1.jpg"
                          ]
                        }), React.createElement("h3", {
                          className: "hl-3 text-gray-20 mt-4 mb-2"
                        }, "A community of programmers who value getting things done"), React.createElement("p", {
                          className: "body-md text-gray-40"
                        }, "No language can be popular without a solid\n            community. A great type system isn't useful if library authors\n            abuse it. Performance doesn't show if all the libraries are slow.\n            Join the ReScript community — A group of companies and individuals\n            who deeply care about simplicity, speed and practicality."), React.createElement("div", {
                          className: "mt-6"
                        }, React.createElement(Button.make, {
                              href: "https://forum.rescript-lang.org",
                              target: "_blank",
                              kind: /* PrimaryBlue */1,
                              size: /* Small */0,
                              children: "Join our Forum"
                            }))), React.createElement("div", {
                      className: "col-span-4 lg:row-start-1"
                    }, React.createElement("img", {
                          className: "w-full rounded-lg border-2 border-turtle-dark",
                          src: "/static/lp/editor-tooling-1.jpg"
                        }), React.createElement("h3", {
                          className: "hl-3 text-gray-20 mt-6 mb-2"
                        }, "Tooling that just works out of the box"), React.createElement("p", {
                          className: "body-md text-gray-40"
                        }, "A builtin pretty printer, memory friendly\n            VSCode & Vim plugins, a stable type system and compiler that doesn't require lots\n            of extra configuration. ReScript brings all the tools you need to\n            build reliable JavaScript, Node and ReactJS applications.")), React.createElement("div", {
                      className: "col-span-4 lg:row-start-2"
                    }, React.createElement("img", {
                          className: "w-full rounded-lg border-2 border-fire-30",
                          src: "/static/lp/easy-to-unadopt.jpg"
                        }), React.createElement("h3", {
                          className: "hl-3 text-gray-20 mt-6 mb-2"
                        }, "Easy to adopt — without any lock-in"), React.createElement("p", {
                          className: "body-md text-gray-40"
                        }, "ReScript was made with gradual adoption in mind.  If\n            you ever want to go back to plain JavaScript, just remove all\n            source files and keep its clean JavaScript output. Tell\n            your coworkers that your project will keep functioning with or\n            without ReScript!"))));
}

var companies = [
  {
    name: "Facebook Messenger",
    url: "https://messenger.com",
    path: "/static/lp/messenger.svg",
    [Symbol.for("name")]: "Logo"
  },
  {
    name: "Facebook",
    url: "https://messenger.com",
    path: "/static/lp/facebook.svg",
    [Symbol.for("name")]: "Logo"
  },
  {
    name: "Rohea",
    url: "https://rohea.com",
    path: "/static/lp/rohea.svg",
    [Symbol.for("name")]: "Logo"
  },
  {
    name: "CCA",
    url: "https://cca.io",
    path: "/static/lp/cca-io.svg",
    [Symbol.for("name")]: "Logo"
  },
  {
    name: "Nomadic Labs",
    url: "https://nomadic-labs.com",
    path: "/static/lp/nomadic_labs.svg",
    [Symbol.for("name")]: "Logo"
  },
  {
    name: "Draftbit",
    url: "https://draftbit.com",
    path: "/static/lp/draftbit.svg",
    [Symbol.for("name")]: "Logo"
  },
  {
    name: "Pupilfirst",
    url: "https://pupilfirst.com",
    path: "/static/lp/pupilfirst.svg",
    [Symbol.for("name")]: "Logo"
  }
];

function LandingPageLayout$TrustedBy(Props) {
  return React.createElement("section", {
              className: "mt-20"
            }, React.createElement("h3", {
                  className: "hl-1 text-gray-80 text-center max-w-576 mx-auto"
                }, "Trusted by our users"), React.createElement("div", {
                  className: "flex flex-wrap mx-4 space-y-4 justify-center items-center max-w-xl lg:mx-auto mt-16 "
                }, companies.map(function (company) {
                      var renderedCompany = React.createElement("a", {
                            href: company.url,
                            rel: "noopener noreferrer",
                            target: "_blank"
                          }, React.createElement("img", {
                                className: "hover:opacity-75 max-w-sm h-12",
                                src: company.path
                              }));
                      return React.createElement("div", {
                                  key: company.name
                                }, renderedCompany);
                    })), React.createElement("div", {
                  className: "mt-10 max-w-320 overflow-hidden opacity-50",
                  style: {
                    maxHeight: "6rem"
                  }
                }, React.createElement("img", {
                      className: "w-full h-full",
                      src: "/static/lp/grid.svg"
                    })));
}

var cards = [
  {
    imgSrc: "/static/ic_manual@2x.png",
    title: "Language Manual",
    descr: "Look up the basics: Reference for all our language features",
    href: "/docs/manual/latest/introduction"
  },
  {
    imgSrc: "/static/ic_rescript_react@2x.png",
    title: "ReScript + React",
    descr: "First Class bindings for ReactJS used by production users all over the world.",
    href: "/docs/react/latest/introduction"
  },
  {
    imgSrc: "/static/ic_manual@2x.png",
    title: "Gradually Adopt ReScript",
    descr: "Learn how to start using ReScript in your current projects. Try before you buy!",
    href: "/docs/manual/latest/installation#integrate-into-an-existing-js-project"
  },
  {
    imgSrc: "/static/ic_gentype@2x.png",
    title: "TypeScript Integration",
    descr: "Learn how to integrate ReScript in your existing TypeScript codebases.",
    href: "/docs/gentype/latest/introduction"
  }
];

var templates = [{
    imgSrc: "/static/nextjs_starter_logo.svg",
    title: React.createElement(React.Fragment, undefined, React.createElement("div", undefined, "ReScript & "), React.createElement("div", {
              className: "text-gray-40"
            }, "NextJS")),
    descr: "Get started with our NextJS starter template.",
    href: "https://github.com/ryyppy/rescript-nextjs-template"
  }];

function LandingPageLayout$CuratedResources(Props) {
  return React.createElement("section", {
              className: "bg-gray-100 w-full pb-40 pt-20 "
            }, React.createElement("div", {
                  className: "mb-10 max-w-1280 flex flex-col justify-center items-center mx-5 md:mx-8 lg:mx-auto"
                }, React.createElement("div", {
                      className: "body-sm md:body-lg text-gray-40 w-40 mb-4 xs:w-auto text-center"
                    }, "Get up and running with ReScript"), React.createElement("h2", {
                      className: "hl-1 text-gray-20 text-center"
                    }, "Curated resources")), React.createElement("div", {
                  className: "px-5 md:px-8 max-w-1280 mx-auto my-20"
                }, React.createElement("div", {
                      className: "body-lg text-center z-2 relative text-gray-40 max-w-[12rem] mx-auto bg-gray-100"
                    }, "Guides and Docs"), React.createElement("hr", {
                      className: "bg-gray-80 h-px border-0 relative top-[-12px]"
                    })), React.createElement("div", undefined, React.createElement("div", {
                      className: "grid grid-flow-col grid-cols-2 grid-rows-2 lg:grid-cols-4 lg:grid-rows-1 gap-2 md:gap-4 lg:gap-8 max-w-1280 px-5 md:px-8 mx-auto"
                    }, Belt_Array.mapWithIndex(cards, (function (i, card) {
                            return React.createElement(Next.Link.make, {
                                        href: card.href,
                                        children: React.createElement("a", {
                                              className: "hover:bg-gray-80 bg-gray-90 px-4 md:px-8 pb-0 md:pb-8 relative rounded-xl md:min-w-[196px]"
                                            }, React.createElement("img", {
                                                  className: "h-[53px] absolute mt-6",
                                                  src: card.imgSrc
                                                }), React.createElement("h5", {
                                                  className: "text-gray-10 hl-4 mt-32 h-12"
                                                }, card.title), React.createElement("div", {
                                                  className: "text-gray-40 mt-2 mb-8 body-sm"
                                                }, card.descr)),
                                        key: String(i)
                                      });
                          }))), React.createElement("div", {
                      className: "px-5 md:px-8 max-w-1280 mx-auto my-20"
                    }, React.createElement("div", {
                          className: "body-lg text-center z-2 relative text-gray-40 w-[8rem] mx-auto bg-gray-100"
                        }, "Templates"), React.createElement("hr", {
                          className: "bg-gray-80 h-px border-0 relative top-[-12px]"
                        })), React.createElement("div", {
                      className: "grid grid-flow-col grid-cols-2 lg:grid-cols-3 lg:grid-rows-1 gap-2 md:gap-4 lg:gap-8 max-w-1280 px-5 md:px-8 mx-auto"
                    }, Belt_Array.mapWithIndex(templates, (function (i, card) {
                            return React.createElement("a", {
                                        key: String(i),
                                        className: "hover:bg-gray-80 bg-gray-90 px-5 pb-8 relative rounded-xl min-w-[200px]",
                                        href: card.href,
                                        target: "_blank"
                                      }, React.createElement("img", {
                                            className: "h-12 absolute mt-5",
                                            src: card.imgSrc
                                          }), React.createElement("h5", {
                                            className: "text-gray-10 hl-4 mt-32 h-12"
                                          }, card.title), React.createElement("div", {
                                            className: "text-gray-40 mt-4 body-sm"
                                          }, card.descr));
                          })))));
}

function LandingPageLayout(Props) {
  var componentsOpt = Props.components;
  var children = Props.children;
  var components = componentsOpt !== undefined ? Caml_option.valFromOption(componentsOpt) : Markdown.$$default;
  var overlayState = React.useState(function () {
        return false;
      });
  return React.createElement(React.Fragment, undefined, React.createElement(Meta.make, {
                  keywords: [
                    "ReScript",
                    "rescriptlang",
                    "JavaScript",
                    "JS",
                    "TypeScript"
                  ],
                  description: "Fast, Simple, Fully Typed JavaScript from the Future",
                  title: "The ReScript Programming Language",
                  ogImage: "/static/Art-3-rescript-launch.jpg"
                }), React.createElement("div", {
                  className: "mt-4 xs:mt-16"
                }, React.createElement("div", {
                      className: "text-gray-80 text-18"
                    }, React.createElement(Navigation.make, {
                          overlayState: overlayState
                        }), React.createElement("div", {
                          className: "absolute top-16 w-full"
                        }, React.createElement("div", {
                              className: "relative overflow-hidden pb-32"
                            }, React.createElement("main", {
                                  className: "mt-10 min-w-320 lg:align-center w-full"
                                }, React.createElement(Mdx.Provider.make, {
                                      components: components,
                                      children: React.createElement("div", {
                                            className: ""
                                          }, React.createElement("div", {
                                                className: "w-full"
                                              }, React.createElement("div", {
                                                    className: "mt-16 md:mt-32 lg:mt-40 mb-12"
                                                  }, React.createElement(LandingPageLayout$Intro, {})), React.createElement(LandingPageLayout$PlaygroundHero, {}), React.createElement(LandingPageLayout$QuickInstall, {}), React.createElement(LandingPageLayout$MainUSP, {}), React.createElement(LandingPageLayout$OtherSellingPoints, {}), React.createElement(LandingPageLayout$TrustedBy, {}), React.createElement(LandingPageLayout$CuratedResources, {}), children))
                                    }))), React.createElement(Footer.make, {})))));
}

var make = LandingPageLayout;

export {
  make ,
  
}
/* item1 Not a pure module */
