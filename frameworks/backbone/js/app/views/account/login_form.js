define(["form_view", "hbars!templates/account/login_form"], function(FormView, template){
  var LoginForm = FormView.extend({
    template: template,

    idNameBase: 'login',

    success: function(model, xhr, option){
      currentSession.login(model.get("token"));
      this.closeAndNotifyOfSuccess("You have been logged in!");
    }
  });

  return LoginForm;
});
