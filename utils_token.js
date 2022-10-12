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
export const scanPunctuator =(str) =>{
    
    switch (str) {
        case '(':
        case '{':
            if (str === '{') {
                this.curlyStack.push('{');
            }
            ++this.index;
            break;

        case '.':
            ++this.index;
            if (this.source[this.index] === '.' && this.source[this.index + 1] === '.') {
                // Spread operator: ...
                this.index += 2;
                str = '...';
            }
            break;

        case '}':
            ++this.index;
            this.curlyStack.pop();
            break;

        case '?':
            ++this.index;
            if (this.source[this.index] === '?') {
                ++this.index;
                str = '??';
            } if (this.source[this.index] === '.' && !/^\d$/.test(this.source[this.index + 1])) {
                // "?." in "foo?.3:0" should not be treated as optional chaining.
                // See https://github.com/tc39/proposal-optional-chaining#notes
                ++this.index;
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
            ++this.index;
            break;

        default:
            // 4-character punctuator.
            str = this.source.substring(this.index, 4);
            if (str === '>>>=') {
                this.index += 4;
            } else {

                // 3-character punctuators.
                str = str.substring(0, 3);
                if (str === '===' || str === '!==' || str === '>>>' ||
                    str === '<<=' || str === '>>=' || str === '**=') {
                    this.index += 3;
                } else {

                    // 2-character punctuators.
                    str = str.substring(0, 2);
                    if (str === '&&' || str === '||' || str === '??' ||
                        str === '==' || str === '!=' ||
                        str === '+=' || str === '-=' || str === '*=' || str === '/=' ||
                        str === '++' || str === '--' ||
                        str === '<<' || str === '>>' ||
                        str === '&=' || str === '|=' || str === '^=' || str === '%=' ||
                        str === '<=' || str === '>=' || str === '=>' ||
                        str === '**') {
                        this.index += 2;
                    } else {

                        // 1-character punctuators.
                        str = this.source[this.index];
                        if ('<>=!+-*%&|^/'.indexOf(str) >= 0) {
                            ++this.index;
                        }
                    }
                }
            }
    }

    if (this.index === start) {
        this.throwUnexpectedToken();
    }

    return {
        type: Token.Punctuator,
        value: str,
        lineNumber: this.lineNumber,
        lineStart: this.lineStart,
        start: start,
        end: this.index
    };
}
