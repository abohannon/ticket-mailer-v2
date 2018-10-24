export const emailSentMetafield = (resource, id) => ({
  key: 'email_sent',
  value: 'true',
  value_type: 'string',
  namespace: 'email',
  owner_resource: resource,
  owner_id: id,
});

export const emailFailedMetafield = (resource, id, value) => ({
  key: 'email_failed',
  value,
  value_type: 'string',
  namespace: 'email',
  owner_resource: resource,
  owner_id: id,
});

