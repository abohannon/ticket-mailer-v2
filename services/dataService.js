import shopify from './shopifyService';

export const generatePersonalizations = orders => new Promise((resolve, reject) => {
  if (!orders) return reject(new Error('Invalid input'));

  const personalizations = orders.map(order => ({
    to: order.email,
    substitutions: {
      name: order.name,
      orderNumber: order.orderNumber,
    },
  }));

  return resolve(personalizations);
});


export const createMetafield = async (data) => {
  const {
    key,
    value,
    value_type,
    namespace,
    owner_resource,
    owner_id,
  } = data;

  try {
    const result = await shopify.metafield.create({
      key,
      value,
      value_type,
      namespace,
      owner_resource,
      owner_id,
    });

    return { status: 'success', data: result };
  } catch (err) {
    return { status: 'error', error: err };
  }
};

export const fetchMetafields = async (owner_resource, owner_id) => {
  const metafields = await shopify.metafield.list({
    metafield: {
      owner_resource,
      owner_id,
    },
  });

  return metafields;
};

export const filterMetafields = obj => obj.reduce((acc, item) => {
  acc[item.key] = item.value;
  return acc;
}, {});

export const mergeMetafields = (metafields, object) => {
  for (const key in metafields) {
    if (metafields.hasOwnProperty(key)) {
      object[key] = metafields[key];
    }
  }
};

export const addMetafieldsToShows = showsList => Promise.all(showsList.map(async (show) => {
  await Promise.all(show.variants.map(async (variant) => {
    const metafields = await fetchMetafields('variant', variant.id);
    const filtered = filterMetafields(metafields);

    if (Object.keys(filtered).length > 0) {
      mergeMetafields(filtered, variant);
    }
  }));
  return show;
}));

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
