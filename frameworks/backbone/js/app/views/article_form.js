define(["form_view", "hbars!templates/article_form"], function(FormView, template){
  var ArticleForm = FormView.extend({
    template: template,

    className: "article",

    idNameBase: 'article',

    success: function(model, xhr, option){
      app.navigate('', {trigger: true});
      Backbone.trigger("notify", "Your article has been saved.", "success")
      this.remove();
    }
  });

  return ArticleForm;
});
