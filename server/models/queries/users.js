const base = require('../config');

exports.getUsers = async email => {
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

  return records;
};
