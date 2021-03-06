define(["models/session", "models/account"], function(ModelSession, Account){
  var Session = function(){ };

  Session.prototype = {
    login: function(userToken){
      var account, self = this;
      console.log("LOGGING IN");
      
      localStorage.currentUserToken = userToken;

      account = new Account();

      account.fetch({
        success: function(model){
          self.currentAccount = model;
          self.trigger("login");
          self.trigger("current_account_set", model);
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

      this.trigger("logout");
    },

    currentUserToken: function(){
      return localStorage.currentUserToken;
    },

    fetchCurrentAccount: function(){
      var self = this, account;
      if (!!(this.currentAccount == undefined && localStorage.currentUserToken)){
        account = new Account();
        account.fetch({
          success: function(model){
            self.currentAccount = model;
            self.trigger("current_account_set", model);
          }
        });
      } else {
        this.currentAccount = null;
      }
    },

    isLoggedIn: function(){
      return localStorage.currentUserToken ? true : false;
    }
  };

  _.extend(Session.prototype, Backbone.Events);

  return Session;
});
