function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    return (calc = (expr) => {
        let prevExpr = "";
        while(isNaN(expr) && prevExpr != expr){
            expr = expr.replace(/--/g, "");
            prevExpr = expr;
            let bracketsExpr = expr.match(/\(([-\de\.]+[-+*/])+[-\de\.]+\)/g);
            if (bracketsExpr && bracketsExpr.length > 0){
                bracketsExpr.forEach(x => {
                    expr = expr.replace(x, calc(x.slice(1, x.length - 1).trim()));
                });
            }
            else{
                if (expr.search(/[()]/) > -1) throw new Error("ExpressionError: Brackets must be paired");
                let divExpr = expr.match(/[-\de\.]+[/\*][-\de\.]+/);
                if (divExpr && divExpr.length > 0){
                    divExpr.forEach(x => {
                        if (x.includes('*')){
                            let ops = x.split('*').map(y => parseFloat(y));
                            expr = expr.replace(x, (ops[0]*ops[1]).toString());        
                        }
                        else if (x.includes('/')){
                            let ops = x.split('/').map(y => parseFloat(y));
                            if (!ops[1]) throw new TypeError("TypeError: Division by zero.");
                            expr = expr.replace(x, (ops[0]/ops[1]).toString());        
                        }
                    });
                }
                else{
                    let sumExpr = expr.match(/[-\de\.]+\+[-\de\.]+/g);
                    if (sumExpr && sumExpr.length > 0){
                        sumExpr.forEach(x => {
                            let ops = x.split('+').map(y => parseFloat(y));
                            expr = expr.replace(x, (ops[0]+ops[1]).toString());
                        });
                    }
                }
            }
        }
        return parseFloat(expr);
    })(expr.replace(/ /g, "").replace(/-/g, "+-"));
}

module.exports = {
    expressionCalculator
}