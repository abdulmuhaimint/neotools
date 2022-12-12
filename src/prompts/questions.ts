import { QuestionCollection, Answers } from "inquirer";
import { searchArray } from "../utils/utils.js";
import {
  InquirerType,
  TemplatesTypeNew,
} from "../types/template.js";

const getSubModuleChoices = (modules: TemplatesTypeNew) => {
  if (modules) return Object.keys(modules).filter((key) => key !== "isModule");
};

export const promptGenerator = async (
  module: TemplatesTypeNew,
  prevAnswer = "",
  inquirer: InquirerType,
  arr: string[],
  templateObj: { obj: {} }
) => {
  try {
    if (Object.keys(module).length && !module.isModule) {
      let answer = await inquirer.prompt({
        type: "autocomplete",
        name: "q1",
        message: prevAnswer ? "choose a submodule" : "choose a module",
        source: (answersSoFar: Answers, input: string) =>
          searchArray(getSubModuleChoices(module), input),
      });
      if (answer.q1) {
        arr.push(answer.q1);
        let index = answer.q1
        await promptGenerator(
          module[index],
          answer.q1,
          inquirer,
          arr,
          templateObj
        );
      }
    }
    if (module.isModule) {
      templateObj.obj = module;
    }
  } catch (error) {
    console.error(error);
  }
};
