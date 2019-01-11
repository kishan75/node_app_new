var express = require('express');
var router = express.Router();
var joi = require("joi");

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', {
    title: 'nameAge'
  });
});

var nameAgeController = require("../controller/nameAgeController");

router.get('/all', function (req, res) {
  nameAgeController.getAll(req, res);
});
router.get('/byName', function (req, res) {
  nameAgeController.getByName(req, res);
});
router.get('/byAge', function (req, res) {
  nameAgeController.getByAge(req, res);
});
router.post('/create', function (req, res) {
  nameAgeController.create(req, res);
});
router.post('/updateName', function (req, res) {
  nameAgeController.updateName(req, res);
});
router.post('/updateAge', function (req, res) {
  nameAgeController.updateAge(req, res);
});
router.post('/delete', function (req, res) {
  nameAgeController.delete(req, res);
});

module.exports = router;