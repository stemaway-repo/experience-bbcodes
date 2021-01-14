## discourse-formatting-toolbar

Add text formatting options on your post

<br>

![](https://github.com/iunctis/discourse-formatting-toolbar/blob/master/formatting-toolbar.png?raw=true)
<br>Here is the toolbar in the composer and the result in your post when you use the plugin



<br>

## Tips

- [**How to install a plugin**](https://meta.discourse.org/t/install-a-plugin/19157) : a guide by @techAPJ<br><br>

- We have a `floatl` bbcode (and button) that allows you to add a content on the left of your text (like in the screen earlier). There is also a `[floatr][/floatr]` bbcode, that adds a content on the right. The bbcode has been created but I didn’t add a button, it doesn’t feel necessary.

- If you want to change the space between the image on `[floatl]` or `[floatr]`, you can go to the Customize section in your admin panels, create a new css page (in General) and add this and change the value in the margin part : 

```css
.floatl {
    float:left;
    margin-right:15px;
}
```


```css
.floatr {
    float:right;
    margin-left:15px;
}
```

- For the color bbcode, you can add a color code in the bbcode : `[color=#FF3300]Text[/color]` to have a red text. You can find color codes in multiple websites like this one : http://html-color-codes.info/

- If you want to make more room in the toolbar you can delete the spacer between the categories of buttons by adding in a CSS stylesheet : 

```css
.d-editor-spacer {
    display: none;
}
```

And hide some button like the numbered list by adding : 

```css
button.ember-view.btn.no-text.list {
    display: none;
}
```

<br>

## Support

- [Report an issue on Github](https://github.com/iunctis/discourse-formatting-toolbar/issues)
- [English support on meta.discourse.org](https://meta.discourse.org/t/formatting-toolbar/40649)
- [Support en français sur iunctis.fr](https://iunctis.fr/t/formatting-toolbar-options-de-mise-en-forme/4244)


<br>

## Thanks

 - [ZogStrip](https://github.com/discourse/vbulletin-bbcode) : for his Discourse BBcode plugin, which served as a base for this plugin.
 - [eviltrout](https://github.com/eviltrout) : for the upgrade of the Discourse BBcode plugin with a new engine (2016)
 - [Sam Saffron](https://github.com/SamSaffron) : for the upgrade of the Discourse BBcode plugin with the new markdown-it engine (2017)
 - [cpradio](https://github.com/cpradio) : for the help on the toolbar.
