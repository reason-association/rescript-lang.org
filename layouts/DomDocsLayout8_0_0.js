

import * as Url from "../common/Url.js";
import * as React from "react";
import * as Js_dict from "bs-platform/lib/es6/js_dict.js";
import * as ApiLayout from "./ApiLayout.js";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as ApiMarkdown from "../components/ApiMarkdown.js";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as Router from "next/router";

var indexData = (require('../index_data/v800_dom_api_index.json'));

var overviewNavs = [{
    name: "Dom",
    href: "/docs/manual/v8.0.0/api/dom"
  }];

var moduleNavs = [
  {
    name: "Storage",
    href: "/docs/manual/v8.0.0/api/dom/storage"
  },
  {
    name: "Storage2",
    href: "/docs/manual/v8.0.0/api/dom/storage2"
  }
];

var categories = [
  {
    name: "Overview",
    items: overviewNavs
  },
  {
    name: "Submodules",
    items: moduleNavs
  }
];

function DomDocsLayout8_0_0$Docs(Props) {
  var componentsOpt = Props.components;
  var children = Props.children;
  var components = componentsOpt !== undefined ? Caml_option.valFromOption(componentsOpt) : ApiMarkdown.$$default;
  var router = Router.useRouter();
  var route = router.route;
  var headers = Belt_Option.getWithDefault(Belt_Option.map(Js_dict.get(indexData, route), (function (data) {
              return Belt_Array.map(data.headers, (function (header) {
                            return [
                                    header.name,
                                    "#" + header.href
                                  ];
                          }));
            })), []);
  var moduleName = Belt_Option.getWithDefault(Belt_Option.map(Js_dict.get(indexData, route), (function (data) {
              return data.moduleName;
            })), "?");
  var url = Url.parse(route);
  var version = url.version;
  var version$1 = typeof version === "number" ? "latest" : version._0;
  var prefix_href = "/docs/manual/" + (version$1 + "/api");
  var prefix = {
    name: "API",
    href: prefix_href
  };
  var breadcrumbs = ApiLayout.makeBreadcrumbs(prefix, route);
  var activeToc_entries = Belt_Array.map(headers, (function (param) {
          return {
                  header: param[0],
                  href: param[1]
                };
        }));
  var activeToc = {
    title: moduleName,
    entries: activeToc_entries
  };
  var version$2 = "v8.0.0";
  var warnBanner = React.createElement(ApiLayout.OldDocsWarning.make, {
        version: version$2,
        route: route
      });
  return React.createElement(ApiLayout.make, {
              breadcrumbs: breadcrumbs,
              categories: categories,
              title: "Dom Module",
              version: version$2,
              activeToc: activeToc,
              components: components,
              children: null
            }, warnBanner, children);
}

var Docs = {
  make: DomDocsLayout8_0_0$Docs
};

function DomDocsLayout8_0_0$Prose(Props) {
  var children = Props.children;
  return React.createElement(DomDocsLayout8_0_0$Docs, {
              components: ApiMarkdown.$$default,
              children: children
            });
}

var Prose = {
  make: DomDocsLayout8_0_0$Prose
};

var Link;

var Category;

var NavItem;

export {
  Link ,
  indexData ,
  Category ,
  NavItem ,
  overviewNavs ,
  moduleNavs ,
  categories ,
  Docs ,
  Prose ,
  
}
/* indexData Not a pure module */