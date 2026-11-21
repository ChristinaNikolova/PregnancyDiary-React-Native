const { Schema, model } = require("mongoose");

const pictureSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true
    }
});

const Picture = model("Picture", pictureSchema);
module.exports = Picture;
