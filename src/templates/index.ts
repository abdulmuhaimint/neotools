import { TemplateType } from "../types/template.js";

// export const templates: TemplateType[] = [
//  {
//     name: "github-workflows",
//     submodules: [
//       {
//         name: "deployment",
//         submodules: [
//           {
//             name: "nodejs-ec2",
//           },
//         ],
//       },
//       {
//         name: "integration",
//         submodules: [{ name: "" }],
//       },
//     ],
//   },
// ];

export const templates = {
  "github-workflows": {
    deployment: {
      "nodejs-ec2": {
        isModule: true,
      },
    },
    integration: {},
  },
};
