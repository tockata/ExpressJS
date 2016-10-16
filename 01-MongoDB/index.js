let instanodeDb = require('./instanode-db')
let mongoose = require('mongoose')
mongoose.Promise = global.Promise
let connection = 'mongodb://localhost:27017/testdb'
mongoose.connect(connection)

// NOTE: Uncomment function calling below one by one!

// Problem 3:
instanodeDb.saveImage({
  url: 'https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg',
  description: 'such cat much wow',
  tags: ['cat', 'kitty', 'cute', 'catstagram']
})

/** instanodeDb.saveImage({
  url: 'https://media.mnn.com/assets/images/2016/09/orange-kitten.jpg.653x0_q80_crop-smart.jpg',
  description: 'second cat',
  tags: ['cat', 'orange']
}) */

/** instanodeDb.saveImage({
  url: 'http://blog.caranddriver.com/wp-content/uploads/2016/09/Volkswagen-Electric-car-concept-123-626x383.jpg',
  description: 'Electric car',
  tags: ['car', 'electric']
}) */

// Problem 4:
// instanodeDb.findByTag('cat')

// Problem 5:
/** let minDate = (new Date()).setDate(15)
let maxDate = (new Date()).setDate(25)
instanodeDb.filter({after: minDate, before: maxDate, results: 24}) */
