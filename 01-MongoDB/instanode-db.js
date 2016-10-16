let Tag = require('./models/Tag')
let Image = require('./models/Image')

module.exports.saveImage = (data) => {
  let image = new Image({
    url: data.url,
    description: data.description,
    tags: []
  })

  getTags(data.tags, function (tags) {
    image.tags = tags
    image.save()
      .then(image => {
        for (let i = 0; i < tags.length; i++) {
          tags[i].images.push(image)
          tags[i].save()
        }
      })
  })
}

module.exports.findByTag = (tag) => {
  Tag.findOne({ name: tag })
    .populate({
      path: 'images',
      options: ({ sort: '-creationDate' }),
      select: ('url description creationDate')
    })
    .exec()
    .then(tagInDb => {
      console.log(tagInDb.images)
    })
}

module.exports.filter = (filterData) => {
  if ((filterData.after === undefined || filterData.after === null || filterData.after === '') &&
    (filterData.before === undefined || filterData.before === null || filterData.before === '')) {
    Image.find()
    .populate({
      path: 'tags',
      select: ('name')
    })
    .select('url description creationDate tags')
    .limit(filterData.results ? filterData.results : 10)
    .exec()
    .then(images => {
      printImages(images)
    })
  } else if (filterData.after && (filterData.before === undefined || filterData.before === null || filterData.before === '')) {
    Image.find()
    .where('creationDate').gte(filterData.after)
    .populate({
      path: 'tags',
      select: ('name')
    })
    .select('url description creationDate tags')
    .limit(filterData.results ? filterData.results : 10)
    .exec()
    .then(images => {
      printImages(images)
    })
  } else if ((filterData.after === undefined || filterData.after === null || filterData.after === '') && filterData.before) {
    Image.find()
    .where('creationDate').lte(filterData.before)
    .populate({
      path: 'tags',
      select: ('name')
    })
    .select('url description creationDate tags')
    .limit(filterData.results ? filterData.results : 10)
    .exec()
    .then(images => {
      printImages(images)
    })
  } else {
    Image.find()
    .where('creationDate').gte(filterData.after).lte(filterData.before)
    .populate({
      path: 'tags',
      select: ('name')
    })
    .select('url description creationDate tags')
    .limit(filterData.results ? filterData.results : 10)
    .exec()
    .then(images => {
      printImages(images)
    })
  }
}

function getTags (tagStrings, callback) {
  let tags = []
  let asyncCompleted = []
  if (tagStrings && tagStrings.length !== 0) {
    for (let i = 0; i < tagStrings.length; i++) {
      (function (tagString, index) {
        Tag.findOne({ name: tagString })
        .exec()
        .then(tagInDb => {
          if (tagInDb == null) {
            asyncCompleted.push(false)
            new Tag({ name: tagString })
              .save()
              .then(tag => {
                asyncCompleted.pop()
                tags.push(tag)
                if (index === tagStrings.length - 1 && asyncCompleted.length === 0) {
                  callback(tags)
                }
              })
          } else {
            tags.push(tagInDb)
            if (index === tagStrings.length - 1) {
              callback(tags)
            }
          }
        })
      })(tagStrings[i], i)
    }
  }
}

function printImages (images) {
  if (images.length === 0) {
    console.log('No images found')
  } else {
    images.forEach(function (image) {
      console.log('Url: ' + image.url + ';')
      console.log('Description: ' + image.description + ';')
      console.log('Created at: ' + image.creationDate + ';')
      console.log('Tags:')
      for (let i = 0; i < image.tags.length; i++) {
        console.log((i + 1) + '.  ' + image.tags[i].name)
      }

      console.log()
    }, this)
  }
}
