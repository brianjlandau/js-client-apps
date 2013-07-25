define(function(){
  var App = Backbone.Router.extend({
    routes: {
      "":            "articleList",
      "account":     "showAccountInfo",
      "articles/:id": "showArticle"
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
    },

    showArticle: function(id){
      this.renderLayout(function(){
        require(["views/articles/article_show"], function(ArticleShow){
          console.log("ARTICLES SHOW");
          var article = articles.get(id),
              articleShow = new ArticleShow({model: article});
          this.layout.setContent(articleShow);
        }.bind(this));
      }.bind(this));
    }
  });

  var actions = [
    {
      name: "articleList",
      requirements: ["views/articles/article_list"],
      action: function(ArticleList, Articles){
        console.log("ARTICLES LIST");
        var articleList = new ArticleList({collection: articles});
        this.layout.setContent(articleList);
      }
    },
    {
      name: "showAccountInfo",
      requirements: ["views/account/account_info"], 
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
