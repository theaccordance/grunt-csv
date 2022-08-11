module.exports = function (grunt) {
    "use strict";
    function loadConfig(pattern) {
        var config = {},
            fileName,
            fileData;

        grunt.file.expand(pattern).forEach(function (filePath) {
            fileName = filePath.split('/').pop().split('.')[0];
            fileData = require("./" + filePath)(grunt);
            config[fileName] = fileData;
        });
        return config;
    }

    var configuration = Object.assign({
        pkg: grunt.file.readJSON("package.json")
    }, loadConfig('configs/**/*.js'));

    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    if (grunt.file.exists('tasks')) {
        grunt.log.writeln('Loading tasks found in grunt/tasks...');
        grunt.loadTasks('tasks');
    }

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'papaparse', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jslint', 'test']);

    grunt.config.init(configuration);
    grunt.log.ok("Grunt Loaded.");
};
