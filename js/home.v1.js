function checkEmail(email) {
    var emailRegex = /[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+/g;
    var isEmail = email.match(emailRegex);
    isEmail = isEmail && isEmail.length > 0;
    if (!isEmail) {
        bootbox.dialog({
            title: 'Invalid Email',
            message: "Please provide a valid email address",
        });
        return isEmail;
    }
    return isEmail;
}

function checkWallet(wallet) {
    var walletRegex = /(0x)?[\w]{48}/g;
    var isWallet = wallet.match(walletRegex);
    isWallet = isWallet && isWallet.length > 0;
    if (!isWallet) {
        bootbox.dialog({
            title: 'Invalid Wallet Address',
            message: "[0x] + hex string(40 letters) + checksum(8 letters)",
        });
        return isWallet;
    }
    return isWallet;
}

$(function () {
    $('#frmToken').on("submit", function (e) {
        e.preventDefault();

        var email = $('#tokEmail').val();
        var wallet = $("#tokWallet").val();
        if (checkEmail(email) && checkWallet(wallet)) {
            var url = "/claim/api/claim/" + email + "/" + wallet + "/";
            $.get(url, function (resp) {
                console.log(resp);
                if (resp.hash) {
                    bootbox.dialog({
                        title: 'Send Claim Tx Successfully',
                        message: "Claim Token Tx Hash is " + resp.hash,
                        size: 'large'
                    });
                } else {
                    bootbox.dialog({
                        title: 'Send Claim Tx Failed',
                        message: resp.error,
                    });
                }
            }).fail(function () {
                bootbox.alert({
                    message: "Sorry, server is busy!",
                });
            });
        }
    });

    $('#frmState').on("submit", function (e) {
        e.preventDefault();

        var wallet = $("#stWallet").val();
        if (checkWallet(wallet)) {
            var url = "/claim/api/state/" + wallet + "/";
            $.get(url, function (resp) {
                console.log(resp);
                if (resp.balance) {
                    bootbox.dialog({
                        title: 'Fetch State Successfully',
                        message: "Balance: " + resp.balance + "\nNonce: " + resp.nonce,
                    });
                } else {
                    bootbox.dialog({
                        title: 'Fetch State Failed',
                        message: resp.error,
                    });
                }
            }).fail(function () {
                bootbox.alert({
                    message: "Sorry, server is busy!",
                });
            });
        }
    });
});