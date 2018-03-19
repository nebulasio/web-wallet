/**
 * Created by automacair on 1/15/18.
 */
var Account = require('wallet').Account;
var Neb = require('wallet').Neb;
var neb = new Neb();
neb.setRequest(new Neb.HttpRequest("https://testnet.nebulas.io"));
var Transaction = require('wallet').Transaction;

//var from = "1a263547d167c74cf4b8f9166cfa244de0481c514a45aa2c";
var from = "333cb3ed8c417971845382ede3cf67a0a96270c05fe2f700";
var to = "333cb3ed8c417971845382ede3cf67a0a96270c05fe2f700";
var allAccounts = neb.api.accounts();
//var from = allAccounts[0];
//var to = allAccounts[1];
var value = "100000";
var nonce = 1;
var gasPrice = "1000000";
var gasLimit = "2000000";
var password = "passphrase";
var contract = {
    "source": "demo playground",
    "sourceType": "js",
    "args": "[\"0\",\"otto\"]"
};
var generatedAddressArray = [];
var generatedTxhash = [];
var generatedContractAddress = [];
var generatedPublicKey = [];
var generatedPrivateKey = [];
var generatedAccountStateBalance = [];

var account, state, tx, txhash;





//------------ Generate Account ---------

function createNewAccountFuncWeb() {

    account = Account.NewAccount();

    document.getElementById("message").innerHTML = "<textarea>" + account.getAddressString() + "</textarea>" + "<br>" + "<h5>" + "This is your new generated account address"+ "</h5>";

    console.log(account.getAddressString());
    console.log(account.getPrivateKeyString());
    console.log(account.getPublicKeyString());
}

//------------ Account balance ------------

function getAccountStateFuncWeb() {

    document.getElementById("message").innerHTML = "<h5>" + "Your Balance: " + state.balance + "</h5>" + "<h6>" + "nonce " + state.nonce + "</h6>";

    console.log(state.balance);
    console.log(state.nonce);
}


//--------- Generate txHash ------------

function generateTransaction() {
    var testnetchainID = 1001;
    tx = new Transaction(testnetchainID, account, account, neb.nasToBasic("1"), parseInt(state.nonce)+1);

    tx.signTransaction();
//txArray.push(tx);

    // ----------Note: You have to sign the transaction before displaying it:
    document.getElementById("message").innerHTML = "<textarea>" + tx.toString() + "</textarea>" + "<h6>" + "You just created a txHash and signed the transaction "+ "</h6>";

    console.log(tx.toString());
    console.log(tx.toProtoString());
}


function submitTransaction() {
    var resp = neb.api.sendRawTransaction(tx.toProtoString());
    txhash = resp.txhash;

    document.getElementById('message').innerHTML = "<textarea>" + txhash + "</textarea>" + "<h6>" + "You just created a txHash and signed the transaction "+ "</h6>";
}


function receiptTransaction() {
    neb.api.getTransactionReceipt(txhash, function (err, resp) {

        document.getElementById('message').innerHTML = "<textarea>" + JSON.stringify(resp) + "</textarea>" + "<h6>" + "Here's your receipt "+ "</h6>";
    });
}
