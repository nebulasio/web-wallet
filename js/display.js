

function display2() {
    var sendNas = document.getElementById("toaddress").value;
    document.getElementById("toaddress2").innerHTML = sendNas

    var sendNas2 = document.getElementById("amount").value;
    document.getElementById("amount2").innerHTML = sendNas2

    //var sendNas3 = document.getElementById("value").value;
    //document.getElementById("value2").innerHTML = sendNas3

    var sendNas4 = document.getElementById("limit").value;
    document.getElementById("limit2").innerHTML = sendNas4

    var sendNas5 = document.getElementById("price").value;
    document.getElementById("price2").innerHTML = toWei(sendNas5);

    var sendNas6 = document.getElementById("nonce").value;
    document.getElementById("nonce2").innerHTML = sendNas6
}

function toWei(n) {
    var arr = ["Wei", "kWei", "MWei", "GWei", "TWei", "PWei", "Nas"],
        i, len = arr.length - 1;

    for (i = 0, n = +n || 0; i < len && n >= 1000; ++i, n /= 1000);

    n = n.toFixed();
    return (i == len ? numberAddComma(n) : n) + " " + arr[i];
}

function toNas(n) {
    var arr = ["kNas", "MNas", "GNas", "TNas", "PNas", "ENas", "ZNas", "YNas"],
        i, len = arr.length - 1;

    for (i = 0, n = +n || 0; i < len && n >= 1000; ++i, n /= 1000);

    n = n.toFixed();
    return (i == len ? numberAddComma(n) : n) + " " + arr[i];
}
