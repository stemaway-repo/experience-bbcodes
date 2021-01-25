# name: stemaway-experience-bbcodes
# about: Add formatting options on your post (Discourse)
# version: 3.2
# authors: Steven, iunctis.fr - Thanks to ZogStrip, eviltrout, cpradio and Sam Saffron
# url: https://github.com/iunctis/discourse-formatting-toolbar.git

enabled_site_setting :formattingtlb_enabled

register_asset 'stylesheets/formatting.scss'

register_svg_icon "fa-university" if respond_to?(:register_svg_icon)
register_svg_icon "fa-building" if respond_to?(:register_svg_icon)
