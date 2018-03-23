//
// requires jquery
//
// http://34.205.26.12:8685/
// https://testnet.nebulas.io/

"use strict";

var api = {

    getUserGetGasPrice: function () {
        var apiPrefix = localStorage.apiPrefix || "https://testnet.nebulas.io/";

        return $.ajax({
            type: "get",
            url: apiPrefix + "v1/user/getGasPrice"
        });
    },

    postUserAccountState: function (addr, block) {
        var apiPrefix = localStorage.apiPrefix || "https://testnet.nebulas.io/";

        return $.ajax({
            data: JSON.stringify({ address: addr, block: block }),
            type: "post",
            url: apiPrefix + "v1/user/accountstate"
        });
    },

    postUserGetTransactionReceipt: function (tx) {
        var apiPrefix = localStorage.apiPrefix || "https://testnet.nebulas.io/";

        return $.ajax({
            data: JSON.stringify({ hash: tx }),
            type: "post",
            url: apiPrefix + "v1/user/getTransactionReceipt"
        });
    },

    postUserCall: function (from, to, value, nonce, gaslimit, gasprice, contract) {
        var apiPrefix = localStorage.apiPrefix || "https://testnet.nebulas.io/";

console.log(from, to, value, nonce, gaslimit, gasprice, contract);

        return $.ajax({
            data: JSON.stringify({
                from: from,
                to: to,
                nonce: nonce,
                gasLimit: gaslimit,
                gasPrice: gasprice,
                contract: contract
            }),
            type: "post",
            url: apiPrefix + "v1/user/call"
        });
    }

};
