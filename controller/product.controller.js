const Productquery = require("../product/query/product.query");
const cloudinary = require("./../");

function add(req, res, next) {
  let data = req.body;
  data.user = req.loggedUser.id;
  if (req.fileErr) {
    return next("Invalid file format");
  }
  if (req.file) {
    data.image = req.file.filename;
  }
  Productquery.insert(data)
    .then(function () {
      res.status(200).send("done");
    })
    .catch((err) => next("product add error"));
}

function fetchall(req, res, next) {
  Productquery.find({ pageSize: req.query.pagesize, pageNumber: req.query.pagenumber }, {})
    .then(function (data) {
      res.status(200).json(data);
    })
    .catch(() => next("product fetch error"));
}

function fetchUserproduct(req, res, next) {
  Productquery.find(
    { pageSize: req.query.pagesize, pageNumber: req.query.pagenumber },
    { user: req.loggedUser._id }
  )
    .then(function (data) {
      res.status(200).json(data);
    })
    .catch(function () {
      next("product fetch error");
    });
}

function search(req, res, next) {
  Productquery.search([
    {
      $search: {
        autocomplete: {
          query: `${req.query.name}`,
          path: "name",
        },
      },
    },
    {
      $project: {
        name: 1,
      },
    },
  ])
    .then((data) => res.json(data).status(200))
    .catch(() => next("error"));
}

function searchproduct(req, res, next) {
  Productquery.searchproduct(req.body, req.query.pagenumber)
    .then((data) => res.json(data).status(200))
    .catch(() => next("error"));
}

function fetchById(req, res, next) {
  Productquery.findById(req.params.id)
    .then(function (data) {
      res.status(200).json(data);
    })
    .catch(() => next("error"));
}

function update(req, res, next) {
  let id = req.params.id;
  let data = req.body;
  if (req.file) {
    data.image = req.file.filename;
  }
  Productquery.update(id, data)
    .then(function (done) {
      if (req.file && done.oldimage) {
        cloudinary.uploader.destroy(`Product-image/${done.oldimage}`);
      }
      res.status(200).send("done");
    })
    .catch(() => next("product update error"));
}

function remove(req, res, next) {
  Productquery.remove(req.params.id)
    .then(function () {
      res.status(200).send("done");
    })
    .catch(() => next("product deletion error"));
}

module.exports = {
  add,
  update,
  remove,
  fetchById,
  fetchall,
  fetchUserproduct,
  search,
  searchproduct,
};
