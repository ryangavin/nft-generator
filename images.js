import mergeImages from 'merge-images';
import Canvas from 'canvas';
import fs from 'fs';


/**
 * TODO what are the shapes of these things
 * traits shape defined in traits.js
 * images needs to group by trait name or something
 */
const generate = (traits, images) => {
    for (const generation in traits) {
        const imagesToMerge = [];
    }
};

const merge = async (images) => {
    const b64 = await mergeImages(images, {
        Canvas: Canvas.Canvas,
        Image: Canvas.Image
    });
    return b64.split(',')[1];
};

const writeBase64 = (b64, fileName) => {
    fs.writeFile(fileName, b64, {
        encoding: 'base64',
        flag: 'w'
    }, function(err) {
        if (err) console.log(err);
    });
};

const test = async () => {
    const b64 = await merge(['img/_0001_BG.png', 'img/_0002s_0003_BLUE.png', 'img/_0001s_0000_GREEN.png', 'img/_0000s_0000_STRIPES.png']);
    writeBase64(b64, 'tmp/out.png');
};

test();