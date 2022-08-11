module.export = function (grunt) {
    return {
        all: [
            'Gruntfile.js',
            'tasks/*.js',
            '<%= nodeunit.tests %>'
        ],
        options: {
            jshintrc: '.jshintrc'
        }
    };
};
