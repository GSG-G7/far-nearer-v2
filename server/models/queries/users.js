const base = require('../config');

exports.getUsers = async () => {
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
    .select({ view: 'Grid view' })
    .eachPage(processPage);

  return records;
};
