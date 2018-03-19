//
// requires - jquery

// uiBlock({ header: ".header-1, .abc" })
// - will replace all elements found by document.querySelectorAll(".header-1, .abc") with header
function uiBlock(opt) {
    var i,
        bag = {
            footer: footer,
            header: header,
            logo: logo,
            selectWalletFile: selectWalletFile
        };

    for (i in opt) {
        switch (i) {
            case "footer":
            case "header":
            case "logo":
            case "selectWalletFile":
                break;
            default: continue;
        }

        bag[i](opt[i]);
    }

    function footer(selector) {
        console.log("footer", el);
    }

    function header(selector) {
        var i, len,
            arr = [
                "index.html",
                "sendNas.html",
                "sendOffline.html",
                "viewWalletInfo.html",
                "query.html",
                "contract.html"
            ];

        for (i = 0, len = arr.length; i < len; ++i)
            if (location.pathname.indexOf(arr[i]) != -1)
                arr[i] += " class=checked";

        $(selector).replaceWith(
            '<div class="container header">' +
            '    <div>' +
            '        <a href=' + arr[0] + '>Create New Wallet</a>' +
            '        <a href=' + arr[1] + '>Send NAS</a>' +
            '        <a href=' + arr[2] + '>Send Offline</a>' +
            '        <a href=' + arr[3] + '>View Wallet Info</a>' +
            '        <a href=' + arr[4] + '>Query transaction</a>' +
            '        <a href=' + arr[5] + '>Contract</a>' +
            '    </div>' +
            '    <hr>' +
            '</div>');
    }

    function logo(selector) {
        $(selector).replaceWith(
            '<div class="container logo">' +
            "    <div></div>" +
            "</div>");
    }

    function selectWalletFile(selector) {
        console.log("selectWalletFile", el);
    }
}
