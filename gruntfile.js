
module.exports = function (grunt) {

    function loadConfig(pattern) {
        var config = {},
            fileName,
            fileData;

        grunt.file.expand(pattern).forEach(function (filePath) {
            console.log(filePath);
            fileName = filePath.split('/').pop().split('.')[0];
            fileData = grunt.file.readJSON(filePath);
            config[fileName] = fileData;
        });
        return config;
    }

    var configuration = {
        pkg: grunt.file.readJSON("package.json")
    };

    grunt.util._.extend(configuration, loadConfig('configs/**/*.json'));

    grunt.loadNpmTasks('grunt-contrib-jshint');
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
    grunt.registerTask('default', ['jshint', 'test']);

    grunt.registerTask("foo", function () {
       console.log(grunt.config());
    });

    grunt.config.init(configuration);
    console.log("grunt loaded.");
};
