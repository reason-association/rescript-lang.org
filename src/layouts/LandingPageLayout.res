/* module Link = Next.Link */

// Copy Brainstorming Gist:
// https://gist.github.com/chenglou/3624a93d63dbd32c4a3d087f9c9e06bc

module Intro = {
  @react.component
  let make = () => {
    <section className="flex justify-center">
      <div className="max-w-1060 flex flex-col items-center px-5 sm:px-8 lg:box-content">
        <h1 className="hl-title text-center max-w-[53rem]">
          {React.string("A simple and fast language for JavaScript")}
        </h1>
        <h2 className="body-lg text-center text-gray-60 my-4 max-w-[40rem]">
          {React.string(
            "ReScript looks like JS, acts like JS, and compiles to the highest quality of clean, readable and performant JS, directly runnable in browsers and Node.",
          )}
        </h2>
        <padding className="mt-4 mb-2"> <Button> {React.string("Get started")} </Button> </padding>
      </div>
    </section>
  }
}

module PlaygroundHero = {
  type example = {
    res: string,
    js: string,
  }

  let examples = [
    {
      res: `module Button = {
  @react.component
  let make = (~count: int) => {
    let times = switch count {
    | 1 => "once"
    | 2 => "twice"
    | n => Belt.Int.toString(n) ++ " times"
    }
    let msg = "Click me " ++ times

    <button> {msg->React.string} </button>
  }
}`,
      js: `var React = require("react");

function Playground$Button(Props) {
  var count = Props.count;
  var times = count !== 1 ? (
      count !== 2 ? String(count) + " times" : "twice"
    ) : "once";
  var msg = "Click me " + times;
  return React.createElement("button", undefined, msg);
}

var Button = {
  make: Playground$Button
};

exports.Button = Button;`,
    },
  ]

  @react.component
  let make = () => {
    let (example, _setExample) = React.useState(_ => examples->Js.Array2.unsafe_get(0))

    //Playground Section & Background
    <section className="relative mt-20 bg-gray-10">
      <div className="relative flex justify-center w-full">
        <div className="relative w-full pt-6 pb-8 sm:px-8 md:px-16 max-w-[1400px]">
          // Playground widget
          <div
            className="relative z-2 flex flex-col md:flex-row bg-gray-90 mx-auto sm:rounded-lg max-w-[1280px]">
            //Left Side (ReScript)
            <div className="md:w-1/2">
              <div
                className="body-sm text-gray-40 text-center py-3 sm:rounded-t-lg md:rounded-tl-lg bg-gray-100">
                {React.string("Written in ReScript")}
              </div>
              <pre className="text-14 px-8 pt-6 pb-12 whitespace-pre-wrap">
                {HighlightJs.renderHLJS(~darkmode=true, ~code=example.res, ~lang="res", ())}
              </pre>
            </div>
            //Right Side (JavaScript)
            <div className="md:w-1/2 ">
              <div
                className="body-sm text-gray-40 py-3 text-center md:border-l border-gray-80 bg-gray-100 sm:rounded-tr-lg">
                {React.string("Compiles to JavaScript")}
              </div>
              <pre
                className="text-14 px-8 pt-6 pb-14 md:border-l border-gray-80 whitespace-pre-wrap">
                {HighlightJs.renderHLJS(~darkmode=true, ~code=example.js, ~lang="js", ())}
              </pre>
            </div>
          </div>
          /* ---Link to Playground--- */
          <div>
            <Next.Link href={`/try?code=${LzString.compressToEncodedURIComponent(example.res)}}`}>
              <a
                className="captions md:px-0 border-b border-gray-40 hover:border-gray-60 text-gray-60"
                target="_blank">
                {React.string("Edit this example in Playground")}
              </a>
            </Next.Link>
          </div>
          //
          <div className="hidden md:block">
            <img
              className="absolute z-0 left-0 top-0 -ml-10 -mt-6"
              src="/static/lp/grid.svg"
              style={ReactDOM.Style.make(~height="24rem", ~width="24rem", ())}
            />
            <img
              className="absolute z-0 left-0 top-0 -ml-10 mt-10" src="/static/lp/illu_left.png"
            />
          </div>
          <div className="hidden md:block">
            <img
              className="absolute z-0 right-0 bottom-0 -mb-10 mt-24 -mr-10"
              src="/static/lp/grid.svg"
              style={ReactDOM.Style.make(~height="24rem", ~width="24rem", ())}
            />
            <img
              className="absolute z-3 right-0 bottom-0 -mr-2 mb-10" src="/static/lp/illu_right.png"
            />
          </div>
        </div>
      </div>
    </section>
  }
}

