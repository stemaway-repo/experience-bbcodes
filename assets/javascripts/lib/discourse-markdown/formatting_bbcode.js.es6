import { parseBBCodeTag } from "pretty-text/engines/discourse-markdown/bbcode-block";

function wrap(tag, attr, callback) {
  return function (startToken, finishToken, tagInfo) {
    startToken.tag = finishToken.tag = tag;
    startToken.content = finishToken.content = "";

    startToken.type = "bbcode_open";
    finishToken.type = "bbcode_close";

    startToken.nesting = 1;
    finishToken.nesting = -1;

    startToken.attrs = [
      [attr, callback ? callback(tagInfo) : tagInfo.attrs._default],
    ];
  };
}

function setupMarkdownIt(md) {
  const ruler = md.inline.bbcode.ruler;
  const blockRuler = md.block.bbcode.ruler;

  ruler.push("size", {
    tag: "size",
    wrap: wrap("font", "size"),
  });

  ruler.push("color", {
    tag: "color",
    wrap: wrap("font", "color"),
  });

  ruler.push("small", {
    tag: "small",
    wrap: wrap("span", "style", () => "font-size:x-small"),
  });

  ruler.push("title", {
    tag: "title",
    wrap: wrap("div", "class", () => "job-title"),
  });

  ruler.push("degree", {
    tag: "degree",
    wrap: wrap("div", "class", () => "degree"),
  });

  ruler.push("company", {
    tag: "company",
    wrap: wrap("div", "class", () => "company"),
  });

  ruler.push("institution", {
    tag: "institution",
    wrap: wrap("div", "class", () => "institution"),
  });

  ruler.push("grade", {
    tag: "grade",
    wrap: wrap("div", "class", () => "grade"),
  });

  ruler.push("type", {
    tag: "type",
    wrap: wrap("div", "class", () => "type"),
  });

  ruler.push("institution", {
    tag: "institution",
    wrap: wrap("div", "class", () => "institution"),
  });

  ruler.push("logo", {
    tag: "logo",
    wrap: wrap("div", "class", () => "logo"),
  });

  ruler.push("location", {
    tag: "location",
    wrap: wrap("div", "class", () => "location"),
  });

  ruler.push("dates", {
    tag: "dates",
    wrap: wrap("div", "class", () => "dates"),
  });

  ruler.push("title", {
    tag: "title",
    wrap: wrap("div", "class", () => "job-title"),
  });

  ruler.push("subtitle", {
    tag: "subtitle",
    wrap: wrap("div", "class", () => "subtitle"),
  });

  ruler.push("header", {
    tag: "header",
    wrap: wrap("div", "class", () => "header"),
  });

  function camelCaseToDash(str) {
    return str.replace(/([a-zA-Z])(?=[A-Z])/g, "$1-").toLowerCase();
  }

  function parseAttributes(tagInfo) {
    const attributes = tagInfo.attrs._default || "";

    return (
      parseBBCodeTag(`[wrap wrap=${attributes}]`, 0, attributes.length + 12)
        .attrs || {}
    );
  }

  function applyDataAttributes(token, state, attributes) {
    Object.keys(attributes).forEach((tag) => {
      const value = state.md.utils.escapeHtml(attributes[tag]);
      tag = camelCaseToDash(
        state.md.utils.escapeHtml(tag.replace(/[^A-Za-z\-0-9]/g, ""))
      );

      if (value && tag && tag.length > 1) {
        token.attrs.push([`data-${tag}`, value]);
      }
    });
  }

  blockRuler.push("block-job", {
    tag: "job",
    before(state, tagInfo) {
      let token = state.push("job_open", "div", 1);
      token.attrs = [["class", "job"]];
      applyDataAttributes(token, state, parseAttributes(tagInfo));
    },
    after(state) {
      state.push("job_close", "div", -1);
    },
  });

  blockRuler.push("block-description", {
    tag: "description",
    before(state, tagInfo) {
      let token = state.push("description_open", "div", 1);
      token.attrs = [["class", "description"]];
      applyDataAttributes(token, state, parseAttributes(tagInfo));
    },
    after(state) {
      state.push("description_close", "div", -1);
    },
  });

  blockRuler.push("block-school", {
    tag: "school",
    before(state, tagInfo) {
      let token = state.push("school_open", "div", 1);
      token.attrs = [["class", "school"]];
      applyDataAttributes(token, state, parseAttributes(tagInfo));
    },
    after(state) {
      state.push("school_close", "div", -1);
    },
  });

  blockRuler.push("block-assessment", {
    tag: "assessment",
    before(state, tagInfo) {
      let token = state.push("assessment_open", "div", 1);
      token.attrs = [["class", "assessment"]];
      applyDataAttributes(token, state, parseAttributes(tagInfo));
    },
    after(state) {
      state.push("assessment_close", "div", -1);
    },
  });

  ruler.push("floatl", {
    tag: "floatl",
    wrap: wrap("div", "class", () => "floatl"),
  });

  ruler.push("floatr", {
    tag: "floatr",
    wrap: wrap("div", "class", () => "floatr"),
  });

  ruler.push("floatc", {
    tag: "floatc",
    wrap: wrap("div", "class", () => "floatc"),
  });

  ruler.push("left", {
    tag: "left",
    wrap: wrap("div", "class", () => "bbcodeleft"),
  });

  ruler.push("center", {
    tag: "center",
    wrap: wrap("div", "class", () => "bbcodecenter"),
  });

  ruler.push("right", {
    tag: "right",
    wrap: wrap("div", "class", () => "bbcoderight"),
  });

  ruler.push("justify", {
    tag: "justify",
    wrap: wrap("div", "class", () => "bbcodejustify"),
  });
}

