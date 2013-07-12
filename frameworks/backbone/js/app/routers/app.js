define(function(){
  var App = Backbone.Router.extend({
    routes: {
      "":        'index',
      "sign_up": "sign_up",
      "login":   "login",
      "account": "showAccountInfo",
      "edit_account": "editAccount"
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
      name: "sign_up",
      requirements: ["views/signup_form", "models/user"],
      action: function(UserForm, User){
        console.log("SIGN UP");
        var user = new User,
            userForm = new UserForm({model: user});
        this.layout.setContent(userForm);
      }
    },
    {
      name: "login",
      requirements: ["views/login_form", "models/session"], 
      action: function(LoginForm, Session){
        console.log("LOGIN");
        var session = new Session,
            loginForm = new LoginForm({model: session});
        this.layout.setContent(loginForm);
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
    },
    {
      name: "editAccount",
      requirements: ["views/account_form"], 
      action: function(AccountForm){
        console.log("EDIT ACCOUNT");
        var account = currentSession.currentAccount,
            accountForm = new AccountForm({model: account});
        this.layout.setContent(accountForm);
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
