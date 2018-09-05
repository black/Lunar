(function() {
    var { dialog } = require('electron').remote;
    var path = require('path');
    var fs = require('fs');

    let index = 0;
    let dirArray = [];
    let folder = "";
    let imgContainer = $('<img>');
    let divContainer = $('#preview');

    $('#readfile').on('click', function() {
        dialog.showOpenDialog({
            title: "Open Folder",
            filters: [{
                name: 'Images',
                extensions: ['png', 'jpg', 'jpeg', 'gif']
            }]
        }, function(fileNames) {
            if (fileNames === undefined) {
                console.log("no file is selected");
                return;
            } else {
                console.log('FN', fileNames[0]);
                let folderPath = path.dirname(fileNames[0]);
                console.log('FP', folderPath);
                folder = folderPath;
                fs.readdir(folderPath, function(err, dir) {
                    dirArray = dir;
                    for (let i = 0; i < dir.length; i++) {
                        dirArray[i] = fs.readFileSync(folder + '/' + dir[i]).toString('base64');;
                    }
                });
            }
        });
    });

    $('#prev').on('click', function() {
        if (index > 0) {
            index--;
            displayImages(dirArray[index]);
        } else {
            index = dirArray.length;
        }
    });
    $('#next').on('click', function() {
        if (index < dirArray.length) {
            index++;
            displayImages(dirArray[index]);
        } else {
            index = 0;
        }
    });

    $(document).keydown(
        function(e) {
            if (e.keyCode == 39) {
                // $("a:focus").next().focus();
                if (index < dirArray.length) {
                    index++;
                    displayImages(dirArray[index]);
                } else {
                    index = 0;
                } 
            }
            if (e.keyCode == 37) {
                // $("a:focus").prev().focus();
                if (index > 0) {
                    index--;
                    displayImages(dirArray[index]);
                } else {
                    index = dirArray.length;
                } 
            }
        }
    );

    function displayImages(loadImage) {
        imgContainer.attr({
            "class": 'preview-images',
            "src": "data:image/png;base64," + loadImage
        });
        divContainer.empty().append(imgContainer);
    }
})();