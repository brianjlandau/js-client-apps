define(["form_view", "hbars!templates/account_form"], function(FormView, template){
  var AccountForm = FormView.extend({
    template: template,

    className: "account",

    idNameBase: 'account',

    saveOptions: {patch: true},

    success: function(model, xhr, option){
      app.navigate('account', {trigger: true});
      Backbone.trigger("notify", "Your account has been updated!", "success")
      this.remove();
    }
  });

  return AccountForm;
});
