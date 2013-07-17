jQuery(document).ready(function($) {
  var zTreeNodes = [
    {'name':'全局设置',nodes:[
      {'name':'整站设置','url':'/siteoption','target':'_self'}
    ]}, 
    {'name':'文章设置',nodes:[
      {'name':'添加文章','url':'/addnewarticle','target':'_self'},
      {'name':'文章列表','url':'/articleslist','target':'_self'}
    ]},
    {'name':'用户设置',nodes:[
      {'name':'用户列表','url':'#','target':'_self'},
    ]},
    {'name':'电子邮件',nodes:[
      {'name':'邮箱设置','url':'#','target':'_self'},
      {'name':'新建邮件','url':'#','target':'_self'},
      {'name':'邮件列表','url':'#','target':'_self'}
    ]}
  ];
  // ztree settings:
  var settings = {};
  if ($('#tree').length!=0) {
    $('#tree').zTree(settings,zTreeNodes);
  }
});
