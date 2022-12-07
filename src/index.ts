#!/usr/bin/env node
import inquirer from "inquirer";
import inquirerAutoCompletePrompt from "inquirer-autocomplete-prompt";
import { questions } from "./interactive/questions.js";
import { writeFile } from "./utils/utils.js";
import inquirerCheckboxPlus from "inquirer-checkbox-plus-prompt";

const main = async () => {
  try {
    //register inquirer plugins
    inquirer.registerPrompt("autocomplete", inquirerAutoCompletePrompt);
    inquirer.registerPrompt("checkbox-plus", inquirerCheckboxPlus);

    //prompts
    const answers = await inquirer.prompt(questions);
    let output_file: string = answers.output;
    console.log("Writing to " + output_file);
    delete answers.output;
    //writing answers to output file
    await writeFile(output_file, JSON.stringify(answers, null, "  "));
  } catch (error) {
    console.error(error);
  }
};

main();
