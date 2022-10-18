//import { Token } from './token';

//判断标识符开头
export const isIdentifierStart =(cp)=> {
    return (cp === '$')||(cp === '_')||
      ( /[a-zA-Z_]/.test(cp) )
}


export const isNumeric = (cp)=>{
    return ( /[0-9]/.test(cp) )
}


//区分Identifier和keyword
export const scanIdentifier=(id) =>{
    console.log('------------scanIdentifier-----',id)
    let type
    
    if (id.length === 1) {
        type = 'Identifier';
    } else if (isKeyword(id)) {
        type = 'Keyword';
    } else if (id === 'null') {
        type = 'NullLiteral';
    } else if (id === 'true' || id === 'false') {
        type = 'BooleanLiteral';
    } else {
        type = 'Identifier';
    }


    return type
}

function isKeyword(id) {
    switch (id.length) {
        case 2:
            return (id === 'if') || (id === 'in') || (id === 'do');
        case 3:
            return (id === 'var') || (id === 'for') || (id === 'new') ||
                (id === 'try') || (id === 'let');
        case 4:
            return (id === 'this') || (id === 'else') || (id === 'case') ||
                (id === 'void') || (id === 'with') || (id === 'enum');
        case 5:
            return (id === 'while') || (id === 'break') || (id === 'catch') ||
                (id === 'throw') || (id === 'const') || (id === 'yield') ||
                (id === 'class') || (id === 'super');
        case 6:
            return (id === 'return') || (id === 'typeof') || (id === 'delete') ||
                (id === 'switch') || (id === 'export') || (id === 'import');
        case 7:
            return (id === 'default') || (id === 'finally') || (id === 'extends');
        case 8:
            return (id === 'function') || (id === 'continue') || (id === 'debugger');
        case 10:
            return (id === 'instanceof');
        default:
            return false;
    }
}

//判断是否操作符
export const checkisPunctuator =(str)=>{
    console.log('--------checkisPunctuator',str)
    // let c_1 = str.indexOf('<>=!+-*%&|^/{}().?;,~[]')
    // console.log(c_1) |%|&|\||\^|\/|{|}|(|)|\.|\?|\;|\,|~|\[|\]|
    // return c_1 > -1

let c_2 = /<|>|=|\+|-|!|\*|\%|\&|\||\^|\/|\{|\}|\(|\)|\.|\?|\;|\,|\~|\[|\]/.test(str)
    // console.log(c_2)
    return c_2
}

//区分操作符
export const scanPunctuator =(start,source) =>{
    console.log('------scanPunctuator',start,source)
   // return

 let str = source[start];
 
    
    switch (str) {
        case '(':
        case '{':
            if (str === '{') {
                this.curlyStack.push('{');
            }
            ++start;
            break;

        case '.':
            ++start;
            if (source[start] === '.' && source[start + 1] === '.') {
                // Spread operator: ...
                start += 2;
                str = '...';
            }
            break;

        case '}':
            ++start;
            this.curlyStack.pop();
            break;

        case '?':
            ++start;
            if (source[start] === '?') {
                ++start;
                str = '??';
            } if (source[start] === '.' && !/^\d$/.test(source[start + 1])) {
                // "?." in "foo?.3:0" should not be treated as optional chaining.
                // See https://github.com/tc39/proposal-optional-chaining#notes
                ++start;
                str = '?.';
            }
            break;

        case ')':
        case ';':
        case ',':
        case '[':
        case ']':
        case ':':
        case '~':
            ++start;
            break;

        default:
            // 4-character punctuator.
            str = source.substr(start, 4);
          //  console.log('------4-----',str)
            if (str === '>>>=') {
                start += 4;
            } else {

                // 3-character punctuators.
                str = str.substr(0, 3);
                if (str === '===' || str === '!==' || str === '>>>' ||
                    str === '<<=' || str === '>>=' || str === '**=') {
                    start += 3;
                } else {

                    // 2-character punctuators.
                    str = str.substr(0, 2);
                    //console.log('------2-----',str)
                    if (str === '&&' || str === '||' || str === '??' ||
                        str === '==' || str === '!=' ||
                        str === '+=' || str === '-=' || str === '*=' || str === '/=' ||
                        str === '++' || str === '--' ||
                        str === '<<' || str === '>>' ||
                        str === '&=' || str === '|=' || str === '^=' || str === '%=' ||
                        str === '<=' || str === '>=' || str === '=>' ||
                        str === '**') {
                        start += 2;
                    } else {

                        // 1-character punctuators.
                        str = source[start];
                        if ('<>=!+-*%&|^/'.indexOf(str) >= 0) {
                            ++start;
                        }
                    }
                }
            }
    }
 
    let c_1= {
        value:str,
        endindex:start,
    }
    console.log(c_1)
    return c_1
}
