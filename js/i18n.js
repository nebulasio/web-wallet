//
// i18n.run(lang)
// - $("[data-i18n]").each((el.type == input, textarea ? el.placeholder : el.innerHTML) = table[lang][el.attr(data-i18n)])
// 
// requires jquery
//
// this file is mainly a big table
// calls i18n.run(localStorage.lang) at bottom of this file

"use strict";

var i18n = function () {
    var table = {
        en: {
            blog: "Blog",
            community: "Community",
            "header/new-wallet": "Create New Wallet",
            "header/send": "Send NAS",
            "header/send-offline": "Send Offline",
            "header/view": "View Wallet Info",
            "header/check": "Check TX Status",
            "header/contract": "Contract",
            home: "Home",
            "index/comment": "This password encrypts your private key." +
                "<br>This does not act as a seed to generate your keys." +
                "<br>You will need this password + your private key to unlock your wallet.",
            "index/enter-password": "Enter a password:",
            "index/new": "Create New Wallet",
            "index/placeholder/do-not-forget": "Do NOT forget to save this!",
            name: "English",
            resources: "Resources",
            team: "Team",
            technology: "Technology"
        },
        zh: {
            blog: "博客",
            community: "社区",
            "header/new-wallet": "新建钱包",
            "header/send": "发送星云币",
            "header/send-offline": "离线发送",
            "header/view": "钱包信息",
            "header/check": "交易状态",
            "header/contract": "合约",
            home: "主页",
            "index/comment": "该密码用于加密您的私钥。<br>他不做为产生私钥的种子。<br>您需要该密码 + 您的私钥以解锁您的钱包。",
            "index/enter-password": "输入密码:",
            "index/new": "新建钱包",
            "index/placeholder/do-not-forget": "别忘了这个！",
            name: "简体中文",
            resources: "资源",
            team: "团队",
            technology: "技术"
        }
    };

    return {
        name: name,
        run: run,
        supports: supports
    };

    function name(s) {
        return table[s].name;
    }

    function run(lang, $parent) {
        // make sure lang is a key of table
        lang = (lang || "").toLowerCase();
        table[lang] || (lang = "en");

        if ($parent)
            $parent.find("[data-i18n]").each(f);
        else {
            $("[data-i18n]").each(f);
            document.documentElement.lang = lang;
        }

        function f(i, o) {
            var key = (o.dataset.i18n || "").toLowerCase();
            o[o.tagName == "INPUT" || o.tagName == "TEXTAREA" ? "placeholder" : "innerHTML"] = table[lang][key] || table.en[key];
        }
    }

    function supports(s) {
        return s ? s in table : Object.keys(table);
    }
}();

i18n.run(localStorage.lang);
