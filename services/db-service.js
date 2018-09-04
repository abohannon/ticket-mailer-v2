import Show from '../models/show';

export const saveShowsToDatabase = (showsList) => {
  showsList.forEach((show) => {
    Show.findOne({ product_id: show.product_id }, (err, foundShow) => {
      if (err) throw new Error({ message: 'Error finding show', error: err })

      // if show already exists, skip it
      if (foundShow) {
        return console.log('Show already exists')
      }

      // if show doesn't exist in the DB, save it
      if (!foundShow) {
        const newShow = new Show({
          product_id: show.product_id,
          handle: show.handle,
          updated_at: show.updated_at,
          title: show.title,
          variants: show.variants,
          vendor: show.vendor,
        }) 

        console.log(`${show.product_id} saved!`)
        return newShow.save()
      }
    })
  })
}

export const fetchShowsFromDatabase = () => {
  Show.find({}, (err, result) => {
    if (err) throw new Error({ message: 'Error fetching shows from database', error: err })

    if (!result) {
      return { message: 'No shows found.'}
    }

    console.log(result)
  })
}