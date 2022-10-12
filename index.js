import { Scanner } from "./tokenize";
const path  = require('path');
let js_path = path.join(__dirname,'testdemo.js');
const fs  = require('fs');

let js_conent = fs.readFileSync(js_path)
console.log(js_conent.toString())


 const lexer = new Scanner();
 let c_1 = lexer.tokenize(js_conent.toString());
 console.log(c_1);