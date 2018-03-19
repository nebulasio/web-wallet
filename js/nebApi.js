/**
 * Created by automacair on 1/15/18.
 */
var Account = require('wallet').Account;
var Neb = require('wallet').Neb;
var neb = new Neb();
neb.setRequest(new Neb.HttpRequest("https://testnet.nebulas.io"));
var Transaction = require('wallet').Transaction;




function sumit() {
    from =3453453452
    to = 5345634563456
    value

    neb.api.call()



    neb.setRequest(new Neb.HttpRequest("https://testnet.nebulas.io"));
}








//var from = "1a263547d167c74cf4b8f9166cfa244de0481c514a45aa2c";
//var from = "333cb3ed8c417971845382ede3cf67a0a96270c05fe2f700";
//var to = "333cb3ed8c417971845382ede3cf67a0a96270c05fe2f700";
var value = "100000";
var nonce = 1;
var gasPrice = "1000000";
var gasLimit = "2000000";
var password = "passphrase";
var generatedAddressArray = [];
var generatedTxhash = [];
var generatedContractAddress = [];
var generatedPublicKey = [];
var generatedPrivateKey = [];
var generatedAccountStateBalance = [];

var account, state, tx, txhash;
var txArray = [];

//----------------   Remote Procedure Calls (RPCs)--------



//------------------------  Management RPC -------------------




//------------------------  Web generated  -------------------

//------------ Generate Account ---------

function createNewAccountFuncWeb() {

    account = Account.NewAccount();

    document.getElementById("message").innerHTML = "<textarea>" + account.getAddressString() + "</textarea>" + "<br>" + "<h5>" + "This is your new generated account address"+ "</h5>";

    console.log(account.getAddressString());
    console.log(account.getPrivateKeyString());
    console.log(account.getPublicKeyString());
}


// --------------- Claim Nas ----------------

function claimNas() {
    var email = Math.random() + "test@demo.io";
    var url = "https://testnet.nebulas.io/claim/api/claim/"+ email+ "/"+ account.getAddressString() +"/";
    var request = new window.XMLHttpRequest();
    request.open("GET", url, false);
    request.send();
    result = JSON.parse(request.responseText);

    document.getElementById("message").innerHTML = "<h3>" + "please wait " + "</h3>" + "<i class='material-icons'>access_time</i>" + "<h5>"+ "Getting you tokens Now" + "</h5>";

    setTimeout(function () {
       state = neb.api.getAccountState(account.getAddressString());
        generatedAccountStateBalance.push(state);

        document.getElementById("message").innerHTML = "<h5>" + "Your Tokens have been received" +  "</h5>" + "<h6>" + " Great Job! " + "</h6>";
        console.log(state.balance);
        console.log(state.nonce);
    }, 5000);
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


function accountTest() {
    var account = Account.NewAccount();
    console.log(account.getPrivateKeyString());
    console.log(account.getPublicKeyString());
    console.log(account.getAddressString());
}




//todo get account state
// todo: seperate Neb from Web






//-------------------  Neb generated Information here -----


function createNewAccountFuncNeb() {

    var account = neb.api.NewAccount();
    var account = account.getAddressString();
    generatedAddressArray.push(account);

    document.getElementById("message").innerHTML = "<textarea>" + generatedAddressArray[0] + "</textarea>" + "<br>" + "<h5>" + "This is your new generated account address"+ "</h5>";
    console.log(generatedAddressArray[0]);

}

function getAccountStateFuncNeb() {
    var accountState = neb.api.getAccountState(generatedAddressArray[0]);
    console.log(JSON.stringify(accountState));

    document.getElementById("message").innerHTML = "<textarea>" + "Balance: " + accountState.balance + " nouce " + accountState.nonce + "</textarea>" + "<br>" + "<h5>" + "As you can see the balance is: '0' "+ "in our newly created account" +"</h5>"

    //todo: create a if statement if the balance is 0 display you have 0 but if balance is > than 0 display you have this much balance
}

function unlockAccountFuncNeb() {
    //curl -i -H Accept:application/json -X POST http://localhost:8685/v1/account/unlock -d '{"address":"8a209cec02cbeab7e2f74ad969d2dfe8dd24416aa65589bf", "passphrase":"passphrase"}'

    var unlockTheAccount = neb.admin.unlockAccount(generatedAddressArray[0], password);
    console.log(JSON.stringify(unlockTheAccount));

    var unlockTheAccount2 = neb.admin.unlockAccount(from, password);
    console.log(JSON.stringify(unlockTheAccount2));

    document.getElementById("message").innerHTML = "<h3>" + "Unlocked "+ "</h3>" + "<br>" + "<h5>" + "Great you just unlocked your account"+ "</h5>"

}


function transactionFuncNeb() {

    var contract = {
        "source": "demo playground",
        "sourceType": "js",
        "args": "[\"0\",\"otto\"]"
    };
    //var transaction = neb.api.sendTransaction(from, generatedAddressArray[0],value,nonce + 1,gasPrice,gasLimit,contract);

    var transaction = neb.api.sendTransaction(from, generatedAddressArray[0],value,nonce + 1, gasPrice, gasLimit);
    console.log(JSON.stringify(transaction));

    generatedTxhash.push(transaction.txhash)
    generatedContractAddress.push(transaction.contract_address)

    console.log(generatedTxhash);
    console.log(generatedContractAddress);
}



function getTransactionReceiptFuncNeb() {
    var transactionReceipt = neb.api.getTransactionReceipt(generatedTxhash[0]);
    console.log(generatedTxhash[0]);

    console.log(JSON.stringify(transactionReceipt));

}




function nebState() {

    var nebulasState = neb.api.getNebState();
    console.log(JSON.stringify(nebulasState))
    //document.getElementById("output").innerHTML = JSON.stringify(nebulasState)
}
//nebState()

function nodeInfomation() {
    var nodeinfoApi = neb.api.nodeInfo()
    console.log(JSON.stringify(nodeinfoApi))
}

function blockDumpFunc() {
    var accountState = neb.api.blockDump(1);
    console.log(JSON.stringify(accountState));
}


function accountsFunc() {

    var accounts = neb.api.accounts();
    console.log(JSON.stringify(accounts));
}







function gasPriceFunc() {

    var theGasPrices = neb.api.gasPrice();
    console.log(JSON.stringify(theGasPrices));
}







function accounts() {
    //var Neb = require('neb')
    //var neb = new Neb();
    var accounts = neb.api.accounts();

    console.log(JSON.stringify(accounts));
}
//accounts()


















function sendTransaction() {
    //var from = "1a263547d167c74cf4b8f9166cfa244de0481c514a45aa2c";
    //var to = "333cb3ed8c417971845382ede3cf67a0a96270c05fe2f700";
    //var value = "100000";

    var allAccounts = neb.api.accounts();
    from = allAccounts[0];
    to = allAccounts[1];
    var state = neb.api.getAccountState(from);
    var contract = {
        "source": "demo playground",
        "sourceType": "js",
        "args": "[\"0\",\"otto\"]"
    };
    var resp = neb.api.estimateGas(from, to, value, parseInt(state.nonce +1),"0", "0", contract);
    console.log(JSON.stringify(resp));
}


function estimateTheGasPrice() {
    var estimatedGasPrice = neb.api.estimateGas(from,to,value,nonce,gasPrice,gasLimit)
    console.log(JSON.stringify(estimatedGasPrice));


}























