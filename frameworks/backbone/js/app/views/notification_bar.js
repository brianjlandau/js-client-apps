define(['hbars!templates/notification'], function(template){
  var NotificationBar = Backbone.View.extend({
    tagName: "div",

    initialize: function(){
      this.listenTo(Backbone, "notify", this.displayNotifcation);
    },

    displayNotifcation: function(text, type){
      var className = "alert", notification;

      if (type) className += " alert-" + type;
      
      notification = $(template({className: className, text: text})).hide();
      this.$el.append(notification);

      notification.fadeIn(function(){
        setTimeout(function(){
          notification.fadeOut(1000, function(){
            notification.remove();
          });
        }, 5000);
      });
    }
  });

  return NotificationBar;
});
