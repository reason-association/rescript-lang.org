

import * as Util from "../common/Util.js";
import * as React from "react";
import Head from "next/head";

function Meta(Props) {
  var siteNameOpt = Props.siteName;
  var keywordsOpt = Props.keywords;
  var descriptionOpt = Props.description;
  var canonical = Props.canonical;
  var title = Props.title;
  var ogLocaleOpt = Props.ogLocale;
  var ogSiteName = Props.ogSiteName;
  var ogDescriptionOpt = Props.ogDescription;
  var ogTitle = Props.ogTitle;
  var ogImage = Props.ogImage;
  var siteName = siteNameOpt !== undefined ? siteNameOpt : "ReScript Documentation";
  var keywords = keywordsOpt !== undefined ? keywordsOpt : [];
  var description = descriptionOpt !== undefined ? descriptionOpt : "The ReScript language and ecosystem docs";
  var ogLocale = ogLocaleOpt !== undefined ? ogLocaleOpt : "en_US";
  var ogDescription = ogDescriptionOpt !== undefined ? ogDescriptionOpt : description;
  var title$1 = title !== undefined && title !== "" ? title : siteName;
  var ogSiteName$1 = ogSiteName !== undefined ? ogSiteName : siteName;
  var ogTitle$1 = ogTitle !== undefined ? ogTitle : title$1;
  return React.createElement(Head, {
              children: null
            }, React.createElement("title", {
                  key: "title"
                }, Util.ReactStuff.s(title$1)), React.createElement("meta", {
                  charSet: "utf-8"
                }), React.createElement("meta", {
                  content: "width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, minimal-ui",
                  name: "viewport"
                }), React.createElement("meta", {
                  key: "description",
                  content: description,
                  name: "description"
                }), React.createElement("meta", {
                  key: "keywords",
                  content: keywords.join(","),
                  name: "keywords"
                }), canonical !== undefined ? React.createElement("link", {
                    key: "canonical",
                    href: canonical,
                    rel: "canonical"
                  }) : null, React.createElement("link", {
                  href: "/static/favicon/apple-touch-icon.png",
                  rel: "apple-touch-icon",
                  sizes: "180x180"
                }), React.createElement("link", {
                  href: "/static/favicon/favicon-32x32.png",
                  rel: "icon",
                  sizes: "32x32",
                  type: "image/png"
                }), React.createElement("link", {
                  href: "/static/favicon/favicon-16x16.png",
                  rel: "icon",
                  sizes: "16x16",
                  type: "image/png"
                }), React.createElement("link", {
                  href: "/static/favicon/site.webmanifest",
                  rel: "manifest"
                }), React.createElement("meta", {
                  key: "og:site_name",
                  content: ogSiteName$1,
                  property: "og:site_name"
                }), React.createElement("meta", {
                  key: "og:locale",
                  content: ogLocale,
                  property: "og:locale"
                }), React.createElement("meta", {
                  key: "og:title",
                  content: ogTitle$1,
                  property: "og:title"
                }), React.createElement("meta", {
                  key: "og:description",
                  content: ogDescription,
                  property: "og:description"
                }), ogImage !== undefined ? React.createElement("meta", {
                    key: "og:image",
                    content: ogImage,
                    property: "og:image"
                  }) : null, React.createElement("meta", {
                  key: "twitter:title",
                  content: title$1,
                  name: "twitter:title"
                }), React.createElement("meta", {
                  key: "twitter:description",
                  content: description,
                  name: "twitter:description"
                }), React.createElement("meta", {
                  key: "twitter:site",
                  content: "@reasonml",
                  name: "twitter:site"
                }), React.createElement("meta", {
                  key: "twitter:creator",
                  content: "@ReasonAssoc",
                  name: "twitter:creator"
                }), React.createElement("meta", {
                  content: "image/jpeg",
                  property: "og:image:type"
                }), React.createElement("meta", {
                  key: "twitter:card",
                  content: "summary_large_image",
                  name: "twitter:card"
                }), React.createElement("link", {
                  title: "ReScript Blog",
                  href: "/blog/feed.xml",
                  rel: "alternate",
                  type: "application/rss+xml"
                }));
}

var Head$1;

var make = Meta;

export {
  Head$1 as Head,
  make ,
  
}
/* react Not a pure module */