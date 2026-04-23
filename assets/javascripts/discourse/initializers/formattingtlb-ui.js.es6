import { withPluginApi } from "discourse/lib/plugin-api";

function initializePlugin(api) {
  const siteSettings = api.container.lookup("service:site-settings");

  if (siteSettings.formattingtlb_enabled) {
    api.onToolbarCreate((toolbar) => {
      [
        ["job_button", "building", "[job]", "[/job]", "job_default_text"],
        [
          "school_button",
          "university",
          "[school]",
          "[/school]",
          "school_default_text",
        ],
        [
          "self_assessment_button",
          "tasks",
          "[assessment]",
          "[/assessment]",
          "self_assessment_default_text",
        ],
        [
          "project_button",
          "code",
          "[project]",
          "[/project]",
          "project_default_text",
        ],
        [
          "skills_button",
          "cogs",
          "[skills]",
          "[/skills]",
          "skills_default_text",
        ],
      ].forEach(([id, icon, before, after, translationKey]) => {
        toolbar.addButton({
          id,
          group: "extras",
          icon,
          perform: (event) =>
            event.applySurround(before, after, translationKey),
        });
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
