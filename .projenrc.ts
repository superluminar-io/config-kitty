import { typescript } from 'projen';
const project = new typescript.TypeScriptAppProject({
  defaultReleaseBranch: 'main',
  name: 'config-kitty',
  projenrcTs: true,
  autoDetectBin: true,
  license: 'MIT',
  authorName: 'superluminar GmbH',
  deps: ['@inquirer/prompts'], /* Runtime dependencies of this module. */
  description: 'ConfigKitty: Purrfect eslint/prettier setup for your CDK codebase',
});
project.synth();