define(["form_view", "models/session", "hbars!templates/signup_form"], function(FormView, ModelSession, template){
  var SignupForm = FormView.extend({
    template: template,

    idNameBase: "signup",

    success: function(model, xhr, options){
      var session = new ModelSession({
        email:    model.get("email"),
        password: model.get("password")
      });

      session.save({}, {
        success: _.bind(this.loginAndRedirect, this)
      });
    },

    loginAndRedirect: function(model, xhr, options){
      currentSession.login(model.get('token'));
      this.closeAndNotifyOfSuccess("You have created an acount and are now logged in!");
    }
  });

  return SignupForm;
});
