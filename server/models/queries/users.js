const base = require('../config');

exports.getUsers = async () => {
  let records = [];

  const processPage = (partialRecords, fetchNextPage) => {
    records = [
      ...records,
      ...partialRecords.map(record => ({
        email: record.fields.email,
        password: record.fields.password,
      })),
    ];
    fetchNextPage();
  };

  await base('users')
    .select({ view: 'Grid view' })
    .eachPage(processPage);

  return records;
};
