
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("tipForm");
    const billTotal = document.getElementById("billTotal");
    const tipPercentage = document.getElementById("tipPercentage");
    const tipAmount = document.getElementById("tipAmount");
    const totalWithTip = document.getElementById("totalWithTip");
    const tipRange = document.getElementById("tipRange");

    form.addEventListener("input", function () {
        const bill = parseFloat(billTotal.value);
        const tip = parseInt(tipRange.value);
        const tipValue = (bill * tip) / 100;
        const total = bill + tipValue;

        if (!isNaN(bill)) {
            tipPercentage.value = tip + "%";
            tipAmount.value = tipValue.toFixed(2);
            totalWithTip.value = total.toFixed(2);
        } else {
            // Handle invalid input (non-number in billTotal)
            // You can display an error message to the user here.
        }
    });

    // Initialize the tip slider value
    tipRange.value = 0;
});

