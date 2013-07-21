config = require("../config").config
fs = require("fs")
article = require("./article")
models = require("../models")
async = require("async")
exports.admin = (req, res) ->
  username = (if req.session.username then req.session.username else null)
  (if not username then res.render("login",
    config: config
    admin: true
  ) else ->
    res.render "dash_dashboard",
      config: config
      username: req.session.username

  ())

exports.siteOption = (req, res) ->
  options =
    site_name: req.body.site_name
    site_author: req.body.meta_author
    site_keywords: req.body.meta_keywords
    site_description: req.body.meta_description

  async.waterfall [(callback) ->
    config.site_name = options.site_name
    config.site_author = options.site_author
    config.site_keywords = options.site_keywords
    config.site_description = options.site_description
    callback null, config
  , (config, callback) ->
    fs.writeFile "./config.json", JSON.stringify(config), (err) ->
      throw err  if err
      callback success: true

  ], (err, result) ->
    console.log err  if err
    res.redirect "/siteoption"


exports.renderArticleList = (req, res) ->
  async.waterfall [(callback) ->
    models.Article.find {}, (err, data) ->
      throw err  if err
      callback null, data

  ], (err, result) ->
    res.render "dash_articleList",
      articles: result



exports.renderArticleEdit = (req, res) ->
  aid = req.param("id")
  async.waterfall [(callback) ->
    models.Article.findOne
      _id: aid
    , {}, (err, data) ->
      throw err  if err
      callback null, data

  ], (err, result) ->
    console.log result
    throw err  if err
    res.render "article_editer",
      article: result


