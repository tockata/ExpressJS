let mongoose = require('mongoose')
let Tag = require('./Tag')
let imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
  description: { type: String, required: true, minLength: 5 },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }]
})

mongoose.model('Image', imageSchema)
module.exports = mongoose.model('Image')
