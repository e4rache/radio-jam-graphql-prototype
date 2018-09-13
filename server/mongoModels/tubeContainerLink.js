const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tubeContainerLinkSchema = new Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    tubeId:
        { type: mongoose.Schema.Types.ObjectId, required: true },
    quantity: { type: Number, default: 1 },
    containerId:
        { type: mongoose.Schema.Types.ObjectId, required: true },
});

module.exports = mongoose.model("TubeContainerLink", tubeContainerLinkSchema);
