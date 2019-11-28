const base = require('../config');

exports.postUsers = ({ email, hashPassword, username }) => {
  return base('users').create([
    {
      fields: {
        email,
        password: hashPassword,
        username,
      },
    },
  ]);
};
exports.getUserByEmail = async email => {
  let records = [];

  const processPage = (partialRecords, fetchNextPage) => {
    records = [
      ...records,
      ...partialRecords.map(record => ({
        id: record.id,
        ...record.fields,
      })),
    ];
    fetchNextPage();
  };

  await base('users')
    .select({
      view: 'Grid view',
      filterByFormula: `AND(IF(email = '${email}', TRUE(), FALSE()),NOT({email}=''))`,
    })
    .eachPage(processPage);

  return records[0];
};

exports.getUserById = id => {
  return base('users').find(id);
};
