define(function(){
  var App = Backbone.Router.extend({
    routes: {
      "":        'articleList',
      "account": "showAccountInfo"
    },

    index: function(){
      this.renderLayout(function(){
        $('#content').empty();
        console.log("INDEX");
      }.bind(this));
    },

    renderLayout: function(callback){
      if (!this.layout){
        require(['views/layout'], function(Layout){
          this.layout = new Layout({el: $('#main').get(0)});
          callback();
        }.bind(this));
      } else {
        callback();
      }
    }
  });

  var actions = [
    {
      name: "articleList",
      requirements: ["views/article_list", "collections/articles"],
      action: function(ArticleList, Articles){
        console.log("ARTICLES LIST");
        var articles = new Articles, articleList;
        articles.fetch({
          success: function(collection){
            articleList = new ArticleList({collection: collection});
            this.layout.setContent(articleList);
          }.bind(this)
        });
      }
    },
    {
      name: "showAccountInfo",
      requirements: ["views/account_info"], 
      action: function(AccountInfoView){
        console.log("ACCOUNT INFO");
        var account = currentSession.currentAccount,
            accountView = new AccountInfoView({model: account});
        this.layout.setContent(accountView);
      }
    }
  ]

  _.each(actions, function(action){
    App.prototype[action.name] = function(){
      this.renderLayout(function(){
        require(action.requirements, action.action.bind(this));
      }.bind(this));
    };
  });

  return App;
});
