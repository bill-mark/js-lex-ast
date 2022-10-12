import { Tokenizer } from './tokenizer';

export function tokenize(code) {
    const tokenizer = new Tokenizer(code);

    const tokens = [];
        while (true) {
            let token = tokenizer.getNextToken();
            if (!token) {
                break;
            }
            tokens.push(token);
        }
   

    return tokens;
}


let thestr = "int=45  ;";
let c_1 = tokenize(thestr)
console.log(c_1)
