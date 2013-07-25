define(["text!templates/articles/article.mustache", "helpers/hide_upvote"], function(template){
  Handlebars.registerPartial('article', template);
});
