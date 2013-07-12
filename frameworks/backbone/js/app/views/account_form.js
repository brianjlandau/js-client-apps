define(["form_view", "hbars!templates/account_form"], function(FormView, template){
  var AccountForm = FormView.extend({
    template: template,

    idNameBase: 'account',

    saveOptions: {patch: true},

    success: function(model, xhr, option){
      this.closeAndNotifyOfSuccess("Your account has been updated!");
    }
  });

  return AccountForm;
});
