define(['form_with_errors'], function(FormWithErrors){
  var FormView = Backbone.View.extend({
    tagName: "div",

    className: "modal",

    initialize: function(){
      this.render();
      this.formModel = this.model;
      this.formWithErrorsInitialize();
      this.$el.on('hidden', function () {
        this.remove();
      }.bind(this))
    },

    render: function(){
      this.$el.html( this.template(this.templateVariables()) ).modal();
    },

    templateVariables: function(){
      if (this.model){
        return this.model.attributes;
      } else {
        return {};
      }
    },

    renderGeneralErrors: function(generalErrors){
      this.$('fieldset.modal-body').prepend("<p class='alert alert-error'>"+generalErrors+"</p>");
    },

    closeAndNotifyOfSuccess: function(text){
      this.$el.modal('hide');
      Backbone.trigger("notify", text, "success");
      this.remove();
    }
  });

  FormView = FormView.extend(FormWithErrors);

  return FormView;
});
