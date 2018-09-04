import Show from '../models/show';

export const saveShowsToDatabase = async (showsList) => {
    const promiseArray = showsList.map((show) => {
      if (!show.product_id) reject('Bad input.')

      return new Promise((resolve, reject) => {
      Show.findOne({ product_id: show.product_id }, (err, foundShow) => {
        if (err) reject('Error finding show.');

         if (!foundShow) {
          const newShow = new Show({
            product_id: show.product_id,
            handle: show.handle,
            updated_at: show.updated_at,
            title: show.title,
            variants: show.variants,
            vendor: show.vendor,
          }) 
  
          newShow.save((err) => {
            if (err) reject(err)
            resolve('Show saved!')
          })
        } else {
          resolve('Show already exists, move on.')
        }
      })
      })
    }) 
    
   await Promise.all(promiseArray)
}

export const fetchShowsFromDatabase = async () => {
  console.log('fetch shows from')
  const results = await Show.find({})

  if (!results || results.length < 1) {
    return null
  };

  return results;
}