export function setup(helper) {
  helper.registerOptions((opts) => (opts.features["formatting_bbcode"] = true));
  helper.allowList([
    "div.floatl",
    "div.floatr",
    "div.floatc",
    "div.bbcodeleft",
    "div.bbcodecenter",
    "div.bbcoderight",
    "div.bbcodejustify",
    "font[color=*]",
    "div.job-container",
    "div.job-title",
    "div.job",
    "div.school",
    "div.company",
    "div.degree",
    "div.grade",
    "div.type",
    "div.institution",
    "div.dates",
    "div.description",
    "div.logo",
    "div.location",
    "div.subtitle",
    "div.header",
    "div.assessment",
    "font[size=*]",
  ]);

  helper.allowList({
    custom(tag, name, value) {
      if (tag === "span" && name === "style") {
        return /^font-size:.*$/.exec(value);
      }
    },
  });

  if (helper.markdownIt) {
    helper.registerPlugin(setupMarkdownIt);
    return;
  }

  const builders = requirejs(
    "pretty-text/engines/discourse-markdown/bbcode"
  ).builders;
  const { replaceBBCode } = builders(helper);

  replaceBBCode("job", (contents) =>
    ["div", { class: "job" }].concat(contents)
  );
  replaceBBCode("school", (contents) =>
    ["div", { class: "school" }].concat(contents)
  );
  replaceBBCode("company", (contents) =>
    ["div", { class: "company" }].concat(contents)
  );
  replaceBBCode("activity", (contents) =>
    ["div", { class: "job" }].concat(contents)
  );
  replaceBBCode("title", (contents) =>
    ["div", { class: "job-title" }].concat(contents)
  );
  replaceBBCode("type", (contents) =>
    ["div", { class: "type" }].concat(contents)
  );
  replaceBBCode("institution", (contents) =>
    ["div", { class: "institution" }].concat(contents)
  );
  replaceBBCode("degree", (contents) =>
    ["div", { class: "degree" }].concat(contents)
  );
  replaceBBCode("grade", (contents) =>
    ["div", { class: "grade" }].concat(contents)
  );
  replaceBBCode("logo", (contents) =>
    ["div", { class: "logo" }].concat(contents)
  );
  replaceBBCode("dates", (contents) =>
    ["div", { class: "dates" }].concat(contents)
  );
  replaceBBCode("description", (contents) =>
    ["div", { class: "description" }].concat(contents)
  );
  replaceBBCode("start-date", (contents) =>
    ["div", { class: "start-date" }].concat(contents)
  );
  replaceBBCode("end-date", (contents) =>
    ["div", { class: "end-date" }].concat(contents)
  );
  replaceBBCode("dates", (contents) =>
    ["div", { class: "dates" }].concat(contents)
  );
  replaceBBCode("description", (contents) =>
    ["div", { class: "job-description" }].concat(contents)
  );
  replaceBBCode("media", (contents) =>
    ["div", { class: "job-media" }].concat(contents)
  );
  replaceBBCode("assessment", (contents) =>
    ["div", { class: "assessment" }].concat(contents)
  );
  replaceBBCode("subtitle", (contents) =>
    ["div", { class: "subtitle" }].concat(contents)
  );
  replaceBBCode("header", (contents) =>
    ["div", { class: "header" }].concat(contents)
  );
}
