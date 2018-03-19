var smartContract = "var DepositeContent = function (text) {" + "if (text) {\n" + "                let o = JSON.parse(text);\n" + "this.balance = new BigNumber(o.balance);\n" + "this.expiryHeight = new BigNumber(o.expiryHeight);\n" + "} else {\n" +
    "                this.balance = new BigNumber(0);\n" +
    "                this.expiryHeight = new BigNumber(0);\n" +
    "            }\n" +
    "        };\n" +
    "\n" +
    "        DepositeContent.prototype = {\n" +
    "            toString: function () {\n" +
    "                return JSON.stringify(this);\n" +
    "            }\n" +
    "        };\n" +
    "\n" +
    "        var BankVaultContract = function () {\n" +
    "            LocalContractStorage.defineMapProperty(this, \"bankVault\", {\n" +
    "                parse: function (text) {\n" +
    "                    return new DepositeContent(text);\n" +
    "                },\n" +
    "                stringify: function (o) {\n" +
    "                    return o.toString();\n" +
    "                }\n" +
    "            });\n" +
    "        };\n" +
    "\n" +
    "\n" +
    "        BankVaultContract.prototype = {\n" +
    "            init: function () {\n" +
    "            },\n" +
    "// save value to contract, only after height of block, users can modify\n" +
    "            save: function (height) {\n" +
    "                var from = Blockchain.transaction.from;\n" +
    "                var value = Blockchain.transaction.value;\n" +
    "                var bk_height = new BigNumber(Blockchain.block.height);\n" +
    "\n" +
    "                var orig_deposit = this.bankVault.get(from);\n" +
    "                if (orig_deposit) {\n" +
    "                    value = value.plus(orig_deposit.balance);\n" +
    "                }\n" +
    "\n" +
    "                var deposit = new DepositeContent();\n" +
    "                deposit.balance = value;\n" +
    "                deposit.expiryHeight = bk_height.plus(height);\n" +
    "\n" +
    "                this.bankVault.put(from, deposit);\n" +
    "            },\n" +
    "\n" +
    "            takeout: function (value) {\n" +
    "                var from = Blockchain.transaction.from;\n" +
    "                var bk_height = new BigNumber(Blockchain.block.height);\n" +
    "                var amount = new BigNumber(value);\n" +
    "\n" +
    "                var deposit = this.bankVault.get(from);\n" +
    "                if (!deposit) {\n" +
    "                    throw new Error(\"No deposit before.\");\n" +
    "                }\n" +
    "\n" +
    "                if (bk_height.lt(deposit.expiryHeight)) {\n" +
    "                    throw new Error(\"Can't takeout before expiryHeight.\");\n" +
    "                }\n" +
    "\n" +
    "                if (amount.gt(deposit.balance)) {\n" +
    "                    throw new Error(\"Insufficient balance.\");\n" +
    "                }\n" +
    "\n" +
    "                var result = Blockchain.transfer(from, amount);\n" +
    "                if (result != 0) {\n" +
    "                    throw new Error(\"transfer failed.\");\n" +
    "                }\n" +
    "                Event.Trigger(\"BankVault\", {\n" +
    "                    Transfer: {\n" +
    "                        from: Blockchain.transaction.to,\n" +
    "                        to: from,\n" +
    "                        value: amount.toString(),\n" +
    "                    }\n" +
    "                });\n" +
    "\n" +
    "                deposit.balance = deposit.balance.sub(amount);\n" +
    "                this.bankVault.put(from, deposit);\n" +
    "            },\n" +
    "\n" +
    "            balanceOf: function () {\n" +
    "                var from = Blockchain.transaction.from;\n" +
    "                return this.bankVault.get(from);\n";



var js_editor = CodeMirror(document.getElementById("js"), {
    value: smartContract,
    mode: "javascript",
    theme: "dracula",
    lineNumbers: true,
    lineWrapping: true,
    firstLineNumber: 1
});



function submit() {
    var from = "9694551ecd4cc42bbd9dadb732a534aa8ef56a51c9653aee";
    var to = "9694551ecd4cc42bbd9dadb732a534aa8ef56a51c9653aee";
    var value = "10000";
    var account;
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
    };

    var contract2 = {
        "source": smartContract,
        "sourceType": "js",
        "args": "[\"0\",\"otto\"]"
    };

    // testnetchainID, account, toAddress, value, nonce = nonce + 1, gasPrice, gasLimit

    var result = neb.api.call(from, to, value, 1, gasPrice, gasLimit, contract2);

    console.log(result);

}


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


    js_editor.setValue(contractSend)


}















/*
 var js_editor = CodeMirror(document.getElementById("js"), {
    value: "function test() { \n\talert('Hello Blockchain World');\n\t \n}" + "\n\t \n" + "test()\n\n",
    mode: "javascript",
    theme: "dracula",
    lineNumbers: true,
    lineWrapping: true,
    firstLineNumber: 1
});
*/