module QuickInstall = {
  module CopyButton = {
    let copyToClipboard: string => bool = %raw(j`
  function(str) {
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
    }
    `)

    type state =
      | Init
      | Copied
      | Failed

    @react.component
    let make = (~code) => {
      let (state, setState) = React.useState(_ => Init)

      let buttonRef = React.useRef(Js.Nullable.null)

      let onClick = evt => {
        ReactEvent.Mouse.preventDefault(evt)
        if copyToClipboard(code) {
          setState(_ => Copied)
        } else {
          setState(_ => Failed)
        }
      }

      React.useEffect1(() => {
        switch state {
        | Copied =>
          open Webapi
          let buttonEl = Js.Nullable.toOption(buttonRef.current)->Belt.Option.getExn

          // Note on this imperative DOM nonsense:
          // For Tailwind transitions to behave correctly, we need to first paint the DOM element in the tree,
          // and in the next tick, add the opacity-100 class, so the transition animation actually takes place.
          // If we don't do that, the banner will essentially pop up without any animation
          let bannerEl = Document.createElement("div")
          bannerEl->Element.setClassName("foobar opacity-0 absolute top-0 mt-4 -mr-1 px-2 rounded right-0 
            bg-turtle text-gray-80-tr body-sm
            transition-all duration-500 ease-in-out ")
          let textNode = Document.createTextNode("Copied!")

          bannerEl->Element.appendChild(textNode)
          buttonEl->Element.appendChild(bannerEl)

          let nextFrameId = requestAnimationFrame(() => {
            bannerEl->Element.classList->ClassList.toggle("opacity-0")
            bannerEl->Element.classList->ClassList.toggle("opacity-100")
          })

          let timeoutId = Js.Global.setTimeout(() => {
            buttonEl->Element.removeChild(bannerEl)
            setState(_ => Init)
          }, 2000)

          Some(
            () => {
              cancelAnimationFrame(nextFrameId)
              Js.Global.clearTimeout(timeoutId)
            },
          )
        | _ => None
        }
      }, [state])

      <button
        ref={ReactDOM.Ref.domRef(buttonRef)}
        disabled={state === Copied}
        className="relative h-10 w-10 flex justify-center	items-center "
        onClick>
        <Icon.Copy className="w-6 h-6 mt-px text-gray-40 hover:cursor-pointer hover:text-gray-80" />
      </button>
    }
  }

  module Instructions = {
    let copyBox = text => {
      <div
        className="flex justify-between items-center pl-6 pr-3 py-3 w-full bg-gray-10 border border-gray-20 rounded max-w-[25rem]">
        <span className="font-mono text-14  text-gray-70"> {React.string(text)} </span>
        <CopyButton code=text />
      </div>
    }
    @react.component
    let make = () => {
      <div className="w-full max-w-[400px]">
        <h2 className="hl-3 lg:mt-12"> {React.string("Quick Install")} </h2>
        <div className="captions x text-gray-40 mb-2 mt-1">
          {React.string(
            "You can quickly add ReScript to your existing JavaScript codebase via npm / yarn:",
          )}
        </div>
        <div className="w-full space-y-2">
          {copyBox("npm install rescript --save-dev")} {copyBox("npx rescript init .")}
        </div>
      </div>
    }
  }

