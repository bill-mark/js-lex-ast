export class TokenReader {
  constructor(strlist) {
    this.strlist = strlist;
    this.the_index = 0;
  }

  read(lineNumber) {
    //console.log(this.the_index,)
    if (this.the_index < this.strlist[lineNumber].length) {
      return this.strlist[lineNumber].charAt(this.the_index++);
    }
    if(this.the_index == this.strlist[lineNumber].length){
      this.the_index = 0
      return '/r/n'
    }
  }

  peekNext(num = 1) {
    if (this.the_index < this.strlist.length && (this.the_index+num)< this.strlist.length) {
      return this.strlist.substring(this.the_index,num);
    }
    return null;
  }

  unread() {
    if (this.the_index > 0) {
      this.the_index--;
    }
  }

  getPosition() {
    return this.the_index;
  }

  jumpPosition(num){
    this.the_index += num
  }
}
