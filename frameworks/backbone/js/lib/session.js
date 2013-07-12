define(["models/session", "models/account"], function(ModelSession, Account){
  var Session = {
    login: function(userToken){
      var account = new Account(), self = this;
      console.log("LOGGING IN");
      
      localStorage.currentUserToken = userToken;

      account.fetch({
        success: function(model){
          self.currentAccount = model;
          Backbone.trigger("login");
          Backbone.trigger("current_account_set", model);
        }
      });
    },

    logout: function(){
      var session = new ModelSession({id: localStorage.currentUserToken});
      console.log("LOGGING OUT");
      
      session.destroy();

      localStorage.removeItem("currentUserToken");
      localStorage.removeItem("currentAccount");
      this.currentAccount = null;

      Backbone.trigger("logout");
    },

    currentUserToken: function(){
      return localStorage.currentUserToken;
    },

    fetchCurrentAccount: function(callback){
      var self = this, account;
      if (!!(this.currentAccount == undefined && localStorage.currentUserToken)){
        account = new Account();
        account.fetch({
          success: function(model){
            self.currentAccount = model;
            Backbone.trigger("current_account_set", model);
            callback();
          }
        });
      } else {
        this.currentAccount = null;
        callback();
      }
    },

    isLoggedIn: function(){
      return localStorage.currentUserToken ? true : false;
    }
  };

  return Session;
});
