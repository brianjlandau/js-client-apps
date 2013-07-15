define(["hbars!templates/article_list", "upvotable_view", "views/article", "timeago"], function(template, UpvotableView){
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

      this.upvotableInitialization();
    },

    render: function(){
      this.$el.html( this.template({
        articles: this.collection.toJSON(),
        isLoggedIn: currentSession.isLoggedIn()
      }) );
      
      this.$('time.timeago').timeago();
    },

    getUpvoteable: function(type, id){
      return this.collection.get(id);
    }
  });

  ArticleList = ArticleList.extend(UpvotableView);

  return ArticleList;
});
