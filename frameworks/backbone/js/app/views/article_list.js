define(["hbars!templates/article_list", "models/vote", "timeago", 'helpers/hide_upvote'], function(template, Vote){
  var ArticleList = Backbone.View.extend({
    template: template,

    tagName:   "ol",
    className: "articles",

    events: {
      'click a.upvote': 'upvote'
    },

    initialize: function(){
      this.render();

      this.listenTo(this.collection, 'add', this.render);

      this.listenTo(Backbone, 'login', this.render);
      this.listenTo(Backbone, 'logout', this.hideUpvotes);
    },

    render: function(){
      this.$el.html( this.template({
        articles: this.collection.toJSON(),
        isLoggedIn: currentSession.isLoggedIn()
      }) );
      
      this.$('time.timeago').timeago();
    },

    upvote: function(e){
      var $article = $(e.currentTarget).closest('.article'),
          vote = new Vote({target_id: $article.data('id'), target_type: 'Article'});
      e.preventDefault();
      vote.save({}, {success: this.updateVoteCount.bind($article)});
    },

    showUpvotes: function(){
      this.$("a.upvote").removeClass('hide');
    },

    hideUpvotes: function(){
      this.$("a.upvote").addClass('hide');
    },

    updateVoteCount: function(){
      var $pointsElm = this.find('.points'), points = parseInt($pointsElm.text());
      $pointsElm.text(points + 1);
      this.find('a.upvote').addClass('hide');
    }
  });

  return ArticleList;
});
