let mongoose = require('mongoose')
let Image = require('./Image')
let tagSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 3 },
  creationDate: { type: Date, default: Date.now },
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }]
})

mongoose.model('Tag', tagSchema)
module.exports = mongoose.model('Tag')
