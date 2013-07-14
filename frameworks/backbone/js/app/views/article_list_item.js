define(["hbars!templates/article_list_item", "models/vote"], function(template, Vote){
  var ArticleListItem = Backbone.View.extend({
    template: template,

    tagName:   "li",
    className: "article",

    events: {
      'click a.upvote': 'upvote'
    },

    initialize: function(){
      this.render();
    },

    render: function(){
      this.$el.html( this.template(_.extend(this.model.toJSON(), {
        isLoggedIn: currentSession.isLoggedIn()
      })) );
    },

    upvote: function(e){
      e.preventDefault();
      var vote = new Vote({target_id: this.model.id, target_type: 'Article'});
      vote.save({}, {success: this.updateVoteCount.bind(this)});
    },

    updateVoteCount: function(){
      var $pointsElm = this.$('.points'), points = parseInt($pointsElm.text());
      $pointsElm.text(points + 1);
    }
  });

  return ArticleListItem;
});
