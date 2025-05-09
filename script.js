let isBinaryToDecimal = true;
let history = [];

function toggleMode() {
    isBinaryToDecimal = !isBinaryToDecimal;
    document.getElementById('toggleBtn').textContent = isBinaryToDecimal ? 
        "Switch to Decimal to Binary" : "Switch to Binary to Decimal";
    document.getElementById('inputValue').placeholder = isBinaryToDecimal ? 
        "Enter a binary number" : "Enter a decimal number";
    document.getElementById('resultText').textContent = "-";
}

function validateBinary(input) {
    return /^[01]+$/.test(input);
}

function validateDecimal(input) {
    return /^\d+$/.test(input);
}

function convert() {
    const input = document.getElementById('inputValue').value.trim();

    if (isBinaryToDecimal) {
        if (!validateBinary(input)) {
            alert("Please enter a valid binary number.");
            return;
        }
        const decimal = parseInt(input, 2);
        updateResult(decimal);
        updateHistory(input + " (Binary) = " + decimal + " (Decimal)");
    } else {
        if (!validateDecimal(input)) {
            alert("Please enter a valid decimal number.");
            return;
        }
        const binary = parseInt(input).toString(2);
        updateResult(binary);
        updateHistory(input + " (Decimal) = " + binary + " (Binary)");
    }
}

function updateResult(result) {
    document.getElementById('resultText').textContent = result;
}

function updateHistory(entry) {
    history.unshift(entry);
    if (history.length > 5) history.pop();
    renderHistory();
}

function renderHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = "";
    history.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        historyList.appendChild(li);
    });
}

function clearHistory() {
    history = [];
    renderHistory();
}

function copyToClipboard() {
    const resultText = document.getElementById('resultText').textContent;
    if (resultText !== "-") {
        navigator.clipboard.writeText(resultText);
        alert("Copied to clipboard!");
    }
}
