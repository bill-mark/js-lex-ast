import { TokenReader } from "./tokenreader";
import { isIdentifierStart, scanIdentifier, isNumeric,checkisPunctuator } from "./utils_token.js";

export class Scanner {
  constructor() {
    this.tokenList = [];
    this.middleValue = "";//暂存的中间值

    this.token = {
      type: null,
      value: null,
      line:0,
      column:0,//最后一位的行位置
    };
    this.readstate = null;

    this.lineNumber = 0;
    this.lineIndex = 0;
  }

  tokenize(code) {
    this.middleValue = "";

    const reader = new TokenReader(code.split(/\r\n/));//分割换行
    console.log(reader)  //charAt

    let ch = null;
    let last_state = "Initial"; //上一个字符的状态

    while ((ch = reader.read())) {
        console.log('\n')
        // if(ch == '\r'){
        //     if(reader.peekNext(1) == '\n'){
        //         this.lineNumber += 1
        //         this.lineIndex = 0;
        //         reader.jumpPosition(1)
        //     }  
        // }
        // if(ch == '\n'){
        //     this.lineNumber += 1
        //     this.lineIndex = 0;
        //}


      switch (last_state) {
        case "Initial":
          console.log("------------Initial-------", ch);
          last_state = this.lexToken(ch);
          break;
        case "Id":
          if (isIdentifierStart(ch) || isNumeric(ch)) {
            this.appendmiddleValue(ch);
          } else {
            last_state = this.lexToken(ch);
          }
          break;
        case "Punctuator":
            last_state = this.lexToken(ch);
            break;

      }
    }

    // if (this.middleValue.length > 0) {
    //   this.lexToken(ch);
    // }

    return new TokenReader(this.tokenList);
  }

  lexToken(param) {
    console.log('-------lexToken----',param)
    if (this.middleValue.length > 0) {
      this.token.value = this.middleValue;

      if(this.token.type === 'Id'){
        this.token.type = scanIdentifier(this.token.value)
      }
      
      this.tokenList.push(this.token);
      

      this.middleValue = "";
      this.token = {
        type: '',
        value: null,
        line:0,
        column:0,
      };
    }

    let newState = "Initial";

    //标识符开头
    if (isIdentifierStart(param)) {
      //console.log("标识符开头", param, isIdentifierStart(param));
     this.token.type = 'Id'
     newState = 'Id'
     this.appendmiddleValue(param);
     return newState;
    }
    if ( checkisPunctuator(param) ) {
        console.log('----------is =----------',param)
      newState = "Punctuator";
      this.token.type = "Punctuator";

      this.appendmiddleValue(param);
      return newState;
    }


    this.appendmiddleValue(param);
      return newState;

   
  }






  appendmiddleValue(param) {
    this.middleValue = this.middleValue + param;
  }
}


