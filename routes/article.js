// Generated by CoffeeScript 1.6.3
/*
Article Route Modules
*/


(function() {
  var Article, config, models;

  models = require("../models");

  Article = models.Article;

  config = require("../config").config;

  exports.add = function(req, res) {
    var article;
    article = new Article({
      title: req.body.title,
      content: req.body.content
    });
    return article.save(function(err) {
      if (err) {
        console.log(err);
      }
      return res.redirect("/");
    });
  };

  exports.del = function(req, res) {
    return Article.remove({
      _id: req.param("id")
    }, function(err) {
      return res.send((err ? "ERR" + err : "Delete article success!"));
    });
  };

  exports.update = function(req, res) {
    var article;
    article = {
      id: req.param("id"),
      title: req.body.title,
      content: req.body.content
    };
    return Article.update({
      _id: article.id
    }, {
      $set: {
        title: article.title,
        content: article.content
      }
    }, false, function(err, num) {
      if (err) {
        throw err;
      }
      console.log(num + "article is update !");
      return res.redirect("/edit/" + article.id);
    });
  };

  /*
  get all article data by JSON
  */


  exports.getAll = function(req, res) {
    if (req.param("id")) {
      return Article.findOne({
        _id: req.param("id")
      }, function(err, result) {
        return res.json(result);
      });
    } else {
      return Article.find({}, function(err, result) {
        return res.json(result);
      });
    }
  };

  exports.addnewartpage = function(req, res) {
    return res.render("article_editer");
  };

}).call(this);
