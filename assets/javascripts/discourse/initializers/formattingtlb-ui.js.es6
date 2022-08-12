import { withPluginApi } from "discourse/lib/plugin-api";
// import { onToolbarCreate } from 'discourse/components/d-editor';

function initializePlugin(api) {
  const siteSettings = api.container.lookup("site-settings:main");

  if (siteSettings.formattingtlb_enabled) {
    api.onToolbarCreate((toolbar) => {
      toolbar.addButton({
        id: "job_button",
        group: "extras",
        icon: "building",
        perform: (e) => e.applySurround("[job]", "[/job]", "job_default_text"),
      });
    });

    api.onToolbarCreate((toolbar) => {
      toolbar.addButton({
        id: "school_button",
        group: "extras",
        icon: "university",
        perform: (e) =>
          e.applySurround("[school]", "[/school]", "school_default_text"),
      });
    });
  }
}

export default {
  name: "formattingtlb-ui",
  initialize: function () {
    withPluginApi("0.1", (api) => initializePlugin(api));
  },
};
