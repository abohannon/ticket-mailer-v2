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
