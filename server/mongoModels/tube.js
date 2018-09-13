const mongoose = require("mongoose");

const tubeSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    model: { type: String, required: true }
});

module.exports = mongoose.model("Tube", tubeSchema);
