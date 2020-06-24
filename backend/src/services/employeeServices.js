var pool = require("../config/connections");
module.exports = {
  save: async function (req, res) {
    let body = {
      name: req.body.name,
      phone: req.body.phone,
      company: req.body.company,
      sector: req.body.sector,
      role: req.body.role,
      email: req.body.email,
      created: req.body.created,
      updated: req.body.updated,
    }; //Param body
    try {
      await daoSave(`INSERT INTO employees SET ?`, [body], res);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  update: async function (req, res) {
    if (!req.query.id) {
      res.status(500).json({ status: 400, message: "not found id" });
      return;
    }
    let body = {
      name: req.body.name,
      phone: req.body.phone,
      company: req.body.company,
      sector: req.body.sector,
      email: req.body.email,
      role: req.body.role,
      updated: req.body.updated,
    }; //Param body
    try {
      await daoSave(
        `UPDATE  employees SET ? WHERE id = ?`,
        [body, req.query.id],
        res
      );
    } catch (error) {
      res.status(500).json(error);
    }
  },
  get: async function (req, res) {
    try {
      await daoSelect(
        `SELECT emp.* FROM employees emp ORDER BY emp.name asc`,
        res
      );
    } catch (error) {
      res.status(500).json({ status: 500, message: error });
    }
  },
  delete: async function (req, res) {
    if (!req.query.id) {
      res.status(500).json({ status: 400, message: "not found id" });
      return;
    }
    try {
      await daoSelect(`DELETE FROM employees WHERE id = ${req.query.id}`, res);
    } catch (error) {
      res.status(500).json({ status: 500, message: error });
    }
  },
};
/*
  querySQL : String query SQL
  res: http response
*/
const daoSelect = async (querySQL, res) => {
  return pool.getConnection(function (err, connection) {
    if (err) {
      return res.status(500).json({ status: 500, message: err });
    }
    connection.query(querySQL, function (error, results) {
      if (error) return res.status(500).json({ status: 500, message: error });
      if(results.length === 0){
        res.json({ status: 404, message: 'Not Found' });
      }else{
        res.json({ status: 200, data: results });
      }
      
      connection.destroy();
    });
  });
};
/*
  querySQL : String query SQL
  param: object ou arrays of element
  res: http response
*/
const daoSave = async (querySQL, param, res) => {
  pool.getConnection(function (err, connection) {
    if (err) {
      return res.status(500).json({ status: 500, message: err });
    }
    connection.beginTransaction(function (err) {
      if (err) {
        return res.status(500).json({ status: 500, message: err });
      }
    });
    connection.query(querySQL, param, function (error, results) {
      if (error) {
        return connection.rollback(function () {
          return res.status(500).json({ status: 500, message: error });
        });
      }
      connection.commit(function (err) {
        if (err) {
          return connection.rollback(function () {
            return res.status(500).json({ status: 500, message: err });
          });
        }
      });
      return res.json({ status: 200, data: results });
    });
  });
};
