import shopify from './shopifyService';

export const searchMetafields = (metafieldsList, key, value) => {
  if (!key || !value) throw new Error('Must provide a key and value.');

  return metafieldsList.filter(metafield => metafield[key] === value);
};

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

    if (!result || Object.keys(result).length < 1) throw new Error('Error creating metafield');

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

export const filterMetafields = arr => arr.reduce((acc, item) => {
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
