import { Answers, QuestionCollection } from "inquirer";

export interface InquirerType {
  prompt: ({}) => Answers;
}
export type TemplateType = {
  target: string;
  isModule: boolean;
};
export type TemplatesTypeNew = TemplateType & TemplatesType | TemplatesType;

export type TemplatesType = Record<string, any>;

type T = keyof TemplatesTypeNew;
