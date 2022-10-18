import { TokenReader } from "./tokenreader";
import { isIdentifierStart, scanIdentifier, 
  isNumeric,checkisPunctuator,scanPunctuator
} from "./utils_token.js";

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

    this.tokenReader = null
  }

  tokenize(code) {
    this.middleValue = "";

    this.tokenReader = new TokenReader(code.split(/\r\n/));//分割换行
    console.log(this.tokenReader)  //charAt
    
    
   

   // let ch = null;
    let last_state = "Initial"; //上一个字符的状态

    while (  this.lineNumber < this.tokenReader.strlist.length   ) {
        let ch = this.tokenReader.readNext(this.lineNumber)
        console.log('\n')
        console.log('----ch---',ch)
       
      
        if(ch == '/r/n'){
            this.lineNumber += 1
            this.lineIndex = 0;
            last_state =  this.lexToken(null,'isend')
            continue
        }


      switch (last_state) {
        case "Initial":
          //console.log("------------Initial-------", ch);
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

  lexToken(param,type) {
    console.log('-------lexToken----',param)

    if(type =='isend'){
       if(this.middleValue.length > 0){
        this.token.value = this.middleValue ;
        if(this.token.type === 'Id'){
          this.token.type = scanIdentifier(this.token.value)
        }
        this.token.column  = this.tokenReader.the_index-2
        this.tokenList.push(this.token);


       }

       this.middleValue = "";
       this.token = {
         type: '',
         value: null,
         line: this.lineNumber ,
         column:0,
       };

       newState = "Initial";
       return newState;

    }

    if (this.middleValue.length > 0) {
      this.token.value = this.middleValue;

      if(this.token.type === 'Id'){
        this.token.type = scanIdentifier(this.token.value)
      }
      this.token.column  = this.tokenReader.the_index-2

      //console.log('-----this.tokenList.push---',this.token.value,this.middleValue,this.middleValue.length)
      this.tokenList.push(this.token);
      

      this.middleValue = "";
      this.token = {
        type: '',
        value: null,
        line: this.lineNumber,
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
    if ( checkisPunctuator(param) ) { //符号开头
        console.log('----------is =----------',param)
      newState = "Punctuator";
      this.token.type = "Punctuator";

      let c_1 =  scanPunctuator(this.tokenReader.the_index -1,this.tokenReader.strlist[this.lineNumber] )
      this.token.value = c_1.value
      this.tokenReader.jumpToPosition(c_1.endindex)
      this.token.column  = c_1.endindex -1
      this.tokenList.push(this.token);

      this.resetToken()
      newState = "Initial";
      return newState;
    }
    if(param == ' '){//检测空格
      newState = "Initial";
      return newState;
    }


    // this.appendmiddleValue(param);
    // return newState;

   
  }






  appendmiddleValue(param) {
    this.middleValue = this.middleValue + param;
  }

  resetToken(){
    this.middleValue = "";
    this.token = {
      type: '',
      value: null,
      line: this.lineNumber ,
      column:0,
    };
  }


}


