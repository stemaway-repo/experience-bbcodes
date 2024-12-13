# frozen_string_literal: true

# name: stemaway-experience-bbcodes
# about: Add formatting options on your post (Discourse)
# version: 3.3
# authors: Steven, iunctis.fr - Thanks to ZogStrip, eviltrout, cpradio, Sam Saffron
# url: https://github.com/iunctis/discourse-formatting-toolbar.git

enabled_site_setting :formattingtlb_enabled

register_asset 'stylesheets/formatting.scss'

# Register icons for toolbar buttons
register_svg_icon "fa-university" if respond_to?(:register_svg_icon)
register_svg_icon "fa-building" if respond_to?(:register_svg_icon)
register_svg_icon "fa-code" if respond_to?(:register_svg_icon)
register_svg_icon "fa-cogs" if respond_to?(:register_svg_icon)