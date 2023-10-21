const mongoose = require('mongoose');

const catalogSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 10 },
  type: { type: String, required: true, minLength: 2 },
  production: { type: String, required: true, minLength: 2, unique: true },
  exploitation: { type: String, required: true, minLength: 2, unique: true },
  damages: { type: String, required: true, minLength: 10 },
  description: { type: String, required: true, minLength: 10, maxLength: 200 },
  image: {
    type: String, required: true,
    match: [/^https?:\/\/.+/, 'Provide valid electronic image link!']
  },
  price: { type: String, required: true, number: true },
  buttons: { type: String, ref: 'User' },
});

const Catalog = mongoose.model('Catalog', catalogSchema);
module.exports = Catalog;