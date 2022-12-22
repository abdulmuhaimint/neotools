#!/usr/bin/env node
import inquirer from "inquirer";
import inquirerAutoCompletePrompt from "inquirer-autocomplete-prompt";
import { promptGenerator, startPrompt } from "./prompts/questions.js";
// import inquirerCheckboxPlus from "inquirer-checkbox-plus-prompt";
import path from "path";
import fse from "fs-extra";
import { fileURLToPath } from "url";
import degit from "degit";
import { MONOREPO_URL } from "./consts.js";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const main = async () => {
  try {
    //register inquirer plugins
    inquirer.registerPrompt("autocomplete", inquirerAutoCompletePrompt);
    // inquirer.registerPrompt("checkbox-plus", inquirerCheckboxPlus);
    const modulePath = await startPrompt();
    console.log({ modulePath });

    //clone the module to a target folder
    const emitter = degit(`${MONOREPO_URL}${modulePath}`);
    const targetAnswer = await inquirer.prompt({
      type: "input",
      name: "target",
      message: "enter the target folder :",
      default: ".",
    });

    //copy template
    let targetPath = path.join(process.cwd(), targetAnswer.target);
    await fse.ensureDir(targetPath);
    await emitter.clone(targetPath);
    console.log(`module added to ${targetAnswer.target}`);

    //remove package from clone module
  } catch (error) {
    console.error(error);
  }
};

main();
