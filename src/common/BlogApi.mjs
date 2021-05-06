// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Fs from "fs";
import * as Path from "path";
import * as DateStr from "./DateStr.mjs";
import * as Process from "process";
import * as BlogData from "../BlogData.mjs";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import GrayMatter from "gray-matter";
import * as BlogFrontmatter from "./BlogFrontmatter.mjs";

function getFullSlug(slug) {
  var match = BlogData.data.find(function (param) {
        return slug === param.slug;
      });
  if (match !== undefined) {
    return match.fullslug;
  }
  
}

function getAllPosts(param) {
  var postsDirectory = Path.join(Process.cwd(), "./_blogposts");
  return Belt_Array.keepMap(BlogData.data, (function (param) {
                var fullslug = param.fullslug;
                var fullPath = Path.join(postsDirectory, fullslug + ".mdx");
                if (!Fs.existsSync(fullPath)) {
                  return ;
                }
                var fileContents = Fs.readFileSync(fullPath, "utf8");
                var match = GrayMatter(fileContents);
                var archived = fullPath.includes("/archive/");
                return {
                        slug: param.slug,
                        content: match.content,
                        fullslug: fullslug,
                        archived: archived,
                        frontmatter: match.data
                      };
              }));
}

function dateToUTCString(date) {
  date.setHours(15.0);
  return date.toUTCString();
}

function getLatest(maxOpt, baseUrlOpt, param) {
  var max = maxOpt !== undefined ? maxOpt : 10;
  var baseUrl = baseUrlOpt !== undefined ? baseUrlOpt : "https://rescript-lang.org";
  return Belt_Array.reduce(getAllPosts(undefined), [], (function (acc, next) {
                    var fm = BlogFrontmatter.decode(next.frontmatter);
                    if (fm.TAG !== /* Ok */0) {
                      return acc;
                    }
                    var fm$1 = fm._0;
                    var description = Belt_Option.getWithDefault(Caml_option.null_to_opt(fm$1.description), "");
                    var item_title = fm$1.title;
                    var item_href = baseUrl + ("/blog/" + next.slug);
                    var item_pubDate = DateStr.toDate(fm$1.date);
                    var item = {
                      title: item_title,
                      href: item_href,
                      description: description,
                      pubDate: item_pubDate
                    };
                    return Belt_Array.concat(acc, [item]);
                  })).sort(function (item1, item2) {
                var v1 = item1.pubDate.valueOf();
                var v2 = item2.pubDate.valueOf();
                if (v1 === v2) {
                  return 0;
                } else if (v1 > v2) {
                  return -1;
                } else {
                  return 1;
                }
              }).slice(0, max);
}

function toXmlString(siteTitleOpt, siteDescriptionOpt, items) {
  var siteTitle = siteTitleOpt !== undefined ? siteTitleOpt : "ReScript Blog";
  var siteDescription = siteDescriptionOpt !== undefined ? siteDescriptionOpt : "";
  var latestPubDateElement = Belt_Option.getWithDefault(Belt_Option.map(Belt_Array.get(items, 0), (function (item) {
              var latestPubDateStr = dateToUTCString(item.pubDate);
              return "<lastBuildDate>" + latestPubDateStr + "</lastBuildDate>";
            })), "");
  var itemsStr = Belt_Array.reduce(items, "", (function (acc, item) {
          var description = item.description;
          var href = item.href;
          var descriptionElement = description === "" ? "" : "<description>\n        <![CDATA[" + description + "]]>\n        </description>\n          ";
          var dateStr = dateToUTCString(item.pubDate);
          return acc + ("\n      <item>\n        <title> <![CDATA[" + item.title + "]]></title>\n        <link> " + href + " </link>\n        <guid> " + href + " </guid>\n        " + descriptionElement + "\n\n        <pubDate>" + dateStr + "</pubDate>\n\n    </item>");
        }));
  return "<?xml version=\"1.0\" encoding=\"utf-8\" ?>\n  <rss version=\"2.0\">\n    <channel>\n        <title>" + siteTitle + "</title>\n        <link>https://rescript-lang.org</link>\n        <description>" + siteDescription + "</description>\n        <language>en</language>\n        " + latestPubDateElement + "\n        " + itemsStr + "\n\n    </channel>\n  </rss>";
}

var RssFeed = {
  getLatest: getLatest,
  toXmlString: toXmlString
};

export {
  getAllPosts ,
  getFullSlug ,
  RssFeed ,
  
}
/* fs Not a pure module */
