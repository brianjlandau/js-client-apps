define(["views/nav_bar", "views/notification_bar"], function(NavBar, NotificationBar){
  var Layout = Backbone.View.extend({
    tagName: "div",
    id: "main",

    initialize: function(){
      this.navbar = new NavBar();
      this.notificationBar = new NotificationBar();
      this.render();
    },

    render: function(){
      this.$el.append(this.navbar.el);
      this.$el.append(this.notificationBar.el);
      this.$el.append('<div id="content"></div>');
    },

    setContent: function(view){
      if (this.contentView){
        this.contentView.remove();
      }
      this.contentView = view;
      this.$("#content").empty().append(view.el);
    }
  });

  return Layout;
});
