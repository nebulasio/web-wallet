

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
    var to = "e138a596e0830e8cad279f5fbcecddf35b29a5f45cb68d2c";
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

    var contract1 =  "        'use strict';\n" +
        "\n" +
        "        var DepositeContent = function (text) {\n" +
        "            if (text) {\n" +
        "                let o = JSON.parse(text);\n" +
        "                this.balance = new BigNumber(o.balance);\n" +
        "                this.expiryHeight = new BigNumber(o.expiryHeight);\n" +
        "            } else {\n" +
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
        "                //TODO:\n" +
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
        "                return this.bankVault.get(from);\n" +
        "            }\n" +
        "        };\n" +
        "\n" +
        "        ";


        js_editor.setValue(contract1)


    }










