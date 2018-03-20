//
// requires - jquery

// uiBlock({ header: ".header-1, .abc" })
// - will replace all elements found by document.querySelectorAll(".header-1, .abc") with header
function uiBlock(opt) {
    var i,
        bag = {
            footer: footer,
            header: header,
            logoMain: logoMain,
            selectWalletFile: selectWalletFile
        };

    for (i in opt) {
        switch (i) {
            case "footer":
            case "header":
            case "logoMain":
            case "selectWalletFile":
                break;
            default: continue;
        }

        bag[i](opt[i]);
    }

    function footer(selector) {
        $(selector).replaceWith(
            '<div class="container footer">' +
            "    <div class=logo></div>" +
            "    <nav class=text-xs-center>" +
            "        <a href=https://nebulas.io/>Home</a>" +
            "        <a href=https://nebulas.io/technology.html>Technology</a>" +
            "        <a href=https://nebulas.io/community.html>Community</a>" +
            "        <a href=https://nebulas.io/team.html>Team</a>" +
            "        <a href=https://nebulas.io/resources.html>Resources</a>" +
            "        <a href=https://medium.com/nebulasio target=_blank>Blog</a>" +
            "    </nav>" +
            '    <div class="copyright text-xs-center">Copyright &copy; 2017 Nebulas.io, 814 Mission Street, San Francisco</div>' +
            "</div>");
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
            '        <a href=' + arr[4] + '>Check TX Status</a>' +
            '        <a href=' + arr[5] + '>Contract</a>' +
            '    </div>' +
            '    <hr>' +
            '</div>');
    }

    function logoMain(selector) {
        $(selector).replaceWith('<div class="container logo-main"></div>');
    }

    function selectWalletFile(selector) {
        console.log("selectWalletFile", el);
    }
}
