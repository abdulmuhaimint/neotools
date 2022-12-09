#!/usr/bin/env node
import inquirer from "inquirer";
import inquirerAutoCompletePrompt from "inquirer-autocomplete-prompt";
import { promptGenerator, questions } from "./prompts/questions.js";
import { writeFile } from "./utils/utils.js";
import inquirerCheckboxPlus from "inquirer-checkbox-plus-prompt";
import { templates } from "./templates/index.js";

const main = async () => {
  try {
    //register inquirer plugins
    inquirer.registerPrompt("autocomplete", inquirerAutoCompletePrompt);
    inquirer.registerPrompt("checkbox-plus", inquirerCheckboxPlus);
    let arr:string[] = [];
    //prompts
    await promptGenerator(templates, "", inquirer, arr);
    console.log(arr)
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
