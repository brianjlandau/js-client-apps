define(["hbars!templates/nav_bar"], function(template){
  var NavBar = Backbone.View.extend({
    template: template,

    tagName:   "div",
    className: "navbar navbar-inverse navbar-static-top",
    id:        "main-nav-bar",

    events: {
      'click a.logout':       'logout',
      'mouseover a.usermenu': 'dropdownAccountMenu',
      'click a#new-article':  'newArticle',
      'click a#edit-account': 'editAccount',
      'click a#sign-up':      'signUp',
      'click a#login':        'login'
    },

    initialize: function(){
      this.render();
      
      this.listenTo(currentSession, "login", this.render);
      this.listenTo(currentSession, "logout", this.render);
      this.listenTo(currentSession, "current_account_set", this.listenToAccount);
      
      if (currentSession.isLoggedIn()) this.listenToAccount();
    },

    render: function(){
      var currentAccount = currentSession.currentAccount,
          username       = currentAccount ? currentAccount.get("username") : null;
      this.$el.html( this.template({isLoggedIn: currentSession.isLoggedIn(), username: username}) );
    },

    logout: function(e){
      e.preventDefault();
      currentSession.logout();
      app.navigate('', {trigger: true});
    },

    dropdownAccountMenu: function(){
      this.$("a.usermenu").dropdown('toggle');
    },

    listenToAccount: function(){
      this.$('.username').text(currentSession.currentAccount.get('username'));
      this.listenTo(currentSession.currentAccount, 'change:username', this.render);
    },

    newArticle: function(e){
      e.preventDefault();
      require(["models/article","views/article_form"], function(Article, ArticleForm){
        var article = new Article,
            articleForm = new ArticleForm({model: article});
      });
    },

    editAccount: function(e){
      e.preventDefault();
      require(["views/account_form"], function(AccountForm){
        var account = currentSession.currentAccount,
            accountForm = new AccountForm({model: account});
      });
    },

    signUp: function(e){
      e.preventDefault();
      require(["views/signup_form", "models/user"], function(UserForm, User){
        var user = new User,
            userForm = new UserForm({model: user});
      });
    },

    login: function(e){
      e.preventDefault();
      require(["views/login_form", "models/session"], function(LoginForm, Session){
        var session = new Session,
            loginForm = new LoginForm({model: session});
      });
    }
  });

  return NavBar;
});
