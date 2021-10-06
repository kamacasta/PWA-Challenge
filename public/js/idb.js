// Global variables
const request = indexedDB.open("budget_tracker", 1);

let db;

// function stores all the upgrades pending and increments
request.onupgradeneeded = e => {
    db = e.target.result;
    db.createObjectStore("new_transaction_pending", { autoIncrement: true });
};
// function uploads the transaction once connection is made
request.onsuccess = e => {
    db = e.target.result
    if (navigator.onLine) {
        updloadTransactions();
    }
};
//  function created to log any errors
request.onerror = e => {
    console.log(e.target.errorCode);
};

// function for when the user is offline they can view all transactions that were stored once the user had no internet connection
function saveRecord(record) {
    const transaction = db.transaction(["new_transaction_pending"], "readwrite");
    const storedTransactions = transaction.objectStore("new_transaction_pending");
    storedTransactions.add(record);
};

// function updates all the transactions that were saved by the user
function updloadTransactions() {

// pulls the transaction from the database
const transaction = db.transaction(["new_transaction_pending"], "readwrite")

// variable created to access the stored object (transaction)
const transactionStored = transaction.objectStore("new_transaction_pending")
// variable created to grab all the records and by doing so will set them to a variable.
const getAll = transactionObjectStore.getAll()

}