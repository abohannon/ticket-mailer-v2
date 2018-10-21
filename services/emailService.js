// Generate recipient-specific variables.
export const generatePersonalizations = orders => new Promise((resolve, reject) => {
  if (!orders) return reject(new Error('Invalid input'));

  const personalizations = orders.map(order => ({
    to: order.email,
    dynamic_template_data: {
      name: order.name,
      order_number: order.orderNumber,
      bundle_qty: order.quantity,
    },
  }));

  return resolve(personalizations);
});
