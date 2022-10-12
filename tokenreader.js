export class TokenReader {
  constructor(strlist) {
    this.strlist = strlist;
    this.the_index = 0;
  }

  read() {
    if (this.the_index < this.strlist.length) {
      return this.strlist[this.the_index++];
    }
    return null;
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
