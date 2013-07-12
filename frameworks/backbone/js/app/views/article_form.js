define(["form_view", "hbars!templates/article_form"], function(FormView, template){
  var ArticleForm = FormView.extend({
    template: template,

    idNameBase: 'article',

    success: function(model, xhr, option){
      this.closeAndNotifyOfSuccess("Your article has been saved.");
    }
  });

  return ArticleForm;
});
