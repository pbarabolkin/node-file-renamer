#!/usr/bin/env node

(function () {
    var argv = require('optimist').argv,
        glob = require("glob"),
        fs = require('fs'),
        path = require('path');

    if (!argv.dirname || !argv.find || !argv.replace)
        return console.error('"--dirname", "--find", "--replace" parameters are required');

    glob('*' + argv.find + '*', {
        cwd: argv.dirname,
        matchBase: true,
        nodir: true
    }, function (err, files) {
        if (err)
            return console.error(err);

        // rename files
        var re = new RegExp(argv.find, 'g');
        for (var i = 0; i < files.length; i++) {
            var dirName = path.dirname(argv.dirname + '\\' + files[i]),
                fileName = path.basename(files[i]),
                newFileName = fileName.replace(re, argv.replace),
                oldPath = path.join(dirName, fileName),
                newPath = path.join(dirName, newFileName);

            console.log(oldPath + '   --------->   ' + newPath);
            fs.rename(oldPath, newPath, function (err) {
                if (err)
                    console.error(err);
            });
        }
    });
})();