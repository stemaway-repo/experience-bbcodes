import { withPluginApi } from "discourse/lib/plugin-api";
import { i18n } from "discourse-i18n";

function resolveButtonTitle(key, fallback) {
  const translated = i18n(key);

  if (
    !translated ||
    translated === key ||
    translated.startsWith?.("Missing translation:")
  ) {
    return fallback;
  }

  return translated;
}

function initializePlugin(api) {
  const siteSettings = api.container.lookup("service:site-settings");

  if (siteSettings.formattingtlb_enabled) {
    api.replaceIcon("university", "graduation-cap");
    api.replaceIcon("tasks", "clipboard-check");
    api.replaceIcon("cogs", "gear");

    api.onToolbarCreate((toolbar) => {
      const extrasGroup = toolbar.groups.find(
        (group) => group.group === "extras",
      );

      [
        [
          "job_button",
          "building",
          "[job]",
          "[/job]",
          "job_default_text",
          "composer.job_button_title",
          "Insert Job",
        ],
        [
          "school_button",
          "graduation-cap",
          "[school]",
          "[/school]",
          "school_default_text",
          "composer.school_button_title",
          "Insert Education",
        ],
        [
          "self_assessment_button",
          "clipboard-check",
          "[assessment]",
          "[/assessment]",
          "self_assessment_default_text",
          "composer.self_assessment_button_title",
          "Insert Self Assessment",
        ],
        [
          "project_button",
          "code",
          "[project]",
          "[/project]",
          "project_default_text",
          "composer.project_button_title",
          "Insert Project",
        ],
        [
          "skills_button",
          "gear",
          "[skills]",
          "[/skills]",
          "skills_default_text",
          "composer.skills_button_title",
          "Insert Skills",
        ],
      ].forEach(
        ([
          id,
          icon,
          before,
          after,
          translationKey,
          titleKey,
          fallbackTitle,
        ]) => {
          const finalTitle = resolveButtonTitle(titleKey, fallbackTitle);

          toolbar.addButton({
            id,
            group: "extras",
            icon,
            title: titleKey,
            perform: (event) =>
              event.applySurround(before, after, translationKey),
          });

          const addedButton = extrasGroup?.buttons?.at?.(-1);

          if (addedButton?.id === id) {
            addedButton.title = finalTitle;
          }
        },
      );
    });
  }
}

export default {
  name: "formattingtlb-ui",
  initialize: function () {
    withPluginApi((api) => initializePlugin(api));
  },
};
