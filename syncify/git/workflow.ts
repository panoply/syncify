interface GithubWorkflow {
  /**
   * Workflow name for Github CI
   *
   * @default
   * 'Theme CI'
   */
  name?: string
  /**
   * The master branch
   *
   * @default
   * 'master'
   */
  branch?: string;
  /**
   * The node version setup action
   *
   * @default
   * 20
   */
  version?: number;
}

/**
 * The github workflow file ~ `.github/workflows/theme-ci.yaml`
 */
export const workflow = ({ name = 'Theme CI', branch = 'master', version = 20 }: GithubWorkflow = {}) => /* yaml */`
name: ${name}

on:
  push:
    branches:
      - ${branch}  # main branch

jobs:
  flow:
    runs-on: ubuntu-latest

    steps:
    - name: Clone
      uses: actions/checkout@v2

    - name: Node
      uses: actions/setup-node@v2
      with:
        node-version: '${version}'

    - name: Build
      run: |
        node post-merge.js

    - name: Execute
      run: |
        bash .git/hooks/post-merge
`.trim();
