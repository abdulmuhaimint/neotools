#!/usr/bin/env node
import inquirer from "inquirer";
import inquirerAutoCompletePrompt from "inquirer-autocomplete-prompt";
import { promptGenerator } from "./prompts/questions.js";
import { writeFile } from "./utils/utils.js";
import inquirerCheckboxPlus from "inquirer-checkbox-plus-prompt";
import { templates } from "./templates/index.js";
import fs from "fs/promises";
import path from "path";
import fse from "fs-extra";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const main = async () => {
  try {
    //register inquirer plugins
    inquirer.registerPrompt("autocomplete", inquirerAutoCompletePrompt);
    inquirer.registerPrompt("checkbox-plus", inquirerCheckboxPlus);
    let arr: string[] = [];
    let templateObj = { obj: { target: "" } };
    //prompts
    await promptGenerator(templates, "", inquirer, arr, templateObj);
    let templateDir = path.join(__dirname, "./templates/" + arr.join("/"));
    const files = await fs.readdir(templateDir);
    // console.log({files,templateObj, templateDir});
    await fse.ensureDir(path.join(process.cwd(), templateObj.obj.target));
    await fse.copy(
      templateDir,
      path.join(process.cwd(), templateObj.obj.target),
      { overwrite: false }
    );
    console.log(`template added to ${templateObj.obj.target}`);
  } catch (error) {
    console.error(error);
  }
};

main();
