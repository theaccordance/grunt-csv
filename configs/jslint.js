module.exports = function () {
    "use strict";
    return {
        all: {
            src: ['configs/**/*.js', 'tasks/**/*.js', "test/**/*.js", "gruntfile.js"],
            directives: {
                browser: false,
                maxlen: 140,
                unparam: true,
                todo: true,
                node: true,
                this: true
            },
            options: {
                errorsOnly: true
            }
        }
    };
};
