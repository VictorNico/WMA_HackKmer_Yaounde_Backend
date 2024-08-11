# wiki-lex-match

**table of content**

- [local setup](#setup-repo-locally)
- [how to render the](#how-to-render-the-documentation)
- [contributing](#contributing)

## setup repo locally

- Clone repo with

  ```bash
    git clone git@github.com:Wikidata-Cameroon/WMA_HackKmer_Yaounde_Backend.git wiki-lex-match-backend
  ```

- Navigate to project with from your terminal

  ```bash
    cd wiki-lex-match-backend
  ```

- Run the following command on your terminal to install packages and dependencies with npm

  ```bash
    npm install
    # or npm i for short
  ```

### Note

- If you do not have node or npm installed to your machine, download and install the runtime from [node](https://nodejs.org/en/download/package-manager)

## How to start server

- Start local server in watch mode

  ```bash
    npm run dev
  ```

- Generate Project Build

  ```bash
    npm run build
  ```

- Visit API locally through

  ```bash
    http://localhost/8080

    # You can navigate to API version 1 (the current latest version)
    http://localhost/8080/api/v1
  ```

## Contributing

- **Git flow**

  - Branches should be name with `feature/<task>` format

  - Writing commits

    - Commit messages should follow the for mat `#<issue_number> | <author_name> | <work_description>`

    - @example is `"|#1 | @rashjredmund | installed express and configured base project template. setup hustky, prettier, and eslint. also updated readme file"`

    - The numbering is with respect to the issue number your are working on

  - When creating a `PR`;

    - If that pr is for an existing `issue`, be sure to tag the issue in the PR description, to auto-close the issue if it's approved, you can use any of these commands

      - `Resolves #<issue_number>`

      - `Fixes #<issue_number>` or

      - `Closes #<issue_number>`

  - Always assign the PR to yourself and your team-mate

- **Building**

  - Navigate to `src/modules/<your_module_of_concern>` to start contributing

  - Set up your routes in the `src/route/*` directory in the right file or add one if need be

  - Set up your route handlers in the `<module-name>.controller.ts` file and add the endpoints to the corresponding route in `src/routes/*` directory

|

---

**Happy Coding Everyone 🚀**
