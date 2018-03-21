//
// requires - jquery, bootbox, wallet.js
// because this project already uses them

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

        Array.isArray(opt[i]) ? bag[i].apply(null, opt[i]) : bag[i](opt[i]);
    }

    function footer(selector) {
        $(selector).replaceWith(
            '<div class="container footer">' +
            "    <div class=logo></div>" +
            "    <nav class=text-center>" +
            "        <a href=https://nebulas.io/>Home</a>" +
            "        <a href=https://nebulas.io/technology.html>Technology</a>" +
            "        <a href=https://nebulas.io/community.html>Community</a>" +
            "        <a href=https://nebulas.io/team.html>Team</a>" +
            "        <a href=https://nebulas.io/resources.html>Resources</a>" +
            "        <a href=https://medium.com/nebulasio target=_blank>Blog</a>" +
            "    </nav>" +
            '    <div class="copyright text-center">Copyright &copy; 2017 Nebulas.io, 814 Mission Street, San Francisco</div>' +
            "</div>");
    }

    function header(selector) {
        var i, len,
            arr = [
                "index.html",
                "sendNas.html",
                "sendOffline.html",
                "viewWalletInfo.html",
                "check.html",
                "contract.html"
            ];

        for (i = 0, len = arr.length; i < len; ++i)
            if (location.pathname.indexOf(arr[i]) != -1)
                arr[i] += " class=checked";

        $(selector).replaceWith(
            '<div class="container header">' +
            "    <div>" +
            "        <a href=" + arr[0] + ">Create New Wallet</a>" +
            "        <a href=" + arr[1] + ">Send NAS</a>" +
            "        <a href=" + arr[2] + ">Send Offline</a>" +
            "        <a href=" + arr[3] + ">View Wallet Info</a>" +
            "        <a href=" + arr[4] + ">Check TX Status</a>" +
            "        <a href=" + arr[5] + ">Contract</a>" +
            "    </div>" +
            "    <hr>" +
            "</div>");
    }

    function logoMain(selector) {
        $(selector).replaceWith(
            '<div class="container logo-main">' +
            "    <div class=row>" +
            "        <div class=col></div>" +
            "        <div class=col>" +
            "            <div class=dropdown>" +
            '                <button class="btn dropdown-toggle" id=logo-main-dropdown-1 data-toggle=dropdown aria-haspopup=true aria-expanded=false>switch api</button>' +
            "                <div class=dropdown-menu aria-labelledby=logo-main-dropdown-1>" +
            "                    <button class=dropdown-item type=button>Action</button>" +
            "                    <button class=dropdown-item type=button>Another action</button>" +
            "                    <button class=dropdown-item type=button>Something else here</button>" +
            "                </div>" +
            "            </div>" +
            "            <div class=dropdown>" +
            '                <button class="btn dropdown-toggle" id=logo-main-dropdown-2 data-toggle=dropdown aria-haspopup=true aria-expanded=false>switch lang</button>' +
            "                <div class=dropdown-menu aria-labelledby=logo-main-dropdown-2>" +
            "                    <button class=dropdown-item type=button>Action</button>" +
            "                    <button class=dropdown-item type=button>Another action</button>" +
            "                    <button class=dropdown-item type=button>Something else here</button>" +
            "                </div>" +
            "            </div>" +
            "        </div>" +
            "    </div>" +
            "</div>");
    }

    function selectWalletFile(selector, callback) {
        var $els = $(
            '<div class="container select-wallet-file">' +
            '    <p>Select Your Wallet File:</p>' +
            '    <label class=file>SELECT WALLET FILE...<input type=file></label>' +
            '    <label class="hide pass">Your wallet is encrypted. Good! Please enter the password.<input type=password></label>' +
            '    <button class="btn btn-block">Unlock</button>' +
            '    <p class=comment>' +
            '        <br>This is not a recommended way to access your wallet.' +
            '        <br>Entering your private key on a website dangerous. If our website is compromised or you accidentally visit a different website, your funds will be stolen.' +
            '    </p>' +
            '</div>').replaceAll(selector), mAccount, mFileJson;

        $els.find("button").on("click", onClickUnlock);
        $els.find("input[type=file]").on({
            change: onChangeFile,
            click: onClickFile
        });

        function onClickFile() {
            // clear file input
            // https://stackoverflow.com/questions/12030686/html-input-file-selection-event-not-firing-upon-selecting-the-same-file
            this.value = null;
        }

        function onChangeFile(e) {
            // read address from json file content, not it's file name
            var $this = $(this),
                file = e.target.files[0],
                fr = new FileReader();

            fr.onload = onLoad1;
            fr.readAsText(file);

            // open file, parse json string, create account from address, then it's a success
            function onLoad1(e) {
                try {
                    mFileJson = JSON.parse(e.target.result);
                    mAccount = Account.fromAddress(mFileJson.address)
                    $this.closest(".select-wallet-file").find("label.pass").removeClass("hide");
                } catch (err) {
                    bootbox.dialog({
                        message: err,
                        size: "large",
                        title: "Error"
                    });
                }
            }
        }

        function onClickUnlock() {
            if (mFileJson)
                if (typeof callback == "function")
                    callback(mFileJson, mAccount, $(this).closest(".select-wallet-file").find("input[type=password]").val());
                else
                    console.log("uiBlock/selectWalletFile - 'callback' parameter not specified, cannot pass result");
            else
                bootbox.dialog({
                    message: "please upload your wallet file, thanks",
                    size: "large",
                    title: "please select your wallet"
                });
        }
    }
}