  @react.component
  let make = () => {
    <section className="my-32 sm:px-4 sm:flex sm:justify-center">
      <div className="max-w-1060 flex flex-col w-full px-5 md:px-8 lg:px-8 lg:box-content ">
        //---Textblock on the left side---
        <div className="relative max-w-[28rem]">
          <p
            className="relative z-1 space-y-12 text-gray-80 font-semibold text-24 md:text-32 leading-2">
            <span className="bg-fire-5 rounded-lg border border-fire-10 p-1 ">
              {React.string(`Everything you want`)}
            </span>
            {React.string(` from JavaScript, minus the parts you don't need.`)}
          </p>
        </div>
        //spacing between columns
        <div className="w-full mt-12 md:flex flex-col lg:flex-row md:justify-between ">
          <p
            className="relative z-1 text-gray-80 font-semibold text-24 md:text-32 leading-2 max-w-[32rem]">
            {React.string(`ReScript is easy to pick up for JavaScript developers,
          and helps shipping products with confidence.`)}
          </p>
          <div
            className="mt-16 lg:mt-0 self-end" style={ReactDOM.Style.make(~maxWidth="25rem", ())}>
            <Instructions />
          </div>
        </div>
      </div>
    </section>
  }
}

// Main unique selling points
module MainUSP = {
  module Item = {
    type polygonDirection = Up | Down

    @react.component
    let make = (
      ~caption: string,
      ~title: React.element,
      ~polygonDirection: polygonDirection=Down,
      ~paragraph: React.element,
    ) => {
      let polyPointsLg = switch polygonDirection {
      | Down => "80,0 85,100 100,100 100,0"
      | Up => "85,0 80,100 100,100 100,0"
      }

      let polyPointsMobile = switch polygonDirection {
      | Down => "0,100 100,100 100,70 0,80"
      | Up => "0,100 100,100 100,78 0,72"
      }

      let polyColor = switch polygonDirection {
      | Up => "text-fire"
      | Down => "text-fire-30"
      }

      <div
        className="relative flex justify-center w-full bg-gray-90 px-5 sm:px-8 lg:px-14 overflow-hidden">
        // Content
        <div
          className="relative max-w-1060 z-3 flex flex-wrap justify-center lg:justify-between pb-16 pt-20 md:pb-20 md:pt-32 lg:pb-40 md:space-x-4 w-full">
          <div className="max-w-[24rem] flex flex-col justify-center mb-6 lg:mb-2">
            <div className="hl-overline text-gray-20 mb-4"> {React.string(caption)} </div>
            <h3 className="text-gray-10 mb-4 hl-2 font-semibold"> title </h3>
            <div className="flex">
              <div className="text-gray-30 body-md pr-8"> paragraph </div>
            </div>
          </div>
          //image (right)
          <div className="relative w-full max-w-[32rem]">
            <div
              className="relative w-full bg-gray-90 rounded-lg flex md:mt-0 items-center justify-center"
              style={ReactDOM.Style.make(
                ~maxWidth="35rem",
                ~borderRadius="8px",
                ~minHeight="20rem",
                ~boxShadow="0px 4px 55px 0px rgba(230,72,79,0.10)",
                (),
              )}>
              {React.string("video of a fast build")}
            </div>
            <img
              className="absolute z-1 bottom-0 right-0 -mb-12 -mr-12"
              style={ReactDOM.Style.make(~maxWidth="20rem", ())}
              src="/static/lp/grid2.svg"
            />
          </div>
        </div>
        // Mobile SVG
        <svg
          className={`md:hidden absolute z-1 w-full h-full bottom-0 left-0 ${polyColor}`}
          viewBox="0 0 100 100"
          preserveAspectRatio="none">
          <polygon className="fill-current" points=polyPointsMobile />
        </svg>
        // Tabled / Desktop SVG
        <svg
          className={`hidden md:block absolute z-1 w-full h-full right-0 top-0 ${polyColor}`}
          viewBox="0 0 100 100"
          preserveAspectRatio="none">
          <polygon className="fill-current" points=polyPointsLg />
        </svg>
      </div>
    }
  }

