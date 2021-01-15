import { registerOption } from 'pretty-text/pretty-text';

registerOption(
  (siteSettings, opts) => (opts.features["formatting_bbcode"] = true)
);

function replaceFontColor (text) {
  while (text !== (text = text.replace(/\[color=([^\]]+)\]((?:(?!\[color=[^\]]+\]|\[\/color\])[\S\s])*)\[\/color\]/ig, function (match, p1, p2) {
    return `<font color='${p1}'>${p2}</font>`;
  })));
  return text;
}

function replaceFontSize (text) {
  while (text !== (text = text.replace(/\[size=([^\]]+)\]((?:(?!\[size=[^\]]+\]|\[\/size\])[\S\s])*)\[\/size\]/ig, function (match, p1, p2) {
    return `<font size='${p1}'>${p2}</font>`;
  })));
  return text;
}

function replaceTitle (text) {
  while (text !== (text = text.replace(/\[title\](.+?)\[\/title\]/ig, function (match, p) {
    return `<span class="job-title">My title: ${p}</span>`;
  })));
  return text;
}

function replaceJob (text) {
  console.log("replaceJob");
  while (text !== (text = text.replace(/\[job\](.+?)\[\/job\]/igm, function (match, p) {
    return `<div class="job">${p}</div>`;
  })));
  return text;
}

function replaceInstitution (text) {
  console.log("replaceInstitution");
  while (text !== (text = text.replace(/\[institution\](.+?)\[\/institution\]/igm, function (match, p) {
    return `<div class="job">${p}</div>`;
  })));
  return text;
}

function wrap(tag, attr, callback) {
  return function(startToken, finishToken, tagInfo) {
    startToken.tag = finishToken.tag = tag;
    startToken.content = finishToken.content = '';

    startToken.type = 'bbcode_open';
    finishToken.type = 'bbcode_close';

    startToken.nesting = 1;
    finishToken.nesting = -1;

    startToken.attrs = [[attr, callback ? callback(tagInfo) : tagInfo.attrs._default]];
  };
}

function setupMarkdownIt(md) {
  const ruler = md.inline.bbcode.ruler;

  ruler.push('size', {
    tag: 'size',
    wrap: wrap('font', 'size')
  });

  ruler.push('color', {
    tag: 'color',
    wrap: wrap('font', 'color')
  });

  ruler.push('small',{
    tag: 'small',
    wrap: wrap('span', 'style', ()=>'font-size:x-small')
  });

  ruler.push('title',{
    tag: 'title',
    wrap: wrap('span', 'class', ()=>'title')
  });

  ruler.push('institution',{
    tag: 'institution',
    wrap: wrap('span', 'class', ()=>'institution')
  });

  ruler.push('job',{
    tag: 'job',
    wrap: wrap('div', 'class', ()=>'job')
  });

  ruler.push('start-date',{
    tag: 'start-date',
    wrap: wrap('div', 'class', ()=>'start-date')
  });

  ruler.push('floatl', {
    tag: 'floatl',
    wrap: wrap('div', 'class', ()=>'floatl')
  });

  ruler.push('floatr', {
    tag: 'floatr',
    wrap: wrap('div', 'class', ()=>'floatr')
  });

  ruler.push('floatc', {
    tag: 'floatc',
    wrap: wrap('div', 'class', ()=>'floatc')
  });

  ruler.push('left', {
    tag: 'left',
    wrap: wrap('div', 'class', ()=>'bbcodeleft')
  });

  ruler.push('center', {
    tag: 'center',
    wrap: wrap('div', 'class', ()=>'bbcodecenter')
  });

  ruler.push('right', {
    tag: 'right',
    wrap: wrap('div', 'class', ()=>'bbcoderight')
  });

  ruler.push('justify', {
    tag: 'justify',
    wrap: wrap('div', 'class', ()=>'bbcodejustify')
  });

}

export function setup(helper) {

  helper.allowList([
    'div.floatl',
    'div.floatr',
    'div.floatc',
    'div.bbcodeleft',
    'div.bbcodecenter',
    'div.bbcoderight',
    'div.bbcodejustify',
    'font[color=*]',
    'div.job',
    'div.title',
    'span.title',
    'span.job',
    'span.institution',
    'font[size=*]'
  ]);



  helper.allowList({
    custom(tag, name, value) {
      if (tag === 'span' && name === 'style') {
        return /^font-size:.*$/.exec(value);
      }
    }
  });

  if (helper.markdownIt) {
    helper.registerPlugin(setupMarkdownIt);
    return;
  }

  const builders = requirejs('pretty-text/engines/discourse-markdown/bbcode').builders;
  const { register, replaceBBCode, rawBBCode, replaceBBCodeParamsRaw } = builders(helper);

  replaceBBCode("job", contents => ['div', {'class': 'job'}].concat(contents));
  replaceBBCode("title", contents => ['div', {'class': 'title'}].concat(contents));
  replaceBBCode("institution", contents => ['div', {'class': 'institution'}].concat(contents));
  replaceBBCode("start-date", contents => ['div', {'class': 'start-date'}].concat(contents));
  replaceBBCode("end-date", contents => ['div', {'class': 'end-date'}].concat(contents));
  replaceBBCode("dates", contents => ['div', {'class': 'dates'}].concat(contents));
  replaceBBCode("description", contents => ['div', {'class': 'job-description'}].concat(contents));
  replaceBBCode("media", contents => ['div', {'class': 'job-media'}].concat(contents));
  
  replaceBBCode("small", contents => ['span', {'style': 'font-size:x-small'}].concat(contents));
  replaceBBCode("floatl", contents => ['div', {'class': 'floatl'}].concat(contents));
  replaceBBCode("floatr", contents => ['div', {'class': 'floatr'}].concat(contents));
  replaceBBCode("floatc", contents => ['div', {'class': 'floatc'}].concat(contents));
  replaceBBCode("left", contents => ['div', {'class': 'bbcodeleft'}].concat(contents));
  replaceBBCode("center", contents => ['div', {'class': 'bbcodecenter'}].concat(contents));
  replaceBBCode("right", contents => ['div', {'class': 'bbcoderight'}].concat(contents));
  replaceBBCode("justify", contents => ['div', {'class': 'bbcodejustify'}].concat(contents));



  helper.addPreProcessor(replaceFontColor);
  helper.addPreProcessor(replaceFontSize);
  helper.addPreProcessor(replaceJob);
  helper.addPreProcessor(replaceTitle);

}