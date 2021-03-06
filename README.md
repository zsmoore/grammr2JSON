# grammr2JSON
Transforming Formal Grammars into JSON for use in https://github.com/zsmoore/grammr


# Docs:  

Currently very simple support for arrow defined grammar as well as BNF grammars.  

## Arrow ##  
Example Arrow Grammar:  
``` javascript
const arrowGram = `expr→term + expr  
expr→term  
term→term ∗ factor  
term→factor  
factor→ ( expr )  
factor→ const  
const→ integer`;
```
Sample Usage to parse this grammar:
``` javascript
let out = parseArrow(arrowGram);
```
Arrow can also parse rules that are using an arrow in the form of:  
`->`


## BNF ##
BNF can take 2 forms, rules on single line or multiline  
  
2 Forms of parsing Options:
FORMAL BNF
Example Single Line:  
```javascript
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
```
Sample Usage to parse single Line:  
```javascript
let out = parseFormalBNF(testBNF, false);
```
Example Multiline:
```javascript  
let testBNF2 =  `<expr> ::= <term> "+" <expr>
|  <term>

<term> ::= <factor> "*" <term>
|  <factor>

<factor> ::= "(" <expr> ")"
  |  <const>

<const> ::= integer`;
```

Sample Usage to parse Multiline
```javascript
let out = parseFormalBNF(testBNF2, true);
```  

Informal BNF  
This is an example using the JSON grammar  
```javascript  
const rawJsonGrammar = `object ::= { }
| { members }

members ::= pair
| pair , members

pair ::= string : value

array ::= []
| [ elements ]

elements ::= value
| value , elements

value ::= string
| number
| object
| array
| true
| false
| null

string ::= " "
| " chars "

chars ::=  char
| char chars

number ::= int
| int frac
| int exp
| int frac exp

int ::= digit
| digit1-9 digits
| - digit
| - digit1-9 digits

frac ::= . digits

exp ::= e digits

digits ::= digit
| digit digits`;
```

Sample usage:  
```javascript
let out = parseInformalBNF(rawJsonGrammar, true);
```  

# General Caveats  
 - Terms to the right of arrow/expandsto must be separated by spaced 
 
# Output format  
Output will be in the form of a JSON object with the key being the non-terminal id and the value being a list of lists each list representing a rule for the nonTerminal.

Example:  
```javascript
let out = let out = parseArrow(arrowGram);
console.log(out);
```
Results in:
```javascript
{
  'expr'  : [ ['term', '+', 'expr'],
              ['term'] ],
  'term'  : [ ['term', '*', 'factor'],
              ['factor'] ],
  'factor': [ ['(', 'factor', ')'],
              ['const'] ],
  'const' : [ ['interger' ] ]
}
```
