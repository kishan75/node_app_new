var joi = require("joi");
var nameAge = require("../model/nameAgeModel");
var nameAgeArray = [];
var nameAgeController = {};

nameAgeController.getAll = function getAll(req, res) {
    if (nameAgeArray.length == 0) {
        res.status(400).render("error.ejs", {
            error: "no data exist"
        });
    } else {
        res.status(200).render("result.ejs", {
            data: nameAgeArray
        });
    }
};

nameAgeController.getByName = function getByName(req, res) {
    var validation = {
        name: joi.string().min(1).required()
    };
    if (joi.validate(req.query, validation).error) {
        res.status(404).render("error.ejs", {
            error: "invalid input"
        });
    }

    function resultArray(array) {
        var tempArray = [];
        array.forEach(function (element) {
            if (element.name == req.query.name) // find object that has same name
                tempArray.push(element);
        });
        return tempArray;
    }
    if (resultArray(nameAgeArray).length == 0) {
        res.status(400).render("error.ejs", {
            error: "no data found"
        });
    } else {
        res.status(200).render("result.ejs", {
            data: resultArray(nameAgeArray)
        });
    }
};

nameAgeController.getByAge = function getByAge(req, res) {
    var validation = {
        age: joi.number().integer().required()
    };
    if (joi.validate(req.query, validation).error) {
        res.status(404).render("error.ejs", {
            error: "invalid input"
        });
    }

    function resultArray(array) {
        var tempArray = [];
        array.forEach(function (element) {
            if (element.age == req.query.age) // find object that has same age
                tempArray.push(element);
        });
        return tempArray;
    }
    if (resultArray(nameAgeArray).length == 0) {
        res.status(400).render("error.ejs", {
            error: "no data found"
        });
    } else {
        res.status(200).render("result.ejs", {
            data: resultArray(nameAgeArray)
        });
    }
};

nameAgeController.create = function create(req, res) {
    var validation = {
        name: joi.string().min(1).required(),
        age: joi.number().min(0).integer().required()
    };
    if (joi.validate(req.body, validation).error) {
        res.status(404).render("error.ejs", {
            error: "invalid input"
        });
    } else {
        nameAgeArray.push(nameAge(req.body.name, req.body.age));
        res.status(200).render("result.ejs", {
            data: "data inserted successfully"
        });
    }
};

nameAgeController.updateName = function updateName(req, res) {
    var validation = {
        age: joi.number().integer().required(),
        oldName: joi.string().min(1).required(),
        newName: joi.string().min(1).required()
    };
    if (joi.validate(req.body, validation).error) {
        res.status(404).render("error.ejs", {
            error: "invalid input"
        });
        return;
    }
    var position = nameAgeArray.findIndex(element => element.name == req.body.oldName && element.age == req.body.age);
    if (position == -1) {
        res.status(404).render("error.ejs", {
            error: "invalid input"
        });
    } else {
        nameAgeArray[position] = nameAge(req.body.newName, req.body.age);
        res.status(200).render("result.ejs", {
            data: "data updated successfully"
        });
    }
};

nameAgeController.updateAge = function updateAge(req, res) {
    var validation = {
        oldAge: joi.number().integer().required(),
        newAge: joi.number().integer().required(),
        name: joi.string().min(1).required()
    };
    if (joi.validate(req.body, validation).error) {
        res.status(404).render("error.ejs", {
            error: "invalid input"
        });
        return;
    }
    var position = nameAgeArray.findIndex(element => element.name == req.body.name && element.age == req.body.oldAge);
    if (position == -1) {
        res.status(404).render("error.ejs", {
            error: "invalid input"
        });
    } else {
        nameAgeArray[position] = nameAge(req.body.name, req.body.newAge);
        res.status(200).render("result.ejs", {
            data: "data updated successfully"
        });
    }
};

nameAgeController.delete = function remove(req, res) {
    var validation = {
        name: joi.string().min(1).required(),
        age: joi.number().min(0).integer().required()
    };
    if (joi.validate(req.body, validation).error) {
        res.status(404).render("error.ejs", {
            error: "invalid input"
        });
        return;
    }
    var position = nameAgeArray.findIndex(element => element.name == req.body.name && element.age == req.body.age);
    if (position == -1) {
        res.status(404).render("error.ejs", {
            error: "data not found"
        });
    } else {
        nameAgeArray.splice(position, 1);
        res.status(200).render("result.ejs", {
            data: "data deleted successfully"
        });
    }
};

module.exports=nameAgeController;