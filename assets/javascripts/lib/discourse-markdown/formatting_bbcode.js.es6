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
    wrap: wrap("div", "class", () => "title"),
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

  ruler.push("subtitle", {
    tag: "subtitle",
    wrap: wrap("div", "class", () => "subtitle"),
  });

  ruler.push("header", {
    tag: "header",
    wrap: wrap("div", "class", () => "header"),
  });

  blockRuler.push("block-job", {
    tag: "job",
    before(state, tagInfo) {
      let token = state.push("job_open", "div", 1);
      token.attrs = [["class", "job"]];
      token.content = "";
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
      token.content = "";
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
      token.content = "";
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
      token.content = "";
    },
    after(state) {
      state.push("assessment_close", "div", -1);
    },
  });

  blockRuler.push("block-project", {
    tag: "project",
    before(state, tagInfo) {
      let token = state.push("project_open", "div", 1);
      token.attrs = [["class", "project"]];
      token.content = "";
    },
    after(state) {
      state.push("project_close", "div", -1);
    },
  });

  blockRuler.push("block-skills", {
    tag: "skills",
    before(state, tagInfo) {
      let token = state.push("skills_open", "div", 1);
      token.attrs = [["class", "skills"]];
      token.content = "";
    },
    after(state) {
      state.push("skills_close", "div", -1);
    },
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
    "font[size=*]",
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
    "div.project",
    "div.skills",
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
  }
}