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
    
    getGasPrice: function () {
        var apiPrefix = localStorage.apiPrefix || "https://testnet.nebulas.io/";

        return $.ajax({
            type: 'get',
            url: apiPrefix + "v1/user/getGasPrice"
        });
    },
    
    getAccountstate: function (addr) {
        var apiPrefix = localStorage.apiPrefix || "https://testnet.nebulas.io/";

        return $.ajax({
            tdata: JSON.stringify({ address: addr }),
            type: 'post',
            url: apiPrefix + "v1/user/accountstate"
        });
    },
    
};
