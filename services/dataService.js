import shopify from './shopifyService';
import { emailSentMetafield } from '../helpers/metafieldHelpers';

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


export const searchMetafields = (metafieldsList, key, value) => {
  if (!key || !value) throw new Error('Must provide a key and value.');

  return metafieldsList.filter(metafield => metafield[key] === value);
};

/**
 * @param {Object} data - With properties required by shopify API
 * @param {string} data.key - Metafield key. i.e. how you want to reference the metafield
 * @param {string} data.value - Value of metafield. i.e. the value of the above key
 * @param {string} data.value_type - Data type of data.value
 * @param {string} namespace - The category for this metafield
 * @param {string} owner_resource - Shopify resource. i.e. product, variant, order, etc.
 * @param {string} owner_id - Unique id of the resource the metafield will be attached to
 * @return {Object} Status and created metafield
 */
export const createMetafield = async (data) => {
  try {
    const result = await shopify.metafield.create(data);

    if (!result || Object.keys(result).length < 1) throw new Error('Error creating metafield');

    return { status: 'success', data: result };
  } catch (err) {
    return { status: 'error', error: err };
  }
};

// TODO: Need to test
export const updateMetafield = async (data) => {
  const { id, ...rest } = data;

  try {
    const result = await shopify.metafield.update(id, rest);

    if (!result || Object.keys(result).length < 1) throw new Error('Error updating metafield');

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

// TODO: Implement in data controller
export const updateMetafieldsForOrders = async (orders, key, value) => Promise.all(orders.map(async (order) => {
  const metafields = await fetchMetafields('order', order.id);

  await Promise.all(metafields.map(async (metafield) => {
    if (!metafield.key) {
      const response = await createMetafield(emailSentMetafield('order', order.id));

      if (response.status !== 'success') {
        throw new Error(`Problem creating metafield for order id: ${order.id}`);
      }
    }
  }));
}));
