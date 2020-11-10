

import * as React from "react";
import * as Markdown from "../components/Markdown.js";
import * as ApiLayout from "./ApiLayout.js";
import * as ApiMarkdown from "../components/ApiMarkdown.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";

var categories = [
  {
    name: "Introduction",
    items: [{
        name: "Overview",
        href: "/docs/manual/latest/api"
      }]
  },
  {
    name: "Modules",
    items: [
      {
        name: "Js Module",
        href: "/docs/manual/latest/api/js"
      },
      {
        name: "Belt Stdlib",
        href: "/docs/manual/latest/api/belt"
      },
      {
        name: "Dom Module",
        href: "/docs/manual/latest/api/dom"
      }
    ]
  }
];

function ApiOverviewLayout$Docs(Props) {
  var componentsOpt = Props.components;
  var children = Props.children;
  var components = componentsOpt !== undefined ? Caml_option.valFromOption(componentsOpt) : ApiMarkdown.$$default;
  return React.createElement(ApiLayout.make, {
              categories: categories,
              title: "API",
              version: "latest",
              components: components,
              children: children
            });
}

var Docs = {
  make: ApiOverviewLayout$Docs
};

function ApiOverviewLayout$Prose(Props) {
  var children = Props.children;
  return React.createElement(ApiOverviewLayout$Docs, {
              components: Markdown.$$default,
              children: children
            });
}

var Prose = {
  make: ApiOverviewLayout$Prose
};

var Link;

var Sidebar;

export {
  Link ,
  Sidebar ,
  categories ,
  Docs ,
  Prose ,
  
}
/* react Not a pure module */