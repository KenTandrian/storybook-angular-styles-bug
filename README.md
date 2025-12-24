# 🐛 Nx Angular Storybook Styles Bug Reproduction

This repository is a minimal reproducible example for a bug encountered with Nx Angular Storybook regarding global stylesheet loading in the development server.

> **Update (December 2025):** This issue has been resolved in Nx 22, which includes Angular 21 and Storybook 10. The fix is available in the `bugfix` branch.

**Issue Reported:** 
* https://github.com/nrwl/nx/issues/32097

## 🐞 The Bug

When configuring an Nx Angular monorepo, the `storybook` (development server) target for a library (`libs/ui`) does not correctly inherit `styles` defined in its `build-storybook` target. This occurs even when the `browserTarget` in the `storybook` target explicitly points to `ui:build-storybook`, which contradicts the official Nx [documentation](https://nx.dev/technologies/test-tools/storybook/recipes/angular-configuring-styles#using-buildstorybook-for-styles) on configuring styles.

**Expected Behavior:**

Global styles from `apps/client/src/styles.scss` should be applied in the Storybook preview when running `nx storybook ui`.

**Actual Behavior:**

The global styles are **not** applied in the Storybook preview.

## 🏃‍♀️ Steps to Reproduce

Follow these steps to clone the repository and observe the bug:

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/KenTandrian/storybook-angular-styles-bug.git
    cd storybook-angular-styles-bug
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```
    *(This repository already contains the pre-configured `apps/client/src/styles.scss`, `libs/ui/project.json`, `libs/ui/src/lib/ui.component.ts`, `.html`, `.scss`, and `.stories.ts` set up to demonstrate the bug.)*

3.  **Run Storybook Development Server:**
    ```bash
    nx reset
    npm run start:storybook # nx storybook ui
    ```

4.  **Observe the Bug:**
    * Open Storybook in your web browser (usually `http://localhost:4400`).
    * Navigate to the `UI/UiComponent` -> `Primary` story.
    * **You will observe:**
        * The `<h1>` element with `class="storybook-test-class"` will **NOT** have the expected red background, dark red color, or dashed border.
        * The `<p>` element will **NOT** have the Arial font applied.
        * This confirms that the global styles from `apps/client/src/styles.scss` are not being loaded/applied by the Storybook development server in this configuration.

## 🛠️ Temporary Mitigation

To work around this bug and enable styles to load in the Storybook development server, you can explicitly add the `styles` array directly to the `storybook` target's options in `libs/ui/project.json`.

```json
// libs/ui/project.json
{
  "targets": {
    "storybook": {
      "executor": "@storybook/angular:start-storybook",
      "options": {
        // ... other options
        "browserTarget": "ui:build-storybook",
        // This array is added explicitly here to make styles load
        "styles": [
          "apps/client/src/styles.scss"
        ]
      }
    }
  }
}
```

**This is a temporary solution to bypass the bug, not a fix for the underlying issue.**

## 🧪 Environment
You can get detailed environment information by running nx report from the root of this repository:

```bash
nx report
```

(The output of `nx report` from this specific repository is also included in the associated GitHub issue.)

---

Feel free to open an issue on the main Nx repository or refer to the linked issue for more details.
