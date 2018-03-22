//
// requires jquery
//
// http://34.205.26.12:8685/
// https://testnet.nebulas.io/

"use strict";

var api = {

    getTx: function (tx) {
        var apiPrefix = localStorage.apiPrefix || "https://testnet.nebulas.io/";

        return $.ajax({
            data: JSON.stringify({ hash: tx }),
            type: 'post',
            url: apiPrefix + "v1/user/getTransactionReceipt"
        });
    },
    getContract: function (address) {
        var apiPrefix = localStorage.apiPrefix || "https://testnet.nebulas.io/";

        return $.ajax({
            data: JSON.stringify({ hash: address }),
            type: 'post',
            url: apiPrefix + "v1/user/getTransactionReceipt"
        });
    }
};
