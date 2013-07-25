define([
  "hbars!templates/articles/article_show",
  "models/comment",
  "upvotable_view",
  "form_with_errors",
  "views/articles/article",
  "timeago"
], function(template, Comment, UpvotableView, FormWithErrors){

  var ArticleShow = Backbone.View.extend({
    template: template,

    className: "article-with-comments",

    idNameBase: 'comment',

    events: {
      'click a.upvote': 'upvote'
    },

    initialize: function(){
      this.render();

      this.formModel = this.newComment();
      this.formWithErrorsInitialize();

      this.upvotableInitialization();
    },

    render: function(){
      this.$el.html( this.template(this.model.toJSON()) );
      
      this.$('time.timeago').timeago();
    },

    success: function(model, xhr, option){
      this.clearErrors();

      this.formModel = this.newComment();
      this.formWithErrorsInitialize();

      this.$('#comment-body').val('');

      this.updateCommentCount();

      Backbone.trigger("notify", "Your comment has been created.", "success");
    },

    updateCommentCount: function(){
      var $commentCount = this.$('.article .comment-count'),
          commentCount = this.model.get("comment_count"),
          newCommentCount = commentCount + 1;
      $commentCount.text(newCommentCount);
      this.model.set("comment_count", newCommentCount);
    },

    newComment: function(){
      return new Comment({parent_id: this.model.id, parent_type: 'Article'})
    },

    getUpvoteable: function(){
      return this.model;
    }
  });

  ArticleShow = ArticleShow.extend(UpvotableView);
  ArticleShow = ArticleShow.extend(FormWithErrors);

  return ArticleShow;
});
