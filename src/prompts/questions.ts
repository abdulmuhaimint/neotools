import { QuestionCollection } from "inquirer";
import { searchArray } from "../utils/utils.js";
import { templates } from "../templates/index.js";

const getSubModuleChoices = (module) => {
  if (module) return Object.keys(module).filter((key) => key !== "isModule");
};

export const promptGenerator = async (
  module,
  prevAnswer = "",
  inquirer,
  arr: string[],
  templateObj:{obj:{}}
) => {
  try {
    if (Object.keys(module).length && !module.isModule) {
      let answer = await inquirer.prompt({
        type: "autocomplete",
        name: "q1",
        message: prevAnswer ? "choose a submodule" : "choose a module",
        source: (answersSoFar, input) =>
          searchArray(getSubModuleChoices(module), input),
      });
      if (answer.q1) {
        arr.push(answer.q1);
        await promptGenerator(module[answer.q1], answer.q1, inquirer, arr, templateObj);
      }
    }
    if(module.isModule){
      templateObj.obj = module
    }
  } catch (error) {
    console.error(error);
  }
};
