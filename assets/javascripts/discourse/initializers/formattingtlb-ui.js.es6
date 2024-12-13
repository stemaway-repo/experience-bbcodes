import { withPluginApi } from "discourse/lib/plugin-api";

function initializePlugin(api) {
  const siteSettings = api.container.lookup("site-settings:main");

  if (siteSettings.formattingtlb_enabled) {
    api.onToolbarCreate((toolbar) => {
      toolbar.addButton({
        id: "job_button",
        group: "extras",
        icon: "building",
        perform: (e) =>
          e.applySurround("[job]", "[/job]", "job_default_text"),
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

    api.onToolbarCreate((toolbar) => {
      toolbar.addButton({
        id: "self_assessment_button",
        group: "extras",
        icon: "tasks",
        perform: (e) =>
          e.applySurround(
            "[assessment]",
            "[/assessment]",
            "self_assessment_default_text"
          ),
      });
    });

    api.onToolbarCreate((toolbar) => {
      toolbar.addButton({
        id: "project_button",
        group: "extras",
        icon: "code",
        perform: (e) =>
          e.applySurround("[project]", "[/project]", "project_default_text"),
      });
    });

    api.onToolbarCreate((toolbar) => {
      toolbar.addButton({
        id: "skills_button",
        group: "extras",
        icon: "cogs",
        perform: (e) =>
          e.applySurround("[skills]", "[/skills]", "skills_default_text"),
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
