/**
 * @module js-whatever/js/escape-regex
 */
define(function() {
    //noinspection UnnecessaryLocalVariableJS
    /**
     * @alias module:js-whatever/js/escape-regex
     * @desc Escapes regular expression characters in strings to allow them to be used with new RegExp()
     * @param {string} str The string to escape
     * @returns {string} The input string with regular expression characters escaped
     */
    var escapeRegex = function(str) {
        return str.replace(/([\\^$*+\-?.(){}[\]|])/g, '\\$1');
    };

    return escapeRegex;
});