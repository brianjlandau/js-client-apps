define(['helpers/input_helper'], function(){
  var FormWithErrors = {
    events: {
      "submit form": "submit"
    },

    saveOptions: {},

    formWithErrorsInitialize: function(){
      this.listenTo(this.formModel, "error", this.handleErrors);
    },

    submit: function(e){
      e.preventDefault();
      this.formModel.save(this.$('form').serializeObject(), _.extend(this.saveOptions, {
        success: _.bind(this.success, this)
      }));
    },

    handleErrors: function(model, xhr, options){
      var allErrors = JSON.parse(xhr.responseText).errors.keyed;

      this.clearErrors();
      this.addGenralErrors(allErrors);
      this.addErrorsToFields(allErrors);
    },

    clearErrors: function(){
      this.$('.control-group').removeClass('error');
      this.$('.help-inline').remove();
      this.$('.alert').remove();
    },

    addGenralErrors: function(allErrors){
      if (allErrors.general){
        this.renderGeneralErrors(allErrors.general.join(', '));
      }
    },

    addErrorsToFields: function(allErrors){
      var $el = this.$el, idNameBase = this.idNameBase;

      _.each(allErrors, function(errors, attr){
        var $input = $el.find("#"+idNameBase+"-"+attr);
        $input.closest(".control-group").addClass('error');
        $input.closest('.controls').append("<span class='help-inline'>"+errors.join(', ')+"</span>");
      });
    }
  };

  return FormWithErrors;
});
