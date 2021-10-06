// Global variables
const request = indexedDB.open("budget_tracker", 1);

let db;

// function stores all the upgrades pending and increments
request.onupgradeneeded = e => {
    db = e.target.result;
    db.createObjectStore("pending_transaction", { autoIncrement: true });
};
// function updates the transaction once connection is made
request.onsuccess = e => {
    db = e.target.result
    if (navigator.onLine) {
        updateTransactions();
    }
};
//  function created to log any errors
request.onerror = e => {
    console.log(e.target.errorCode);
};

// function for when the user is offline they can view all transactions that were stored once the user had no internet connection
function saveRecord(record) {
    const transaction = db.transaction(["pending_transaction"], "readwrite");
    const storedTransactions = transaction.objectStore("pending_transaction");
    storedTransactions.add(record);
};
