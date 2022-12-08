const templates = [
  {
    name: "github-workflows",
    submodules: [
      {
        name: "deployment",
        submodules: [
          {
            name: "nodejs-ec2",
          },
        ],
      },
      {
        name: "integration",
        submodules: [{}],
      },
    ],
  },
];
