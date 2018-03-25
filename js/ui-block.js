//
// requires - jquery bootbox i18n.js wallet.js
// because this project already uses them

var uiBlock = {
    insert: function (dic) {
        // f({ header: ".header-1, .abc" })
        // - will insert header html string into all elements found by document.querySelectorAll(".header-1, .abc")

        var Account = require("nebulas").Account,
            bag = {
                footer: footer,
                header: header,
                logoMain: logoMain,
                selectWalletFile: selectWalletFile
            }, i;

        for (i in dic) {
            switch (i) {
                case "footer":
                case "header":
                case "logoMain":
                case "selectWalletFile":
                    break;
                default: continue;
            }

            Array.isArray(dic[i]) ? bag[i].apply(null, dic[i]) : bag[i](dic[i]);
        }

        function footer(selector) {
            i18n.run($(selector)
                .addClass("container footer")
                .html(
                    "<div class=logo></div>" +
                    "<nav class=text-center>" +
                    "    <a href=https://nebulas.io/ data-i18n=home></a>" +
                    "    <a href=https://nebulas.io/technology.html data-i18n=technology></a>" +
                    "    <a href=https://nebulas.io/community.html data-i18n=community></a>" +
                    "    <a href=https://nebulas.io/team.html data-i18n=team></a>" +
                    "    <a href=https://nebulas.io/resources.html data-i18n=resources></a>" +
                    "    <a href=https://medium.com/nebulasio data-i18n=blog target=_blank></a>" +
                    "</nav>" +
                    '<div class="copyright text-center">Copyright &copy; 2017 Nebulas.io, 814 Mission Street, San Francisco</div>'));
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

            i18n.run($(selector)
                .addClass("container header")
                .html(
                    "<div>" +
                    "    <a href=" + arr[0] + " data-i18n=header/new-wallet></a>" +
                    "    <a href=" + arr[1] + " data-i18n=header/send></a>" +
                    "    <a href=" + arr[2] + " data-i18n=header/send-offline></a>" +
                    "    <a href=" + arr[3] + " data-i18n=header/view></a>" +
                    "    <a href=" + arr[4] + " data-i18n=header/check></a>" +
                    "    <a href=" + arr[5] + " data-i18n=header/contract></a>" +
                    "</div>" +
                    "<hr>"));
        }

        function logoMain(selector) {
            var i, len,
                list = [
                    { chainId: 1001, name: "testnet.nebulas.io", url: "https://testnet.nebulas.io/" },
                    { chainId: 1002, name: "34.205.26.12:8685", url: "http://34.205.26.12:8685/" },
                    { chainId: 1003, name: "34.205.26.12:8685", url: "http://34.205.26.12:8685/" }
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
            localStorage.chainId = list[i].chainId;
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
                sLangButtons += '<button class="' + (langs[i] == lang ? "active " : "") + 'dropdown-item" data-lang=' + langs[i] + ">" + i18n.langName(langs[i]) + "</button>"

            //
            // $.replaceAll

            i18n.run($(selector)
                .addClass("container logo-main")
                .html(
                    "<div class=row>" +
                    "    <div class=col></div>" +
                    "    <div class=col>" +
                    "        <div class=dropdown>" +
                    '            <button class="btn dropdown-toggle" id=logo-main-dropdown-1 data-toggle=dropdown aria-haspopup=true aria-expanded=false>' + sApiText + "</button>" +
                    '            <div class="dropdown-menu api" aria-labelledby=logo-main-dropdown-1>' + sApiButtons +
                    "            </div>" +
                    "        </div>" +
                    "        <div class=dropdown>" +
                    '            <button class="btn dropdown-toggle" id=logo-main-dropdown-2 data-toggle=dropdown aria-haspopup=true aria-expanded=false data-i18n=name></button>' +
                    '            <div class="dropdown-menu lang" aria-labelledby=logo-main-dropdown-2>' + sLangButtons +
                    "            </div>" +
                    "        </div>" +
                    "    </div>" +
                    "</div>")
                .on("click", ".api > button", onClickMenuApi)
                .on("click", ".lang > button", onClickMenuLang),
                lang);

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
                    i18n.run();
                    $this.parent().children().removeClass("active");
                    $this.addClass("active");
                }
            }
        }

        function selectWalletFile(selector, callback) {
            var mAccount, mFileJson;

            i18n.run($(selector)
                .addClass("container select-wallet-file")
                .html(
                    "<p data-i18n=swf/name></p>" +
                    "<label class=file><span data-i18n=swf/button></span><input type=file></label>" +
                    '<label class="hide pass"><span data-i18n=swf/good></span><input type=password></label>' +
                    '<button class="btn btn-block" data-i18n=swf/unlock></button>' +
                    "<p class=comment data-i18n=swf/comment></p>")
                .on("click", "button", onClickUnlock)
                .on("keyup", "input[type=password]", onKeyUpPassword)
                .on({
                    change: onChangeFile,
                    click: onClickFile
                }, "input[type=file]"));

            function onChangeFile(e) {
                // read address from json file content, not it's file name
                var $this = $(this),
                    file = e.target.files[0],
                    fr = new FileReader();

                // https://stackoverflow.com/questions/857618/javascript-how-to-extract-filename-from-a-file-input-control
                // this.value.split(/[\\|/]/).pop()
                $("<span>" + file.name + "</span>").replaceAll($this.closest(".select-wallet-file").find("label.file > span"));
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

            function onClickFile() {
                // clear file input
                // https://stackoverflow.com/questions/12030686/html-input-file-selection-event-not-firing-upon-selecting-the-same-file
                this.value = null;
            }

            function onKeyUpPassword(e) {
                e.key == "Enter" && $(this).closest(".select-wallet-file").find("button").click();
            }

            function onClickUnlock() {
                var $swf = $(this).closest(".select-wallet-file");

                if (mFileJson)
                    if (typeof callback == "function")
                        callback($swf[0], mFileJson, mAccount, $swf.find("input[type=password]").val());
                    else
                        console.log("uiBlock/selectWalletFile - 'callback' parameter not specified, cannot pass result");
                else {
                    bootbox.dialog({
                        message: "<span data-i18n=swf/modal/select/message></span>",
                        size: "large",
                        title: "<span data-i18n=swf/modal/select/title></span>"
                    });

                    i18n.run($(".bootbox.modal"));
                }
            }
        }
    },
    validate: function (selector) {
        // these validates depend on logical order of value of data-validate-order-matters so proceed with caution

        var $inputs,
            mRules = {
                gt0: function (s) { return s > 0; },
                lengthEq45: function (s) { return s.length == 45; },
                lengthGt8: function (s) { return s.length > 8; },
                number: function (s) {
                    try {
                        Utils.toBigNumber(s);
                        return true;
                    } catch (e) {
                        return false;
                    }
                },
                required: function (s) { return s.length != 0; }
            };

        selector || (selector = "body");
        $inputs = $(selector).find("[data-validate-order-matters]")
        $inputs.on({
            blur: validateAll,
            focus: onFocus
        });
        return validateAll;

        function validateAll() {
            var ret = true;

            $inputs.each(function (i, o) {
                var $el = $(o),
                    s = $el.data("validate-order-matters"),
                    arr, i, len;

                if (s) for (arr = s.match(/\S+/g) || [], i = 0, len = arr.length; i < len; ++i)
                    if (mRules[arr[i]]) {
                        if (!mRules[arr[i]](o.value)) {
                            $el.addClass("invalid");

                            // only show popover for first invalid input
                            if (ret) {
                                ret = false;
                                $el.data("index", arr[i]);

                                $el.popover({
                                    container: "body",
                                    content: function () { return i18n.run($("<div><span data-i18n=validate/" + $(this).data("index") + "></span></div>")).html(); },
                                    html: true,
                                    placement: "auto",
                                    trigger: "manual"
                                })
                                    .popover("show")[0]
                                    .scrollIntoView({ behavior: "smooth", block: "start" });
                            }
                            break;
                        }
                    } else
                        console.log("validateAll - unknown rule -", arr[i] + ", ignored");
            });

            return ret;
        }

        function onFocus() {
            $(this).removeClass("invalid").popover("hide");
        }
    }
};
