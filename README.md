# wiki-lex-match

__table of content__

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

## How to start server

- Start local server in watch mode

    ```bash
      npm run dev
    ```

- Build to js

    ```bash
      npm run build
    ```

## Contributing

- __Git flow__

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

- __Building__
  
  - Navigate to `src/modules/<your_module_of_concern>` to start contributing

  - Set up your routes in the `src/route/*` directory in the right file or add one if need be

  - Set up your route handlers in the `<module-name>.controller.ts` file and add the endpoints to the corresponding route in `src/routes/*` directory

|

___

__Happy Coding Everyone 🚀__
