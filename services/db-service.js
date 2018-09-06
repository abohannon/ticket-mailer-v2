import Show from '../models/show';

//TODO: Need check for updated_at
export const saveShowsToDatabase = async (showsList, collection_id) => {
    const promiseArray = showsList.map((show) => {
      if (!show.product_id) reject('Bad input.')

      return new Promise((resolve, reject) => {
        Show.findOne({ product_id: show.product_id }, (err, foundShow) => {
          if (err) reject('Error finding show.');
          /* 
          * If show doesn't exist in the DB, add it.
          * Else if the show exists, but doesn't have a collection_id yet, update it.
          */
          if (!foundShow) {
            const newShow = new Show({
              product_id: show.product_id,
              collection_id: collection_id || null,
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
          } else if (collection_id && !foundShow.collection_id) {
            foundShow.collection_id = collection_id;  

            foundShow.save((err) => {
              if (err) reject(err)
              resolve('Show updated!')
            })
          }
          
          resolve('Show already exists, move on.')
        })
      })
    }) 
    
   await Promise.all(promiseArray)
}

// TODO: Need to check for collection_id
export const fetchShowsFromDatabase = async () => {

  const results = await Show.find({})

  if (!results || results.length < 1) {
    return null
  };

  return results;
}