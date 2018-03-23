//
// requires - jquery bootbox i18n.js wallet.js
// because this project already uses them

// uiBlock({ header: ".header-1, .abc" })
// - will replace all elements found by document.querySelectorAll(".header-1, .abc") with header
function uiBlock(opt) {
    var Account = require("wallet").Account,
        bag = {
            footer: footer,
            header: header,
            logoMain: logoMain,
            selectWalletFile: selectWalletFile
        }, i;

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
        i18n.run(localStorage.lang, $(
            '<div class="container footer">' +
            "    <div class=logo></div>" +
            "    <nav class=text-center>" +
            "        <a href=https://nebulas.io/ data-i18n=home></a>" +
            "        <a href=https://nebulas.io/technology.html data-i18n=technology></a>" +
            "        <a href=https://nebulas.io/community.html data-i18n=community></a>" +
            "        <a href=https://nebulas.io/team.html data-i18n=team></a>" +
            "        <a href=https://nebulas.io/resources.html data-i18n=resources></a>" +
            "        <a href=https://medium.com/nebulasio data-i18n=blog target=_blank></a>" +
            "    </nav>" +
            '    <div class="copyright text-center">Copyright &copy; 2017 Nebulas.io, 814 Mission Street, San Francisco</div>' +
            "</div>").replaceAll(selector));
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

        i18n.run(localStorage.lang, $(
            '<div class="container header">' +
            "    <div>" +
            "        <a href=" + arr[0] + " data-i18n=header/new-wallet></a>" +
            "        <a href=" + arr[1] + " data-i18n=header/send></a>" +
            "        <a href=" + arr[2] + " data-i18n=header/send-offline></a>" +
            "        <a href=" + arr[3] + " data-i18n=header/view></a>" +
            "        <a href=" + arr[4] + " data-i18n=header/check></a>" +
            "        <a href=" + arr[5] + " data-i18n=header/contract></a>" +
            "    </div>" +
            "    <hr>" +
            "</div>").replaceAll(selector));
    }

    function logoMain(selector) {
        var i, len, $els,
            list = [
                { name: "testnet.nebulas.io", url: "https://testnet.nebulas.io/" },
                { name: "34.205.26.12:8685", url: "http://34.205.26.12:8685/" }
            ],
            apiPrefix, sApiButtons, sApiText,
            lang, langs, sLangButtons;

        //
        // apiPrefix

        apiPrefix = (localStorage.apiPrefix || "").toLowerCase();
        sApiButtons = "";

        for (i = 0, len = list.length; i < len && list[i].url != apiPrefix; ++i);

        i == len && (i = 0);
        localStorage.apiPrefix = apiPrefix = list[i].url;
        sApiText = list[i].name;

        for (i = 0, len = list.length; i < len; ++i)
            sApiButtons += '<button class="' +
                (apiPrefix == list[i].url ? "active " : "") + 'dropdown-item" data-i=' + i + ">" +
                list[i].name + "</button>";

        //
        // lang

        lang = (localStorage.lang || "").toLowerCase();
        sLangButtons = "";

        for (langs = i18n.supports(), i = 0, len = langs.length; i < len; ++i)
            sLangButtons += '<button class="' + (i == lang ? "active " : "") + 'dropdown-item" data-lang=' + langs[i] + ">" + i18n.name(langs[i]) + "</button>"

        //
        // $.replaceAll

        $els = $(
            '<div class="container logo-main">' +
            "    <div class=row>" +
            "        <div class=col></div>" +
            "        <div class=col>" +
            "            <div class=dropdown>" +
            '                <button class="btn dropdown-toggle" id=logo-main-dropdown-1 data-toggle=dropdown aria-haspopup=true aria-expanded=false>' + sApiText + "</button>" +
            '                <div class="dropdown-menu api" aria-labelledby=logo-main-dropdown-1>' + sApiButtons +
            "                </div>" +
            "            </div>" +
            "            <div class=dropdown>" +
            '                <button class="btn dropdown-toggle" id=logo-main-dropdown-2 data-toggle=dropdown aria-haspopup=true aria-expanded=false data-i18n=name></button>' +
            '                <div class="dropdown-menu lang" aria-labelledby=logo-main-dropdown-2>' + sLangButtons +
            "                </div>" +
            "            </div>" +
            "        </div>" +
            "    </div>" +
            "</div>").replaceAll(selector);

        $els.on("click", ".api > button", onClickMenuApi);
        $els.on("click", ".lang > button", onClickMenuLang);
        i18n.run(lang, $els);

        function onClickMenuApi() {
            var $this = $(this);

            if (!$this.hasClass("active")) {
                localStorage.apiPrefix = list[$this.data("i")].url;
                location.reload();
            }
        }

        function onClickMenuLang() {
            var $this = $(this);

            if (!$this.hasClass("active")) {
                localStorage.lang = $this.data("lang");
                i18n.run(localStorage.lang);
                $this.parent().children().removeClass("active");
                $this.addClass("active");
            }
        }
    }

    function selectWalletFile(selector, callback) {
        var $els = $(
            '<div class="container select-wallet-file">' +
            "    <p data-i18n=swf/name></p>" +
            "    <label class=file><span data-i18n=swf/button></span><input type=file></label>" +
            '    <label class="hide pass"><span data-i18n=swf/good></span><input type=password></label>' +
            '    <button class="btn btn-block" data-i18n=swf/unlock></button>' +
            "    <p class=comment data-i18n=swf/comment></p>" +
            "</div>").replaceAll(selector), mAccount, mFileJson;

        $els.find("button").on("click", onClickUnlock);
        $els.find("input[type=file]").on({
            change: onChangeFile,
            click: onClickFile
        });
        i18n.run(localStorage.lang, $els);

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
            else {
                bootbox.dialog({
                    message: "<span data-i18n=swf/modal/select/message></span>",
                    size: "large",
                    title: "<span data-i18n=swf/modal/select/title></span>"
                });

                i18n.run(localStorage.lang, $(".bootbox.modal"));
            }
        }
    }
}
