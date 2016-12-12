import client from './index';

export default (hash) => ({
  exists(field) {
    return client.hexistsAsync(hash, field)
      .catch(err => console.log(err));
  },
  set(field, value) {
    return client.hsetAsync(hash, field, JSON.stringify(value));
  },
  mset(data) {
    return client.hmset(hash, data.reduce((prev, curr) => [
      ...prev,
      JSON.stringify(curr.id), 
      JSON.stringify(curr),
    ], []));
  },
  get(field) {
    return client.hgetAsync(hash, field)
      .then(res => JSON.parse(res) || null)
      .catch(err => console.log(err));
  },
  getAll() {
    return client.hgetallAsync(hash)
      .then(data => {
        if (data) {
          return Object.keys(data)
            .map(x => JSON.parse(data[x]))
        }
        return;
      })
      .catch(err => console.log(err));
  },
  del(field) {
    return client.hdelAsync(hash, field);
  }
});
