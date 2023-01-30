export const  Token ={
    BooleanLiteral : 1,
    EOF:'EOF',
    Identifier:'Identifier',
    Keyword:'Keyword',
    NullLiteral:'NullLiteral',
    NumericLiteral:'NumericLiteral',
    Punctuator:"Punctuator",
    StringLiteral:'StringLiteral',
    RegularExpression:'RegularExpression',
    Template:'Template'
}

export const TokenName = {};
TokenName[Token.BooleanLiteral] = 'Boolean';
TokenName[Token.EOF] = '<end>';
TokenName[Token.Identifier] = 'Identifier';
TokenName[Token.Keyword] = 'Keyword';
TokenName[Token.NullLiteral] = 'Null';
TokenName[Token.NumericLiteral] = 'Numeric';
TokenName[Token.Punctuator] = 'Punctuator';//符号
TokenName[Token.StringLiteral] = 'String';
TokenName[Token.RegularExpression] = 'RegularExpression';
TokenName[Token.Template] = 'Template';//模板字符串 `{}`
