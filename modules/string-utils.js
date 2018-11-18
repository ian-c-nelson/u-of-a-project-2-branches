// add a function to String to allow replace all instances of a substring.
String.prototype.replaceAll = function (replaceStr, replaceStrWith) {
    return this.split(replaceStr).join(replaceStrWith);
}

// add a function to String to pad left
String.prototype.padLeft = function (padChar, length) {
    length = parseInt(length);
    let temp = this;

    while (temp.length < length) {
        temp = padChar + temp;
    }

    return temp;
}

// add a function to String to pad left
String.prototype.padRight = function (padChar, length) {
    length = parseInt(length);
    let temp = this;

    while (temp.length < length) {
        temp = temp + padChar;
    }

    return temp;
}