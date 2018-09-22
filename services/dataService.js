import Show from '../models/show';

// TODO: Need check for updated_at
export const saveShowsToDatabase = async (showsList, collection_id) => {
  const promiseArray = showsList.map((show) => {
    if (!show.product_id) throw new Error('Bad input.');

    return new Promise((resolve, reject) => {
      Show.findOne({ product_id: show.product_id }, (err, foundShow) => {
        if (err) reject(new Error('Error finding show.'));
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
          });

          newShow.save((saveErr) => {
            if (saveErr) reject(saveErr);
            resolve('Show saved!');
          });
        } else if (collection_id && !foundShow.collection_id) {
          foundShow.collection_id = collection_id;

          foundShow.save((saveErr) => {
            if (saveErr) reject(saveErr);
            resolve('Show updated!');
          });
        } else {
          resolve('Show already exists. Moving on.');
        }
      });
    });
  });

  await Promise.all(promiseArray);
};

export const fetchShowsFromDatabase = async (collection_id) => {
  const query = collection_id ? { collection_id } : {};

  const results = await Show.find(query).exec();

  if (!results || results.length < 1) {
    return null;
  }

  return results;
};

export const filterOrdersByVariantId = (orders, id) => {
  if (!Array.isArray(orders)) throw new Error('Param "orders" must be an array');

  return orders.reduce((filtered, order) => {
    order.line_items.forEach((item) => {
      if (item.variant_id == id) {
        filtered.push(order);
      }
    });
    return filtered;
  }, []);
};
