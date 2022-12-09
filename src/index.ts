#!/usr/bin/env node
import inquirer from "inquirer";
import inquirerAutoCompletePrompt from "inquirer-autocomplete-prompt";
import { promptGenerator } from "./prompts/questions.js";
import { writeFile } from "./utils/utils.js";
import inquirerCheckboxPlus from "inquirer-checkbox-plus-prompt";
import { templates } from "./templates/index.js";
import fs from "fs/promises";
import path from "path"

const main = async () => {
  try {
    //register inquirer plugins
    inquirer.registerPrompt("autocomplete", inquirerAutoCompletePrompt);
    inquirer.registerPrompt("checkbox-plus", inquirerCheckboxPlus);
    let arr: string[] = [];
    //prompts
    await promptGenerator(templates, "", inquirer, arr);
    let templateDir = "./src/templates/" + arr.join("/");
    const files = await fs.readdir(path.resolve(templateDir));
    console.log(files);
    // const answers = await inquirer.prompt(questions);
    // console.log({ answers });

    // let output_file: string = answers.output;
    // console.log("Writing to " + output_file);
    // delete answers.output;
    // //writing answers to output file
    // await writeFile(output_file, JSON.stringify(answers, null, "  "));
  } catch (error) {
    console.error(error);
  }
};

main();
