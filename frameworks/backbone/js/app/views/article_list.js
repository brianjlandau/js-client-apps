define(["hbars!templates/article_list", "timeago"], function(template){
  var ArticleList = Backbone.View.extend({
    template: template,

    tagName:   "div",
    className: "articles",

    events: {},

    initialize: function(){
      this.render();
      this.listenTo(this.collection, 'add', this.render);
    },

    render: function(){
      this.$el.html( this.template({articles: this.collection.toJSON()}) );
      this.$('time.timeago').timeago();
    }
  });

  return ArticleList;
});