  let item1 =
    <Item
      caption="Fast and simple"
      title={React.string("The fastest build system on the web")}
      paragraph={React.string(`ReScript cares about a consistent and fast feedback loop for any
            codebase size. No need for memory hungry build processes, and no
            corrupted caches. Switch branches as you please without worrying
            about stale caches or wrong type information.`)}
    />

  let item2 =
    <Item
      caption="A robust type system"
      title={<span
        className="text-transparent bg-clip-text bg-gradient-to-r from-berry-dark-50 to-fire-50">
        {React.string("Type Better")}
      </span>}
      polygonDirection=Up
      paragraph={React.string(` Every ReScript app is fully typed and provides
      correct type information to any given value. We prioritize simpler types
      / discourage complex types for the sake of clarity and easy debugability.
      No \`any\`, no magic types, no surprise \`undefined\`.
      `)}
    />

  let item3 =
    <Item
      caption="Seamless JS Integration"
      title={<>
        <span className="text-orange-dark"> {React.string("The familiar JS ecosystem")} </span>
        {React.string(" at your fingertips")}
      </>}
      paragraph={React.string(`Use any library from JavaScript, export ReScript
      libraries to JavaScript, automatically generate TypeScript types, etc. It's
      like you've never left the good parts of JavaScript at all.`)}
    />

  @react.component
  let make = () => {
    <section
      className="w-full bg-gray-90 overflow-hidden"
      style={ReactDOM.Style.make(~minHeight="37rem", ())}>
      item1 item2 item3
    </section>
  }
}

module OtherSellingPoints = {
  @react.component
  let make = () => {
    <section className="flex justify-center w-full bg-gray-90 border-t border-gray-80 ">
      //section 
      <div
        className="max-w-1060 grid grid-cols-10 grid-rows-2 md:grid-rows-1 gap-8
      lg:space-x-8 px-4 sm:px-8 lg:px-16 pt-24 pb-20"> //defining the grid //ignore: flex flex-col lg:flex-row
         
          //Large Item
        <div className="pb-24 md:pb-32 col-span-6">
          // TODO: Gallery swiper component for community images
          <div
            className="bg-gray-10 w-full rounded-lg"
            style={ReactDOM.Style.make(~minHeight="16.8rem", ())}
          />
          <h3 className="hl-3 text-gray-20 mt-6 mb-2">
            {React.string(`A community of programmers who value getting things done`)}
          </h3>
          <p className="body-md text-gray-40">
            {React.string(`No language can be popular without a solid community. A
        great type system isn't useful if library authors abuse it. Performance
        doesn't show if all the libraries are slow. Join the ReScript community
        of programmers who all care about simplicity, speed and practicality.
        `)}
          </p>
        </div>
        // 2 small items
        // Item 2
        <div className="col-span-4 flex lg:flex-col lg:space-y-4">
          <div>
            <div
              className="bg-turtle-dark w-full rounded-lg"
              style={ReactDOM.Style.make(~minHeight="5.625rem", ())}
            />
            <h3 className="hl-3 text-gray-20 mt-6 mb-2">
              {React.string(`Tooling that lets our language shine`)}
            </h3>
            <p className="body-md text-gray-40">
              {React.string(`Some languages have great features, some other
              languages have great tooling. ReScript brings everything you need
              to get up and running quickly without tricky configuration.`)}
            </p>
          </div>
          // Item 3
          <div>
            <div
              className="bg-gray-10 w-full rounded-lg"
              style={ReactDOM.Style.make(~minHeight="5.625rem", ())}
            />
            <h3 className="hl-3 text-gray-20 mt-6 mb-2">
              {React.string(`The only language you can easily un-adopt`)}
            </h3>
            <p className="body-md text-gray-40">
              {React.string(`ReScript allows you to remove the source files and
            keep its clean JavaScript output. Tell your coworkers that your
            project will keep functioning with or without ReScript!`)}
            </p>
          </div>
        </div>
      </div>
    </section>
  }
}

/* module SubtleButton = { */
/* @react.component */
/* let make = (~children) => */
/* <button */
/* className="transition-colors duration-200 inline-block text-16 text-fire rounded border-2 border-fire-10 hover:bg-fire-10 px-5 py-2"> */
/* children */
/* </button> */
/* } */

module TrustedBy = {
  // TODO: is this data structure too fancy?
  type company =
    | Logo({name: string, path: string, /* TODO: get rid of style */ style: ReactDOM.Style.t})
    | Name(string)

