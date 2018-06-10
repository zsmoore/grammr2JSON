let removeAllSyms = (sym, removeList) => {
    removeList.forEach(toRemove => {sym = sym.replace(new RegExp(toRemove, 'g'), '')});
    return sym;
}

export function parseArrow(input) {    
    let out = {};
    input = input.trim();
    let newLine = input.split(/\n+/g);
    newLine = newLine[0].indexOf('→') > 0 ? newLine.map(rule => rule.split('→'))
        : newLine.map(rule => rule.split('->'));
    newLine.forEach(rule => {
        let ruleName = rule[0];
        ruleName = ruleName.trim();
        let rest = rule[1].trim().split(/\ +/).map(word => word.trim());        
        if (out.hasOwnProperty(ruleName)) {
            out[ruleName].push(rest);
        } else {
            out[ruleName] = [rest];
        }
    });
    return out;
}

export function parseFormalBNF(input, multiline) {
    let out = {};
    input = input.trim();
    let productions = multiline ? input.split(/\n\n+/g) : input.split('\n');
    productions = productions.map(prod => prod.split('::='));
    productions.forEach(prod => {
        let ruleName = prod[0];
        ruleName = ruleName.trim();
        ruleName = removeAllSyms(ruleName, ['<', '>']);
        let rest = prod[1].split('|');
        let badSymbols = ['<', '>', '"'];        
        rest = rest.map(toChange => removeAllSyms(toChange, badSymbols));
        rest = rest.map(word => word.trim().split(/\ +/).map(inner => inner.trim()));
        out[ruleName] = rest;        
    });
    return out;
}

export function parseInformalBNF(input, multiline) {
    let out = {};
    input = input.trim();
    let productions = multiline ? input.split(/\n\n+/g) : input.split('\n');
    productions = productions.map(prod => prod.split('::='));
    productions.forEach(prod => {
        let ruleName = prod[0];
        ruleName = ruleName.trim();    
        let rest = prod[1].split('|');               
        rest = rest.map(word => word.trim().split(/\ +/).map(inner => inner.trim()));
        out[ruleName] = rest;        
    });
    return out;
}
