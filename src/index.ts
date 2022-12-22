#!/usr/bin/env node
import inquirer from "inquirer";
import inquirerAutoCompletePrompt from "inquirer-autocomplete-prompt";
import { promptGenerator, startPrompt } from "./prompts/questions.js";
// import inquirerCheckboxPlus from "inquirer-checkbox-plus-prompt";
import path from "path";
import fse from "fs-extra";
import os from "node:os";
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

    //clone the module to a target folder
    const emitter = degit(`${MONOREPO_URL}${modulePath}`);
    const targetAnswer = await inquirer.prompt({
      type: "input",
      name: "target",
      message: "enter the target folder :",
      default: ".",
    });

    //copy module to tmp dir
    let targetPath = path.join(process.cwd(), targetAnswer.target);
    console.log({targetPath});
    
    let degitTmp = path.join(os.tmpdir(), "degit");
    await fse.emptyDir(degitTmp);
    await fse.ensureDir(degitTmp);
    await emitter.clone(degitTmp);

    //remove package.json from cloned module
    await fse.unlink(`${degitTmp}/package.json`);

    //move module to target
    await fse.ensureDir(targetPath);
    await fse.copy(degitTmp, targetPath, { overwrite: false });
    console.log(`module added to ${targetAnswer.target}`);
  } catch (error) {
    console.error(error);
  }
};

main();
