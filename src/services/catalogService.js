const Catalog = require('../model/Catalog');

exports.create = (createData) => Catalog.create(createData);

exports.getAll = () => Catalog.find();

exports.singleCatalog = (catalogId) => Catalog.findById(catalogId);

exports.update = (catalogId, createData) => Catalog.findByIdAndUpdate(catalogId, createData);

exports.delete = (catalogId) => Catalog.findByIdAndDelete(catalogId);
