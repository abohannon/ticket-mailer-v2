export const fetchHelper = async (endpoint, options) => {
  const response = await fetch(endpoint, options);
  const json = await response.json();
  const payload = response.ok ? json : null;

  return payload;
};

export const formatUrlString = string => string.replace(/\W+/g, '-').toLowerCase();
