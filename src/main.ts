#!/usr/bin/env node

import { execSync } from 'child_process';
import * as fs from 'fs';
import { confirm } from '@inquirer/prompts';

const createConfigFiles = () => {
// Create .eslintrc.js
  const eslintrc = `
{
  "root": true,
  "env": {
    "es2021": true,
    "node": true
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint",
    "import",
    "prettier"
  ],
  "extends": [
    "standard",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended"
  ],
  "rules": {
    "semi": "off",
    "no-new": "off",
    "no-case-declarations": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off"
  },
  "ignorePatterns": [
    "dist/",
    "node_modules/",
    "cdk.out/"
  ]
}
`;

  fs.writeFileSync('.eslintrc.json', eslintrc);
  console.log('Created .eslintrc.json');

  // Create .prettierrc
  const prettierrc = `
{
  "singleQuote": true
}
`;

  fs.writeFileSync('.prettierrc.json', prettierrc);
  console.log('Created .prettierrc.json');

  // Create .editorconfig
  const editorconfig = `
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
`;

  fs.writeFileSync('.editorconfig', editorconfig);
  console.log('Created .editorconfig');
};

const installDependencies = () => {
// Detect npm or Yarn
  const userAgent = process.env.npm_config_user_agent;
  const isYarn = userAgent?.includes('yarn');
  const packageManager = isYarn ? 'yarn' : 'npm';

  const installCmd = isYarn ? 'yarn add' : 'npm install --save-dev';
  const packages = [
    'eslint',
    'prettier',
    'eslint-config-prettier',
    'eslint-plugin-prettier',
    'eslint-config-standard',
  ];

  console.log(`Installing dependencies using ${packageManager}...`);
  execSync(`${installCmd} ${packages.join(' ')}`, { stdio: 'inherit' });
  console.log('Dependencies installed successfully.');
};

confirm({
  message: 'This will create .eslintrc.json, .prettierrc.json, and .editorconfig files and install dependencies. Do you want to proceed?',
},
).then(answer => {
  if (answer) {
    createConfigFiles();
    installDependencies();
  } else {
    console.log('Aborting.');
  }
}).catch(err => {
  console.error(err);
});


