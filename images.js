import mergeImages from "merge-images";
import Canvas from "canvas";
import fs from "fs";


const generate = (traits, images) => {
    for (const generation in traits) {
        mergeImages([''], {
            Canvas: Canvas.Canvas,
            Image: Canvas.Image
        }).then(b64 => {
            console.log(b64);
        });
    }
};

const test = () => {
    mergeImages(['img/_0001_BG.png', 'img/_0002s_0003_BLUE.png', 'img/_0001s_0000_GREEN.png', 'img/_0000s_0000_STRIPES.png'], {
        Canvas: Canvas.Canvas,
        Image: Canvas.Image
    }).then(b64 => {
        fs.writeFile("tmp/out.png", b64.split(',')[1], {
            encoding: "base64",
            flag: "w"
        }, function(err) {
            if (err) console.log(err);
        });
    });
};

test();