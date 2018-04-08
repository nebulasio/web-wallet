//
// ====================
// cause: macos safari
// ====================
//
// macos safari + file: + localStorage = error

var localSave;

try {
    localStorage.setItem("mod", "mod");
    localStorage.removeItem("mod");
    localSave = localStorage;
} catch (e) {
    // https://gist.github.com/juliocesar/926500/85cbf5924c071f23772d73dd51ebd9d5d79ec225
    // digital-flowers commented on 8 May 2017
    // points to
    // https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage

    document.cookie = "thetest=b; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";

    if (document.cookie) {
        document.cookie = "thetest=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

        localSave = {
            getItem: function (sKey) {
                if (!sKey || !this.hasOwnProperty(sKey)) { return null; }
                return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
            },
            key: function (nKeyId) {
                return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, "").split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]);
            },
            setItem: function (sKey, sValue) {
                if (!sKey) { return; }
                document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
                this.length = document.cookie.match(/\=/g).length;
            },
            length: 0,
            removeItem: function (sKey) {
                if (!sKey || !this.hasOwnProperty(sKey)) { return; }
                document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
                this.length--;
            },
            hasOwnProperty: function (sKey) {
                return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
            }
        };

        localSave.length = (document.cookie.match(/\=/g) || localSave).length;
    } else {
        //
        // in chrome, disable cookie

        console.log("warning: can not use localStorage and cookie, using memory, will not persist");

        localSave = function () {
            var bag = {};

            return {
                getItem: function (sKey) {
                    return bag[sKey];
                },
                key: function (nKeyId) {
                    var i, j = 0;

                    for (i in bag) {
                        if (j == nKeyId) return i;

                        ++j;
                    }

                    return null;
                },
                setItem: function (sKey, sValue) {
                    var i, len = 0;

                    bag[sKey] = sValue;

                    for (i in bag)++len;

                    this.length = len;
                },
                length: 0, // in this case length is initially 0
                removeItem: function (sKey) {
                    bag[sKey] = undefined;

                    for (i in bag)++len;

                    this.length = len;
                }
            };
        }();
    }
}
