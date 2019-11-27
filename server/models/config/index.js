const Airtable = require('airtable');

const base = Airtable.base(process.env.AIRTABLE_BASE_ID);

module.exports = base;
