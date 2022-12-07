import { QuestionCollection } from "inquirer";
import { languageChoices, osChoices } from "../interactive/choices.js";
import { searchArray } from "../utils/utils.js";

export const questions: QuestionCollection = [
  {
    type: "list",
    name: "Language",
    message: "Choose a language (normal select)",
    choices: languageChoices,
  },
  {
    type: "checkbox",
    name: "Languages",
    message: "Choose the languages (normal checkbox)",
    choices: languageChoices,
  },
  {
    type: "autocomplete",
    name: "Operating system",
    message: "Choose an operating system (search select)",
    source: (answersSoFar, input) => searchArray(osChoices, input),
  },
  {
    type: "checkbox-plus",
    name: "Operating systems",
    message: "Choose the operating systems (search checkbox)",
    source: (answersSoFar, input) => searchArray(osChoices, input),
    highlight: true,
    searchable: true,
  },
  {
    type:"input",
    name:"output",
    message:"Enter the output file name",
    default:"output.json"
  },
];
