import inquirer from "inquirer";
import { searchArray } from "../utils/utils.js";
import axios from "axios";
import { MONOREPO_RAW_URL } from "../consts.js";
import { InquirerType } from "../types/template.js";

const getSubModuleChoices = async (url: string): Promise<Array<string>> => {
  const { data } = (await axios.get(url + "/package.json")) || { keywords: [] };
  return data.keywords;
};

export const promptGenerator = async (
  keywords: string[],
  inquirer: InquirerType
) => {
  try {
    let answer = await inquirer.prompt({
      type: "autocomplete",
      name: "q1",
      message: "choose a module",
      source: (answersSoFar: any, input: string) =>
        searchArray(keywords, input),
    });
    return answer.q1;
  } catch (error) {
    console.error(error);
  }
};

export const startPrompt = async () => {
  let url = `${MONOREPO_RAW_URL}/main`;
  let answer = ``;
  let keywords = await getSubModuleChoices(url);
  while (keywords.length) {
    answer = answer + "/" + (await promptGenerator(keywords, inquirer));
    keywords = await getSubModuleChoices(url + answer);
  }
  console.log({ answer });
};
