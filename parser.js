// get the AST from source code
const parser = require('@babel/parser')
// read/write file
const fs = require('fs')
// traverse the AST
const traverse = require('@babel/traverse').default;
// generate code from AST
const generate = require('@babel/generator').default;
// the types of the different nodes in the AST
const t = require("@babel/types");
// make sure source code looks good
const prettier = require('prettier');

const source = fs.readFileSync('./constants.ts', 'utf-8')
const ast = parser.parse(source, {sourceType: 'module'})

traverse(ast, {
  ObjectExpression(path) {
    path.node.properties = path.node.properties.sort((a,b) => {
      return a.key.name > b.key.name
    })
  }
})

const output = generate(ast, {compact: false, retainLines: true}).code
const prettifiedCode = prettier.format(output, { parser: 'babylon' })

fs.writeFile('transformed.js', prettifiedCode, (err) => {
  if (error) {
    throw new Error(`addToReducerIndex.js write error: ${err}`)
  } else {
    console.log('file was written successfully')
  }
});

