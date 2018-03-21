//
// requires jquery

"use strict";

var api = {

    getTx: function (tx) {
        var apiPrefix = localStorage.apiPrefix || "https://explorer.nebulas.io/test/api/";

        return $.ajax({
            type: 'get',
            url: apiPrefix + 'tx/' + tx
        });
    }
};