  let companies = [
    Logo({
      name: "Facebook Messenger",
      path: "/static/messenger-logo-64@2x.png",
      style: ReactDOM.Style.make(~height="64px", ()),
    }),
    Name("Facebook"),
    Name("Rohea"),
    Name("Beop"),
    Name("Travel World"),
    Logo({
      name: "Pupilfirst",
      path: "/static/pupilfirst-logo.png",
      style: ReactDOM.Style.make(~height="42px", ()),
    }),
    Name("NomadicLabs"),
  ]

  @react.component
  let make = () => {
    <section className="mt-20">
      <h3
        className="text-48 text-gray-42 tracking-tight leading-2 font-semibold text-center max-w-576 mx-auto">
        {React.string("Trusted by developers around the world")}
      </h3>
      <div className="flex justify-between items-center max-w-xl mx-auto mt-16">
        {companies
        ->Js.Array2.map(company => {
          let (companyKey, renderedCompany) = switch company {
          | Name(name) => (name, React.string(name))
          | Logo({name, path, style}) => (name, <img className="max-w-sm" style src=path />)
          }
          <div key=companyKey> renderedCompany </div>
        })
        ->React.array}
      </div>
      <div className="text-center mt-16 text-14"> {React.string(`and many more…`)} </div>
      <div
        className="mt-10 max-w-320 overflow-hidden opacity-50"
        style={ReactDOM.Style.make(~maxHeight="6rem", ())}>
        <img className="w-full h-full" src="/static/lp/grid.svg" />
      </div>
    </section>
  }
}

module CuratedResources = {
  // TODO: is this overkill, should we just inline this as jsx?
  type card = {
    imgSrc: string,
    title: React.element,
    descr: string,
    href: string,
  }

  let cards = [
    {
      imgSrc: "/static/ic_manual@2x.png",
      title: React.string("Language Manual"),
      descr: "Look up the basics: reference for all language features",
      href: "/docs/manual/latest/introduction",
    },
    {
      imgSrc: "/static/ic_rescript_react@2x.png",
      title: React.string("ReScript + React"),
      descr: "First Class bindings for ReactJS. Developed for small and big ass scale projects.",
      href: "/docs/react/latest/introduction",
    },
    {
      imgSrc: "/static/ic_manual@2x.png",
      title: React.string("Add ReScript to an existing project"),
      descr: "This guide will help you to transfer your project without hassle.",
      href: "/docs/manual/latest/installation#integrate-into-an-existing-js-project",
    },
    {
      imgSrc: "/static/ic_gentype@2x.png",
      title: React.string("TypeScript Integration"),
      descr: "Integrate TypeScript and Flow seamlessly and with ease.",
      href: "/docs/gentype/latest/introduction",
    },
  ]

  let templates = [
    {
      imgSrc: "/static/nextjs_starter_logo.svg",
      title: <>
        <div> {React.string("ReScript & ")} </div>
        <div className="text-gray-40"> {React.string("NextJS")} </div>
      </>,
      descr: "Get started with our our NextJS starter template.",
      href: "https://github.com/ryyppy/rescript-nextjs-template",
    },
    {
      imgSrc: "/static/vitejs_starter_logo.svg",
      title: <>
        <div> {React.string("ReScript & ")} </div>
        <div style={ReactDOM.Style.make(~color="#6571FB", ())}> {React.string("ViteJS")} </div>
      </>,
      descr: "Get started with ViteJS and ReScript.",
      href: "/",
    },
    {
      imgSrc: "/static/nodejs_starter_logo.svg",
      title: <>
        <div> {React.string("ReScript & ")} </div>
        <div className="text-gray-40" style={ReactDOM.Style.make(~color="#699D65", ())}>
          {React.string("NodeJS")}
        </div>
      </>,
      descr: "Get started with ReScript targeting the Node platform.",
      href: "/",
    },
  ]

