var HTMLEscaper = (function () {

    return {

        escape: function (str) {
            //Repace <
            str = str.replace(/&/g, "&amp;");
            str = str.replace(/</g, "&lt;");
            str = str.replace(/>/g, "&gt;");
            str = str.replace(/"/g, "&quot;");
            str = str.replace(/'/g, "&#x27;");
            str = str.replace(/\//g, "&#x2F;");

            return str;
        }

    };

}());