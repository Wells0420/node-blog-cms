
###
Article Route Modules
###
models = require("../models")
Article = models.Article
config = require("../config").config

# 增加新文章
exports.add = (req, res) ->
  article = new Article(
    title: req.body.title
    content: req.body.content
  )
  article.save (err) ->
    console.log err  if err
    res.redirect "/"



# 删除文章
exports.del = (req, res) ->
  Article.remove
    _id: req.param("id")
  , (err) ->
    res.send (if err then "ERR" + err else "Delete article success!")



# 修改文章
exports.update = (req, res) ->
  article =
    id: req.param("id")
    title: req.body.title
    content: req.body.content

  Article.update
    _id: article.id
  ,
    $set:
      title: article.title
      content: article.content
  , false, (err, num) ->
    throw err  if err
    console.log num + "article is update !"
    res.redirect "/edit/" + article.id



###
get all article data by JSON
###
exports.getAll = (req, res) ->
  if req.param("id")
    Article.findOne
      _id: req.param("id")
    , (err, result) ->
      res.json result

  else
    Article.find {}, (err, result) ->
      res.json result


exports.addnewartpage = (req, res) ->
  res.render "article_editer"
