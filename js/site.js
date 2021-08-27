//Controller
function GetValue() {

    let loanObj = {};

    loanObj.loanAmount = parseFloat(document.getElementById("loanAmount").value);
    loanObj.loanTerm = parseInt(document.getElementById("loanTerm").value);
    loanObj.loanRate = parseFloat(document.getElementById("loanRate").value);

    AmortizationGen(loanObj);

}

//Amortization Generator
function AmortizationGen(loanObj) {
    
    loanObj.monthlyPayment = loanObj.loanAmount * (loanObj.loanRate / 1200) / (1 - (1 + (loanObj.loanRate / 1200)) - loanObj.loanTerm);
    loanObj.totalPrincipal = 0;
    loanObj.totalInterest = 0;
    loanObj.amortizationTable = [];

    let balance = loanObj.loanAmount;

    for (let i = 1; i <= loanObj.loanTerm; i++) {
        loanInstance = {};
        loanInstance.currentMonth = i;
        loanInstance.interestPayment = balance * loanObj.loanRate/1200;
        loanInstance.principalPayment = loanObj.monthlyPayment - loanInstance.interestPayment;
        balance = balance - loanInstance.principalPayment;
        loanInstance.remainingBalance = balance;

        loanObj.totalPrincipal = loanObj.totalPrincipal + loanInstance.principalPayment;
        loanObj.totalInterest = loanObj.totalInterest + loanInstance.interestPayment;

        loanInstance.totalInterest = loanObj.totalInterest;

        loanObj.amortizationTable.push(loanInstance);
    }

    return loanObj;
}

//Display results
function DisplayResults() {

}


//Total Monthly Payment = (amount loaned) * (rate/1200) / (1 – (1 + rate/1200)(-Number of Months) )
//Remaining Balance before the very first month equals the amount of the loan.
//Interest Payment = Previous Remaining Balance * rate/1200
//Principal Payment = Total Monthly Payment - Interest Payment
//At end each month, Remaining Balance = Previous Remaining Balance - principal payments

//https://dinerojs.com/