  @react.component
  let make = () => {
    <section className="bg-gray-100 w-full pb-40 pt-20">
      <div className="mb-20 flex flex-col justify-center items-center">
        <div className="body-sm md:body-lg text-gray-40 w-40 mb-4 xs:w-auto">
          {React.string("To start or advance your ReScript projects")}
        </div>
        <h2 className="hl-2 md:hl-1 text-gray-20 max-w-md mx-auto text-center">
          {React.string("Carefully curated resources")}
        </h2>
      </div>
      <div>
        <div className="uppercase text-14 text-center mb-20">
          {React.string("guides and docs")}
        </div>
        <div className="flex justify-between max-w-1280 mx-auto">
          {cards
          ->Belt.Array.mapWithIndex((i, card) =>
            <Next.Link key={Belt.Int.toString(i)} href={card.href}>
              <a
                className="bg-gray-90 px-5 pb-8 relative rounded-xl"
                style={ReactDOM.Style.make(~maxWidth="296px", ())}>
                <img className="h-12 absolute mt-5" src=card.imgSrc />
                <h5 className="text-gray-10 font-semibold mt-32 h-12"> {card.title} </h5>
                <div className="text-gray-40 mt-8 text-14"> {React.string(card.descr)} </div>
              </a>
            </Next.Link>
          )
          ->React.array}
        </div>
        <div className="uppercase text-14 text-center mb-20 mt-20">
          {React.string("templates")}
        </div>
        <div className="flex justify-between max-w-1280 mx-auto">
          {templates
          ->Belt.Array.mapWithIndex((i, card) =>
            <a
              key={Belt.Int.toString(i)}
              href={card.href}
              target="_blank"
              className="bg-gray-90 px-5 pb-8 relative rounded-xl"
              style={ReactDOM.Style.make(~maxWidth="406px", ())}>
              <img className="h-12 absolute mt-5" src=card.imgSrc />
              <h5 className="text-gray-10 font-semibold mt-32 h-12"> {card.title} </h5>
              <div className="text-gray-40 mt-8 text-14"> {React.string(card.descr)} </div>
            </a>
          )
          ->React.array}
        </div>
      </div>
    </section>
  }
}

module Sponsors = {
  @react.component
  let make = () =>
    <div className="mt-24">
      <h2 className="hl-1 text-center"> {React.string("Sponsors")} </h2>
      <Button> {React.string("test")} </Button>
      <Button kind=PrimaryBlue size=Small> {React.string("test2")} </Button>
    </div>
}

@react.component
let make = (~components=Markdown.default, ~children) => {
  let overlayState = React.useState(() => false)

  <>
    <Meta />
    <div className="mt-4 xs:mt-16">
      <div className="text-gray-80 text-18">
        <Navigation overlayState />
        <div className="absolute top-16 w-full">
          <div className="relative overflow-hidden pb-32">
            <main className="mt-10 min-w-320 lg:align-center w-full">
              <Mdx.Provider components>
                <div className="">
                  <div className="w-full">
                    <div className="mt-16 md:mt-32 lg:mt-40 mb-12"> <Intro /> </div>
                    <PlaygroundHero />
                    <QuickInstall />
                    <MainUSP />
                    <OtherSellingPoints />
                    <TrustedBy />
                    <CuratedResources />
                    <Sponsors />
                    children
                  </div>
                </div>
              </Mdx.Provider>
            </main>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  </>
}
