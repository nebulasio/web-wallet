//
// i18n.run()
// - $("[data-i18n]").each((el.type == input, textarea ? el.placeholder : el.innerHTML) = table[lang][el.attr(data-i18n)])
//
// requires jquery
//
// this file is mainly a big table
// calls i18n.run() at bottom of this file

"use strict";

var i18n = function () {
    var table = {
        en: {
            amount: "Amount",
            blog: "Blog",
            "check/anchor": "Please, read about this tool here.",
            "check/blah": "Trading hash can query transaction information, including pending and packaged transactions. You need to refresh the package status change of the query transaction several times when the transaction is packaged and validated.",
            "check/comment1": "Please enter a valid TX hash",
            "check/tx-details": "Transaction Details",
            community: "Community",
            "contract/addr_input_msg": "Please enter your TXhash",
            "contract/call": "Call",
            "contract/call_contract": "Call Contract",
            "contract/call_test": "Test",
            "contract/call_submit": "Submit",
            "contract/deploy": "Deploy",
            "contract/deploy_contract": "Deploy Contract",
            "contract/deploy_test": "Test",
            "contract/deploy_submit": "Submit",
            "contract/contract_code": "code : ",
            "contract/contract_codetype": "Programming Language :",
            "contract/contract_codetype_banner": "（ Please select the code type ！）",
            "contract/contract_fun": "arguments",
            "contract/contract_fun_prompt":" for example : ['x'] ",
            "contract/contract_fn_prompt":"function (x) { } ",
            "contract/contract_funtion": "function",
            "contract/err_msg": "Red part information is wrong，Please enter a valid msg",
            "contract/err_msg_hash": "Please enter a valid TX hash",
            "contract/test_result": "Test result",
            "contract/result": "Submit result",
            "contract/search": "Search",
            "contract/search_contract": "Search Contract",
            "contract/txhash": "txhash :",
            "contract/contract_address": "contract_address :",
            "contract/clickToCheck": "(Click to view transaction details)",
            data: "Data",
            download: "Download",
            "gas-limit": "Gas Limit",
            "gas-price": "Gas Price",
            "gas-used": "Gas Used",
            "header/check": "Check TX Status",
            "header/contract": "Contract",
            "header/new-wallet": "Create New Wallet",
            "header/send": "Send NAS",
            "header/send-offline": "Send Offline",
            "header/view": "View Wallet Info",
            home: "Home",
            "keystore-file": "Keystore File",
            name: "English",
            "new/comment": "This password encrypts your private key.\n" +
                "This does not act as a seed to generate your keys.\n" +
                "You will need this password + your private key to unlock your wallet.",
            "new/enter-password": "Enter a password:（Not less than 9 characters）",
            "new/gen": "Download Keystore File",
            "new/new": "Create New Wallet",
            "new/placeholder/do-not-forget": "Do NOT forget to save this!",
            "new/save1": "Save your",
            "new/save3": ".",
            "placeholder/addr": "fill address here",
            "placeholder/tx#": "fill transaction hash here",
            resources: "Resources",
            "send-nas/amount": "Value / Amount to Send",
            "send-nas/balance": "Balance",
            "send-nas/button/generate": "Generate Transaction",
            "send-nas/check": "Submit",
            "send-nas/close": "Close",
            "send-nas/from-address": "From Address",
            "send-nas/raw": "Raw Transaction",
            "send-nas/receipt": "receipt :",
            "send-nas/send": "Send Transaction",
            "send-nas/signed": "Signed Transaction",
            "send-nas/signed_qr": "Signed Transaction QR",
            "send-nas/to-address": "To Address",
            "send-nas/transfer_msg": "transfer message",
            "send-offline/gen-info": "Inquire Information",
            "send-offline/nonce": "nonce : (next transaction nonce)",
            "send-offline/step1": "Step 1: Inquire Information (Online Computer)",
            "send-offline/step2": "Step 2: Generate Transaction (Offline Computer)",
            "send-offline/step3": "Step 3: Send / Publish Transaction (Online Computer)",
            "swf/button": "SELECT WALLET FILE...",
            "swf/good": "Your wallet is encrypted. Good! Please enter the password.",
            "swf/modal/select/message": "please upload your wallet file, thanks",
            "swf/modal/select/title": "please select your wallet",
            "swf/name": "Select Your Wallet File:",
            "swf/unlock": "Unlock",
            team: "Team",
            technology: "Technology",
            "validate/eqgt0": "invalid: must equal to or greater than 0",
            "validate/gt0": "invalid: must greater than 0",
            "validate/lengthEq35": "invalid: length should be 35",
            "validate/lengthEq64": "invalid: length should be 64",
            "validate/lengthGt8": "invalid: length should at least be 9",
            "validate/number": "invalid: must be number",
            "validate/required": "invalid: required",
            "wallet-info/acc-addr": "Account Address",
            "wallet-info/acc-balance": "Account Balance",
            "wallet-info/private-key": "Private Key (unencrypted)",
            "wallet-info/your-addr": "Your Address"
        },
        zh: {
            amount: "金额",
            blog: "博客",
            "check/anchor": "有关此工具请阅读这里。",
            "check/blah": "交易哈希可以查询交易信息，包含等待上链和已经打包的交易。在交易打包验证时需要多次刷新查询交易的打包状态变更。",
            "check/comment1": "请输入有效的交易哈希",
            "check/tx-details": "交易详情",
            community: "社区",
            "contract/addr_input_msg": "请输入你的交易地址",
            "contract/call": "执行",
            "contract/call_contract": "执行合约",
            "contract/call_test": "测试",
            "contract/call_submit": "提交",
            "contract/deploy": "部署",
            "contract/deploy_contract": "部署合约",
            "contract/deploy_test": "测试",
            "contract/deploy_submit": "提交",
            "contract/contract_code": "合约代码 :",
            "contract/contract_codetype": "编程语言 :",
            "contract/contract_codetype_banner": "（ 请选择代码类型 ！）",
            "contract/contract_fun": "参数 ",
            "contract/contract_fun_prompt": "例如 ：“【x】” ",
            "contract/contract_fn_prompt":"例如 ：function (x) { } ",
            "contract/contract_funtion": "函数",
            "contract/err_msg": "红色部分信息错误，请输入有效信息",
            "contract/err_msg_hash": "请输入有效的交易哈希",
            "contract/test_result": "测试结果",
            "contract/result": "提交结果",
            "contract/search": "搜索",
            "contract/search_contract": "搜索合约",
            "contract/txhash": "交易哈希 :",
            "contract/contract_address": "合约地址 :",
            "contract/clickToCheck": "(点击产看交易详情)",
            data: "数据",
            download: "下载",
            "gas-limit": "Gas 限制",
            "gas-price": "Gas 价格",
            "gas-used": "Gas 消耗",
            "header/check": "交易状态",
            "header/contract": "合约",
            "header/new-wallet": "新建钱包",
            "header/send": "发送星云币",
            "header/send-offline": "离线发送",
            "header/view": "钱包信息",
            home: "主页",
            "keystore-file": "密码库文件",
            name: "简体中文",
            "new/comment": "该密码用于加密您的私钥。\n他不做为产生私钥的种子。\n您需要该密码 + 您的私钥以解锁您的钱包。",
            "new/enter-password": "输入密码:（不少于9位数）",
            "new/gen": "下载密码库文件",
            "new/new": "新建钱包",
            "new/placeholder/do-not-forget": "别忘了这个！",
            "new/save1": "保存你的",
            "new/save3": "。",
            "placeholder/addr": "地址",
            "placeholder/tx#": "交易哈希",
            resources: "资源",
            "send-nas/amount": "要发送的价值 / 金额",
            "send-nas/balance": "余额",
            "send-nas/button/generate": "生成交易",
            "send-nas/from-address": "来自地址",
            "send-nas/raw": "原始交易",
            "send-nas/receipt": "收据",
            "send-nas/send": "发送交易",
            "send-nas/signed": "签名的交易",
            "send-nas/signed_qr": "签名交易的二维码",
            "send-nas/transfer_msg": "交易信息",
            "send-nas/close": "关闭",
            "send-nas/check": "确认",
            "send-nas/to-address": "目的地址",
            "send-offline/gen-info": "查询信息",
            "send-offline/nonce": "nonce : (下一个交易的 nonce)",
            "send-offline/step1": "第 1 步：查询信息（联网）",
            "send-offline/step2": "第 2 步：生成信息（单机）",
            "send-offline/step3": "第 3 步：发送 / 发布交易（联网）",
            "swf/button": "选择钱包文件...",
            "swf/good": "你的钱包加密了，好！请输入密码。",
            "swf/modal/select/message": "请上传您的钱包文件，谢谢",
            "swf/modal/select/title": "请选择您的钱包",
            "swf/name": "选择你的钱包文件：",
            "swf/unlock": "解锁",
            team: "团队",
            technology: "技术",
            "validate/eqgt0": "无效：必须等于或大于 0",
            "validate/gt0": "无效：必须大于 0",
            "validate/lengthEq35": "无效：长度应等于 35",
            "validate/lengthEq64": "无效：长度应等于 64",
            "validate/lengthGt8": "无效：长度至少是 9",
            "validate/number": "无效：必须是数字",
            "validate/required": "无效：必填",
            "wallet-info/acc-addr": "钱包地址",
            "wallet-info/acc-balance": "钱包余额",
            "wallet-info/private-key": "私钥（未加密）",
            "wallet-info/your-addr": "你的地址"
        }
    };

    return {
        apiErrorToText: apiErrorToText,
        langName: langName,
        run: run,
        supports: supports
    };

    function apiErrorToText(s) {
        var lang = localSave.getItem("lang"),
            table = {
                unknown: {
                    en: "unknown error",
                    zh: "未知错误"
                },
                "Network Error": {
                    en: s,
                    zh: "网络错误"
                },
                // getAccountState
                "address: invalid address format": {
                    en: s,
                    zh: "地址格式无效"
                },
                // GetTransactionReceipt
                "invalid argument(s)": {
                    en: "invalid transaction hash",
                    zh: "无效的交易哈希"
                },
                "params eror/system error": {
                    en: "transaction hash or system error",
                    zh: "交易哈希或者系统错误"
                },
                "transaction not found": {
                    en: "transaction not found",
                    zh: "交易未找到"
                },
                // senRawTransaction
                "transaction's nonce is invalid, should bigger than the from's nonce": {
                    en: s,
                    zh: "交易的 nonce 无效，应该大于发送方的 nonce"
                },
                "contract transaction from-address not equal to to-address": {
                    en: s,
                    zh: "发布合约的 from / to 地址不一致"
                },
                "contract check failed": {
                    en: s,
                    zh: "合约地址无效"
                },
                "duplicated transaction": {
                    en: s,
                    zh: "不能重复提交相同的交易"
                },
                "below the gas price gas": {
                    en: s,
                    zh: "价格太低"
                },
                "gas limit less or equal to 0 ": {
                    en: s,
                    zh: "gas 限制应该大于 0"
                },
                "out of gas limit": {
                    en: s,
                    zh: "gas 限制过大"
                },
                "invalid transaction chainID": {
                    en: s,
                    zh: "无效的 chain id"
                },
                "invalid transaction hash": {
                    en: s,
                    zh: "交易哈希无效"
                },
                "invalid transaction signer": {
                    en: s,
                    zh: "无效的交易签名"
                }
            };

        return table[s] ? table[s][lang] || table[s].en : table.unknown[lang] || table.unknown.en;
    }

    function langName(s) {
        return table[s].name;
    }

    function run($parent, lang) {
        // make sure lang is a key of table
        lang = (lang || localSave.getItem("lang") || "").toLowerCase();
        table[lang] || (lang = "en");

        if ($parent)
            $parent.find("[data-i18n]").each(f);
        else {
            $("[data-i18n]").each(f);
            document.documentElement.lang = lang;
        }

        return $parent;

        function f(i, o) {
            var key = o.dataset.i18n || "";
            o[o.tagName == "INPUT" || o.tagName == "TEXTAREA" ? "placeholder" : "textContent"] = table[lang][key] || table.en[key];
        }
    }

    function supports(s) {
        return s ? s in table : Object.keys(table);
    }
}();

i18n.run();
