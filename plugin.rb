# name: discourse-formatting-toolbar
# about: Add formatting options on your post (Discourse)
# version: 3.2
# authors: Steven, iunctis.fr - Thanks to ZogStrip, eviltrout, cpradio and Sam Saffron
# url: https://github.com/iunctis/discourse-formatting-toolbar.git

enabled_site_setting :formattingtlb_enabled

register_asset 'stylesheets/formatting.scss'

register_svg_icon "fa-underline" if respond_to?(:register_svg_icon)
register_svg_icon "fa-indent" if respond_to?(:register_svg_icon)
register_svg_icon "far-image" if respond_to?(:register_svg_icon)
register_svg_icon "fa-align-left" if respond_to?(:register_svg_icon)
register_svg_icon "fa-align-center" if respond_to?(:register_svg_icon)
register_svg_icon "fa-align-right" if respond_to?(:register_svg_icon)
register_svg_icon "fa-align-justify" if respond_to?(:register_svg_icon)
register_svg_icon "fa-palette" if respond_to?(:register_svg_icon)
register_svg_icon "fa-font" if respond_to?(:register_svg_icon)
