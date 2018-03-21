//
// requires jquery

"use strict";

var api = {

    getTx: function (tx) {
        var apiPrefix = localStorage.apiPrefix || "https://testnet.nebulas.io/";

        return $.ajax({
            data: JSON.stringify({ hash: tx }),
            type: 'post',
            url: apiPrefix + "v1/user/getTransactionReceipt"
        });
    }
};
