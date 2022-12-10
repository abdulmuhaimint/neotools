# Neotools

A cli tool for devs

### Libraries used
* [inquirer js](https://github.com/SBoudrias/Inquirer.js)
* inquirer plugins
    * [autocomplete](https://github.com/mokkabonna/inquirer-autocomplete-prompt)
    * [checkbox-plus](https://github.com/faressoft/inquirer-checkbox-plus-prompt)

### Installation and execution
```
npm install
npm run build
npm start
```

### Global installation
```
npm install
npm run build
npm link

# now you can run the following command from anywhere.

neotools
```

### Template structure  
Templates are stored in `src/templates` folder. for tracking the different templates we keep an index file in the same folder.  

### Adding a template
To add a template create a folder inside `src/templates`. Add the template files to this newly created folder.  

Then update the `src/templates/index.ts` file. `index.ts` keeps an object. keys of this object are the name of the template or submodule/category. finally add the boolean isModule and target value to which the templates are copied.  
Example of index

```
{
  "github-workflows": {
    deployment: {
      "nodejs-ec2": {
        isModule: true,
        target: ".github",
      },
    },
  },
  //...
  //add other templates here
}
```

