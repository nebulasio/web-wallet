var contract1 =  `"use strict";

var DepositeContent = function (text) {
    if (text) {
        var o = JSON.parse(text);
        this.balance = new BigNumber(o.balance);
        this.expiryHeight = new BigNumber(o.expiryHeight);
    } else {
        this.balance = new BigNumber(0);
        this.expiryHeight = new BigNumber(0);
    }
};

DepositeContent.prototype = {
    toString: function () {
        return JSON.stringify(this);
    }
};

var BankVaultContract = function () {
    LocalContractStorage.defineMapProperty(this, "bankVault", {
        parse: function (text) {
            return new DepositeContent(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
};

BankVaultContract.prototype = {
    init: function () {
      
    },

    save: function (height) {
        var from = Blockchain.transaction.from;
        var value = Blockchain.transaction.value;
        var bk_height = new BigNumber(Blockchain.block.height);

        var orig_deposit = this.bankVault.get(from);
        if (orig_deposit) {
            value = value.plus(orig_deposit.balance);
        }

        var deposit = new DepositeContent();
        deposit.balance = value;
        deposit.expiryHeight = bk_height.plus(height);

        this.bankVault.put(from, deposit);
    },

    takeout: function (value) {
        var from = Blockchain.transaction.from;
        var bk_height = new BigNumber(Blockchain.block.height);
        var amount = new BigNumber(value);

        var deposit = this.bankVault.get(from);
        if (!deposit) {
            throw new Error("No deposit before.");
        }

        if (bk_height.lt(deposit.expiryHeight)) {
            throw new Error("Can not takeout before expiryHeight.");
        }

        if (amount.gt(deposit.balance)) {
            throw new Error("Insufficient balance.");
        }

        var result = Blockchain.transfer(from, amount);
        if (result != 0) {
            throw new Error("transfer failed.");
        }
        Event.Trigger("BankVault", {
            Transfer: {
                from: Blockchain.transaction.to,
                to: from,
                value: amount.toString()
            }
        });

        deposit.balance = deposit.balance.sub(amount);
        this.bankVault.put(from, deposit);
    },

    balanceOf: function () {
        var from = Blockchain.transaction.from;
        return this.bankVault.get(from);
    },

    verifyAddress: function(address) {
        var result = Blockchain.verifyAddress(address);
        return {valid: result == 0 ? false : true};
    }
};

module.exports = BankVaultContract;
`;



var js_editor = CodeMirror(document.getElementById("js"), {
    value: contract1,
    mode: "javascript",
    theme: "dracula",
    lineNumbers: true,
    lineWrapping: true,
    firstLineNumber: 1
});


function submit() {
    var from = "9694551ecd4cc42bbd9dadb732a534aa8ef56a51c9653aee";
    var to = "9694551ecd4cc42bbd9dadb732a534aa8ef56a51c9653aee";
    var value = "100000";
    var nonce = 0;
    var gasPrice = "1000000";
    var gasLimit = "2000000";

    //var editorText = js_editor.getValue();
    //console.log(editorText);

    var contract = {
        "source": contract1,
        "sourceType": "js",
        "args": "[0]"
    };



    var result = neb.api.call(from, to, value, 1, gasPrice, gasLimit, contract);

    //alert("WARNING\n\n if this was a real contract it would cost gas");

    var user;
    if (confirm("WARNING\n\n if this was a real contract its would cost gas. Press ok to submit the contract")){
        user = "ok"
    }else{
        return
    }

    function myFunction() {
        var txt;
        if (confirm("Press a button!")) {
            txt = "You pressed OK!";
        } else {
            txt = "You pressed Cancel!";
        }
    }

    if (result.result === "undefined") {
document.getElementById("result").innerHTML = "<h1>" + "Successful" + "</h1>";

    }else{
        document.getElementById("result").innerHTML = "<h1>" + "not Successful" + "</h1>";
    }
}

function exampleContract1() {

    js_editor.setValue(contract1)

}

