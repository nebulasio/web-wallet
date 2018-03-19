

var js_editor = CodeMirror(document.getElementById("js"), {
    value: "function test() { \n\talert('Hello Blockchain World');\n\t \n}" + "\n\t \n"+"test()\n\n",
    mode: "javascript",
    theme: "dracula",
    lineNumbers: true,
    lineWrapping: true,
    firstLineNumber: 1
});




function runJavascript() {

    js_editor.on(render())
}




    function render() {

        var js = js_editor.getValue();

        js = '<script>' + js + '<\/script>';

        var iframe = document.getElementById('output');
        var iframeDoc = iframe.contentDocument;

        iframeDoc.open();
        iframeDoc.write(js);
        iframeDoc.close();
    }


function submit() {
    var from = "9694551ecd4cc42bbd9dadb732a534aa8ef56a51c9653aee";
    var to = "9694551ecd4cc42bbd9dadb732a534aa8ef56a51c9653aee";
    var value = "0";
    var nonce = 0;
    var gasPrice, gasLimit;

    gasPrice = "1000000";
    gasLimit = "2000000";


    var editorText = js_editor.getValue()
    console.log(editorText);
    var testnetchainID = 1001;
// console.log("erc20:"+erc20);


    var contract = {
        "source": editorText,
        "sourceType": "js"
    }

   // testnetchainID, account, toAddress, value, nonce = nonce + 1, gasPrice, gasLimit

    var result = neb.api.call(from, to, value, 1, gasPrice, gasLimit, contract);

    console.log(result);

}
    
    

    //---------- getBalance shows js code to get balance
    function getBalance() {

        neb.api.getAccountState()
    //------- setValue will add text to the editor
       // js_editor.setValue(js_editor.getValue()+" balance " + "current value ")
    }



    
    
    
    
    
    function exampleContract1() {

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

// save value to contract, only after height of block, users can takeout
BankVaultContract.prototype = {
    init: function () {
        //TODO:
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
        // 1-valid, 0-invalid
        var result = Blockchain.verifyAddress(address);
        return {valid: result == 0 ? false : true};
    }
};

module.exports = BankVaultContract;
`;


        js_editor.setValue(contract1)


    }










