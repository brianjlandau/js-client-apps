define(["views/article_list_item", "timeago"], function(ArticleListItem){
  var ArticleList = Backbone.View.extend({
    tagName:   "ol",
    className: "articles",

    initialize: function(){
      this.render();
      this.listenTo(this.collection, 'add', this.render);
      this.articleListItems = [];
      this.listenTo(Backbone, 'login', this.showUpvotes);
      this.listenTo(Backbone, 'logout', this.hideUpvotes);
    },

    render: function(){
      this.removeListItems();

      this.collection.each(function(article){
        var listItem = new ArticleListItem({model: article});
        
        this.articleListItems.push(listItem);
        this.$el.append(listItem.el);
      }.bind(this));
      
      this.$('time.timeago').timeago();
    },

    remove: function(){
      this.removeListItems();
      Backbone.View.prototype.remove.apply(this, arguments);
    },

    removeListItems: function(){
      _.each(this.articleListItems, function(listItem){ listItem.remove(); });
      this.articleListItems = [];
    },

    showUpvotes: function(){
      this.$("a.upvote").show();
    },

    hideUpvotes: function(){
      this.$("a.upvote").hide();
    }
  });

  return ArticleList;
});
