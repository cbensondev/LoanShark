//Controller
function getValue() {

    let loanObj = {};

    loanObj.loanAmount = parseFloat(document.getElementById("loanAmount").value);
    loanObj.loanTerm = parseInt(document.getElementById("loanTerm").value);
    loanObj.loanRate = parseFloat(document.getElementById("loanRate").value);

    amortizationGen(loanObj);
    displayResult(loanObj)

}

//Amortization Generator
function amortizationGen(loanObj) {
    
    loanObj.monthlyPayment = loanObj.loanAmount * (loanObj.loanRate / 1200) / (1 - Math.pow((1 + (loanObj.loanRate / 1200)),-loanObj.loanTerm));
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
function displayResult(loanObj) {

    document.getElementById("monthlyPaymentValue").innerText = formatCurrency(loanObj.monthlyPayment);
    document.getElementById("totalPrincipalValue").innerText = formatCurrency(loanObj.totalPrincipal);
    document.getElementById("totalInterestValue").innerText = formatCurrency(loanObj.totalInterest);
    let totalCost = loanObj.totalPrincipal + loanObj.totalInterest;
    document.getElementById("totalCostValue").innerText = formatCurrency(totalCost);
    document.getElementById("totalCostValue").classList.add("bold");

    document.getElementById("amorTable").innerHTML = "";
    let resultsTable = document.getElementById("amorTable");
    
    loanObj.amortizationTable.forEach(record => {
        let tableRow = resultsTable.insertRow(-1);
        let cell1 = tableRow.insertCell(0);
        cell1.innerHTML = record.currentMonth;
        let cell2 = tableRow.insertCell(1);
        cell2.innerHTML = formatCurrency(loanObj.monthlyPayment);
        let cell3 = tableRow.insertCell(2);
        cell3.innerHTML = formatCurrency(record.principalPayment);
        let cell4 = tableRow.insertCell(3);
        cell4.innerHTML = formatCurrency(record.interestPayment);
        let cell5 = tableRow.insertCell(4);
        cell5.innerHTML = formatCurrency(record.totalInterest);
        let cell6 = tableRow.insertCell(5);
        cell6.innerHTML = formatCurrency(record.remainingBalance);
    });

}

function formatCurrency(amount) {

    let newAmount = amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    newAmount = "$" + newAmount;
    return newAmount;
}


//Total Monthly Payment = (amount loaned) * (rate/1200) / (1 – (1 + rate/1200)(-Number of Months) )
//Remaining Balance before the very first month equals the amount of the loan.
//Interest Payment = Previous Remaining Balance * rate/1200
//Principal Payment = Total Monthly Payment - Interest Payment
//At end each month, Remaining Balance = Previous Remaining Balance - principal payments

//https://dinerojs.com/