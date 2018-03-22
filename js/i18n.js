//
// i18n.run(lang)
// - $("[data-i18n]").each(el.textContent = table[lang][el.attr(data-i18n)])
// 
// requires jquery
//
// this file is mainly a big table
// because i want to replace i18n string after uiBlock call, in this file i won't call
// i18n.run(localStorage.lang) since it's likely too early

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
            name: "简体中文",
            resources: "资源",
            team: "团队",
            technology: "技术"
        }
    };

    return {
        run: run,
        table: table
    };

    function run(lang, $parent) {
        // make sure lang is a key of table
        lang = (lang || "").toLowerCase();
        table[lang] || (lang = "en");

        document.documentElement.lang = lang;

        if ($parent)
            $parent.find("[data-i18n]").each(f);
        else
            $("[data-i18n]").each(f);

        function f(i, o) {
            var key = (o.dataset.i18n || "").toLowerCase();
            o.textContent = table[lang][key] || table.en[key];
        }
    }
}();
