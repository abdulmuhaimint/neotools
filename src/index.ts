#!/usr/bin/env node
import inquirer from "inquirer";
import inquirerAutoCompletePrompt from "inquirer-autocomplete-prompt";
import { promptGenerator, startPrompt } from "./prompts/questions.js";
// import inquirerCheckboxPlus from "inquirer-checkbox-plus-prompt";
import path from "path";
import fse from "fs-extra";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const main = async () => {
  try {
    //register inquirer plugins
    inquirer.registerPrompt("autocomplete", inquirerAutoCompletePrompt);
    // inquirer.registerPrompt("checkbox-plus", inquirerCheckboxPlus);
    await startPrompt()
    
  } catch (error) {
    console.error(error);
  }
};

main();
