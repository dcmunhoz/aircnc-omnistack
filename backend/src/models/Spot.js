const { Schema, model } = require('mongoose');
const ip = require('ip');



const SpotSchema = new Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: {
        virtuals: true
    }
});

SpotSchema.virtual('thumbnail_url').get(function() {
    return `http://${ip.address()}:3333/files/${this.thumbnail}`
})

module.exports = model("Spot", SpotSchema);