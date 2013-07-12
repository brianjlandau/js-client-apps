define(["hbars!templates/nav_bar"], function(template){
  var NavBar = Backbone.View.extend({
    template: template,

    tagName: "div",
    className: "navbar navbar-inverse navbar-static-top",
    id: "main-nav-bar",

    events: {
      'click a.logout': 'logout',
      'mouseover a.username': 'dropdownAccountMenu'
    },

    initialize: function(){
      this.render();
      
      this.listenTo(Backbone, "login", this.render);
      this.listenTo(Backbone, "logout", this.render);
      this.listenTo(Backbone, "current_account_set", this.listenToAccount);
      
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
      this.$("a.username").dropdown('toggle');
    },

    listenToAccount: function(){
      this.listenTo(currentSession.currentAccount, 'change:username', this.render);
    }
  });

  return NavBar;
});
