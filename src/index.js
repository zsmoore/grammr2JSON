let removeWhiteSpace = sym => sym.replace(/\s/g, '');
let removeSym = (sym, toRemove) => sym.replace(toRemove, '');
let removeAllSyms = (sym, removeList) => {
    removeList.forEach(toRemove => {sym = sym.replace(new RegExp(toRemove, 'g'), '')});
    return sym;
}

function parseArrow(input) {    
    let out = {};
    input = input.trim();
    let newLine = input.split('\n');
    newLine = newLine.map(rule => rule.split('→'));
    newLine.forEach(rule => {
        let ruleName = rule[0];
        let rest = rule[1].split(/ +/).map(word => word.trim());        
        if (out.hasOwnProperty(ruleName)) {
            out[ruleName].push(rest);
        } else {
            out[ruleName] = [rest];
        }
    });
    return out;
}

let testArrow = `expr→term +            expr
expr→term
term→term ∗    factor
term→factor
factor→( expr )
factor→const
const→integer`;

//console.log(parseArrow(testArrow));

// Must be seaparated by 2 new lines
function parseBNF(input, multiline) {
    let out = {};
    input = input.trim();
    let productions = multiline ? input.split(/\n\n+/g) : input.split('\n');
    productions = productions.map(prod => prod.split('::='));
    productions.forEach(prod => {
        let ruleName = prod[0];
        ruleName = removeAllSyms(ruleName, ['<', '>']);
        let rest = prod[1].split('|');
        let badSymbols = ['<', '>', '"'];        
        rest = rest.map(toChange => removeAllSyms(toChange, badSymbols));
        rest = rest.map(word => word.trim().split(/ +/).map(inner => inner.trim()));
        out[ruleName] = rest;        
    });
    return out;
}

let testBNF = `   <coursecode>   ::= <acadunit> <coursenumber>
<acadunit>     ::= <letter> <letter> <letter>
<coursenumber> ::= <year> <semesters> <digit> <digit>
<year>         ::= <ugrad> | <grad>
<ugrad>        ::= 0 | 1 | 2 | 3 | 4
<grad>         ::= 5 | 6 | 7 | 9
<semesters>    ::= <onesemester> | <twosemesters>
<onesemester>  ::= <frenchone> | <englishone> | <bilingual>
<frenchone>    ::= 5 | 7
<englishone>   ::= 1 | 3
<bilingual>    ::= 9
<twosemesters> ::= <frenchtwo> | <englishtwo>
<frenchtwo>    ::= 6 | 8
<englishtwo>   ::= 2 | 4
<digit>        ::= 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9`;

let testBNF2 =  `<expr> ::= <term> "+" <expr>
|  <term>




<term> ::= <factor> "*" <term>
|  <factor>

<factor> ::= "(" <expr> ")"
  |  <const>

<const> ::= integer`;


//console.log(parseBNF(testBNF, false));
console.log(parseBNF(testBNF2, true));