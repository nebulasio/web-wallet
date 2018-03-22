var Account = require('wallet').Account;
var Neb = require('wallet').Neb;
var neb = new Neb();
neb.setRequest(new Neb.HttpRequest("https://testnet.nebulas.io"));
var Transaction = require('wallet').Transaction;
var value = "100000";
var nonce = 1;
var gasPrice = "1000000";
var gasLimit = "2000000";

var from, to, account, tx, txhash;
var userCode = document.getElementById("code").value;
var contractJson = {
    "source": userCode,
    "sourceType": "js",
    "args": "[0]"
};





function apiCall() {

    account = Account.NewAccount();
    from = "6ae5991ea26be1ee2f846e24cae105ad802b4927e71473ba";
    to = "6ae5991ea26be1ee2f846e24cae105ad802b4927e71473ba";

    var result = neb.api.call(from, to, value, nonce = nonce + 1, gasPrice, gasLimit, contractJson);

    if (result.result === "undefined") {
        document.getElementById("result").innerHTML = "<h1>" + "Successful" + "</h1>";

    }else{
        document.getElementById("result").innerHTML = "<h1>" + "not Successful" + "</h1>";
    }
}


function generateTransaction() {
    var testnetchainID = 1001;
    account = Account.NewAccount();

    try {

        tx = new Transaction(testnetchainID, account, account, value, nonce = nonce + 1, gasPrice, gasLimit, contractJson);

    }catch (Error){

        tx = new Transaction(testnetchainID, account, account, value, nonce = nonce + 1, gasPrice, gasLimit);
    }

    tx.signTransaction();

    console.log(tx.toString());
    console.log(tx.toProtoString());

    submitTransaction()
}


function submitTransaction() {
    var resp = neb.api.sendRawTransaction(tx.toProtoString());
    txhash = resp.txhash;
}

