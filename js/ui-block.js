//
// requires - jquery blockies bootbox i18n.js nebulas.js
// because this project already uses them

var uiBlock = function () {
    var old$fnModal = $.fn.modal;

    $.fn.modal = $fnModal;

    return {
        insert: insert,
        numberAddComma: numberAddComma,
        toSi: toSi,
        validate: validate
    };

    function $fnModal(s) {
        if (!this.hasClass("listen-to-bs-shown")) {
            this.addClass("listen-to-bs-shown");
            this.on("shown.bs.modal", onShownBsModal);
        }

        if (s == "show")
            this.removeClass("marked-for-close");
        else if (s == "hide")
            // when modal is animating, you can not close it, it's important to set this flag;
            // when animating is over, you can close modal, this flag is not used
            this.addClass("marked-for-close");

        old$fnModal.apply(this, arguments);
    }

    function onShownBsModal() {
        var $this = $(this);

        if ($this.hasClass("marked-for-close"))
            $this.modal("hide");
    }

    function insert(dic) {
        // f({ header: ".header-1, .abc" })
        // - will insert header html string into all elements found by document.querySelectorAll(".header-1, .abc")

        var Account = require("nebulas").Account,
            bag = {
                footer: footer,
                header: header,
                iconAddress: iconAddress,
                logoMain: logoMain,
                numberComma: numberComma,
                selectWalletFile: selectWalletFile
            }, i;

        for (i in dic) if (i in bag)
            Array.isArray(dic[i]) ? bag[i].apply(null, dic[i]) : bag[i](dic[i]);

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
                    '<div class="copyright text-center">Copyright &copy; 2018 Nebulas.io, 645 Howard Street, San Francisco</div>'));
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

        function iconAddress(selector) {
            var $selector = $(selector);

            $selector.each(each);
            i18n.run($selector);

            function each(i, o) {
                var $o = $(o),
                    attrDisabled = $o.attr("data-disabled") != undefined,
                    attrId = $o.attr("data-id");

                $o.addClass("icon-address")
                    .html(
                        '<input class="address form-control"' +
                        // do not validate when disabled
                        (attrDisabled ? " disabled" : ' data-i18n=placeholder/addr data-validate-order-matters="required lengthEq35"') +
                        (attrId ? " id=" + attrId : "") +
                        "><canvas class=placeholder></canvas>")
                    .on("input", "input", onInput);
            }

            function onInput(e) {
                var val = e.target.value,
                    $canvas = $(this).closest(".icon-address").find("canvas");

                if (val.length == 35)
                    $canvas.replaceWith(blockies.create({
                        seed: val.toLowerCase(),
                    }));
                else if (!$canvas.hasClass("placeholder"))
                    $canvas.replaceWith("<canvas class=placeholder></canvas>");
            }
        }

        function logoMain(selector) {
            var i, len, apiList, langList,
                apiPrefix, sApiButtons, sApiText,
                lang, sLangButtons;

            //
            // apiPrefix

            apiList = [
                { chainId: 1, name: "Mainnet", url: "https://mainnet.nebulas.io" },
                { chainId: 1001, name: "Testnet", url: "https://testnet.nebulas.io" },
                { chainId: 100, name: "Local Nodes", url: "http://127.0.0.1:8685"}
            ];
            apiPrefix = (localSave.getItem("apiPrefix") || "").toLowerCase();
            sApiButtons = "";

            for (i = 0, len = apiList.length; i < len && apiList[i].url != apiPrefix; ++i);

            i == len && (i = 0);
            localSave.setItem("apiPrefix", apiPrefix = apiList[i].url);
            localSave.setItem("chainId", apiList[i].chainId);
            sApiText = apiList[i].name;

            for (i = 0, len = apiList.length; i < len; ++i)
                sApiButtons += '<button class="' +
                    (apiPrefix == apiList[i].url ? "active " : "") + 'dropdown-item" data-i=' + i + ">" +
                    apiList[i].name + "</button>";
            //
            // lang

            langList = i18n.supports();
            lang = (localSave.getItem("lang") || "").toLowerCase();
            sLangButtons = "";

            for (i = 0, len = langList.length; i < len && langList[i] != lang; ++i);

            i == len && (i = 0);
            localSave.setItem("lang", lang = langList[i]);

            for (i = 0, len = langList.length; i < len; ++i)
                sLangButtons += '<button class="' + (langList[i] == lang ? "active " : "") + 'dropdown-item" data-lang=' + langList[i] + ">" + i18n.langName(langList[i]) + "</button>"

            //
            // $.html

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
                    localSave.setItem("apiPrefix", apiList[$this.data("i")].url);
                    location.reload();
                }
            }

            function onClickMenuLang() {
                var $this = $(this);

                if (!$this.hasClass("active")) {
                    localSave.setItem("lang", $this.data("lang"));
                    i18n.run();
                    $this.parent().children().removeClass("active");
                    $this.addClass("active");
                }
            }
        }

        function numberComma(selector) {
            var $selector = $(selector);

            $selector.each(each);
            $selector.children("input").trigger("input");
            i18n.run($selector);

            function each(i, o) {
                var $o = $(o),
                    attrDisabled = $o.attr("data-disabled") != undefined,
                    attrI18n = $o.attr("data-data-i18n"),
                    attrId = $o.attr("data-id"),
                    attrValidate = $o.attr("data-validate"),
                    attrValue = $o.attr("data-value");

                $o.addClass("number-comma")
                    .html("<input class=form-control" +
                        (attrDisabled ? " disabled" : "") +
                        (attrI18n ? " data-i18n=" + attrI18n : "") +
                        (attrId ? " id=" + attrId : "") +
                        (attrValidate ? ' data-validate-order-matters="' + attrValidate + '"' : "") +
                        (attrValue ? " value=" + attrValue : "") +
                        "><div></div>")
                    .on("input", "input", onInput)
            }

            function onInput() {
                var $this = $(this), $parent = $this.parent();

                $parent.children("div").text("≈ " + toSi($this.val(), $parent.attr("data-unit")));
            }
        }

        // this block should not add 'container' class by it self, should let user add it
        function selectWalletFile(selector, callback) {
            var mAccount, mFileJson;

            i18n.run($(selector)
                .addClass("select-wallet-file")
                .html(
                    "<p data-i18n=swf/name></p>" +
                    '<label class="file empty"><span data-i18n=swf/button></span><input type=file></label>' +
                    '<label class="hide pass"><span data-i18n=swf/good></span><input type=password></label>' +
                    '<button class="btn btn-block" data-i18n=swf/unlock></button>' 
                    )
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
                fr.onload = onload;
                fr.readAsText(file);

                // open file, parse json string, create account from address, then it's a success
                function onload(e) {
                    try {
                        mFileJson = JSON.parse(e.target.result);
                        mAccount = Account.fromAddress(mFileJson.address)
                        $this.closest(".select-wallet-file").find("label.pass").removeClass("hide");
                        $this.closest(".select-wallet-file").find("label.file").removeClass("empty");
                    } catch (e) {
                        $this.closest(".select-wallet-file").find("label.file").addClass("empty");
                        bootbox.dialog({
                            backdrop: true,
                            onEscape: true,
                            message: e.message,
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
                        backdrop: true,
                        onEscape: true,
                        message: "<span data-i18n=swf/modal/select/message></span>",
                        size: "large",
                        title: "<span data-i18n=swf/modal/select/title></span>"
                    });

                    i18n.run($(".bootbox.modal"));
                }
            }
        }
    }

    function isOnScreen(el) {
        // https://stackoverflow.com/questions/20644029/checking-if-a-div-is-visible-within-viewport-using-jquery

        var win = $(window),
            $el = $(el),
            bounds = $el.offset(),
            viewport = {
                top: win.scrollTop(),
                left: win.scrollLeft()
            };

        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height();

        bounds.right = bounds.left + $el.outerWidth();
        bounds.bottom = bounds.top + $el.outerHeight();

        return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
    };

    function numberAddComma(n) {
        // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript

        var parts = (+n || 0).toString().split(".");

        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }

    function toSi(n, unit) {
        // https://en.wikipedia.org/wiki/Metric_prefix
        //        0    1    2    3    4    5    6    7    8
        var si = ["", "k", "M", "G", "T", "P", "E", "Z", "Y"], i, len;

        n = +n || 0;
        unit = (unit || "").toLowerCase();

        if (unit == "wei") {
            len = 6;
            unit = "Wei";
        } else {
            len = si.length - 1;
            unit == "nas" && (unit = "NAS");
        }

        for (i = 0; i < len && n >= 1000; ++i, n /= 1000);

        if (i == len && unit == "Wei")
            for (i = 0, len = si.length - 1, unit = "NAS"; i < len && n >= 1000; ++i, n /= 1000);

        n = n.toFixed();
        return (i == len ? numberAddComma(n) : n) + " " + si[i] + unit;
    }

    function validate(selector) {
        // these validates performed in order listed in the value of data-validate-order-matters
        // queries inputs on each validateAll call so you can add or remove <input> into selector at any time

        var nebulas = require("nebulas"),
            mRules = {
                eqgt0: function (s) { return s > -1; },
                gt0: function (s) { return s > 0; },
                lengthEq35: function (s) { return s.length == 35; },
                lengthEq64: function (s) { return s.length == 64; },
                lengthGt8: function (s) { return s.length > 8; },
                number: function (s) {
                    try {
                        nebulas.Utils.toBigNumber(s);
                        return true;
                    } catch (e) {
                        return false;
                    }
                },
                required: function (s) { return s.length != 0; }
            };

        selector || (selector = "body");

        // or use focusin/focusout, see
        // https://stackoverflow.com/questions/9577971/focus-and-blur-jquery-events-not-bubbling
        $(selector).on({
            blur: onBlur,
            focus: onFocus
        }, "[data-validate-order-matters]");

        return validateAll;

        function onBlur(e) {
            // https://stackoverflow.com/questions/121499/when-a-blur-event-occurs-how-can-i-find-out-which-element-focus-went-to
            // Oriol
            //
            // rel = element currently has focus, validate when
            // - rel is falsy, many cases here, just validate anyway
            // - rel is child of selector
            var rel = e.relatedTarget;

            if (!rel || $(selector).find(rel).length)
                validateAll();
        }

        function validateAll() {
            var ret = true;

            // doubt - remove all invalid state?
            $("[data-validate-order-matters]").removeClass("invalid").popover("hide");

            $(selector).find("[data-validate-order-matters]").each(function (i, o) {
                var $o = $(o), arr, i, len,
                    s = $o.data("validate-order-matters");

                if (s) for (arr = s.match(/\S+/g) || [], i = 0, len = arr.length; i < len; ++i) //TODO: 加上if，for括号
                    if (mRules[arr[i]]) {
                        if (!mRules[arr[i]](o.value)) {
                            $o.addClass("invalid");

                            // only show popover for first invalid input
                            if (ret) {
                                ret = false;
                                $o.data("index", arr[i]);

                                $o.popover({
                                    container: "body",
                                    content: function () { return i18n.run($("<div><span data-i18n=validate/" + $(this).data("index") + "></span></div>")).html(); },
                                    html: true,
                                    placement: "auto",
                                    trigger: "manual"
                                })
                                    .popover("show");

                                setTimeout(function () {
                                    // unlike parameterless scrollIntoView() call, this call has no visual effect if called synchronously, don't know why
                                    isOnScreen(o) || o.scrollIntoView({ behavior: "smooth" });
                                });
                            }
                            break;
                        }
                    } else
                        console.log("validateAll - unknown rule -", arr[i] + ", ignored");
            });

            return ret;
        }

        function onFocus() {
            validateAll();
            $(this).removeClass("invalid").popover("hide");
        }
    }
}();
