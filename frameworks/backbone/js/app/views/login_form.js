define(["form_view", "hbars!templates/login_form"], function(FormView, template){
  var LoginForm = FormView.extend({
    template: template,

    className: "user-login",

    idNameBase: 'login',

    success: function(model, xhr, option){
      currentSession.login(model.get("token"));
      app.navigate('', {trigger: true});
      Backbone.trigger("notify", "You have been logged in!", "success");
      this.remove();
    }
  });

  return LoginForm;
});
