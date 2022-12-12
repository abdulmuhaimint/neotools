import { TemplatesType, TemplatesTypeNew } from "../types/template";

export const templates:TemplatesType = {
  "github-workflows": {
    deployment: {
      "nodejs-ec2": {
        isModule: true,
        target: ".github",
      },
    },
    integration: {},
  },
};
