var express = require('express');
var router = express.Router();
var employeeService = require("../services/employeeServices")

router.get('/', function(req, res) {
  employeeService.get(req, res)
});
router.post('/save', function(req, res) {
  employeeService.save(req, res)
});
router.put('/update', function(req, res) {
  employeeService.update(req, res)
});
router.delete('/', function(req, res) {
  employeeService.delete(req, res)
});
router.get('/search', function(req, res) {
  employeeService.search(req, res)
});
module.exports = router;
