import inquirer from "inquirer";
import { searchArray } from "../utils/utils.js";
import axios from "axios";
import { REPO_RAW_URL, REPO_INDEX, GITHUB_URL } from "../consts.js";
import { InquirerType } from "../types/template.js";
import path from "node:path";

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
    return answer.q1 + "";
  } catch (error) {
    console.error(error);
  }
  return "devops";
};

export const startPrompt = async () => {
  let targetObject: any = REPO_INDEX;
  let keywords = Object.keys(targetObject);
  let module = (await promptGenerator(
    keywords,
    inquirer
  )) as keyof typeof targetObject;
  //check if there is sub modules
  if (typeof targetObject[module] === "object") {
    targetObject = targetObject[module];
    keywords = Object.keys(targetObject);
    if (keywords.length)
      module = (await promptGenerator(
        keywords,
        inquirer
      )) as keyof typeof targetObject;
  }
  if (!targetObject[module]) {
    console.error("no url found");
    return null;
  }
  let url = new URL(
    path.join(targetObject[module], "main"),
    REPO_RAW_URL
  ).toString();
  keywords = await getSubModuleChoices(url);

  let answer = "";
  while (keywords.length) {
    answer = path.join(answer, await promptGenerator(keywords, inquirer));
    keywords = await getSubModuleChoices(
      new URL(path.join("main", answer), url).toString()
    );
    console.log(answer);
  }
  return new URL(path.join(targetObject[module], answer), GITHUB_URL).toString();
};
