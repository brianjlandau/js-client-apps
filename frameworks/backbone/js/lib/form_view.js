define(['helpers/input_helper'], function(){
  var FormView = Backbone.View.extend({
    tagName: "div",

    events: {
      "submit form": "submit"
    },

    saveOptions: {},

    initialize: function(){
      this.render();
      this.listenTo(this.model, "error", this.handleErrors);
    },

    render: function(){
      this.$el.html( this.template(this.templateVariables()) );
    },

    templateVariables: function(){
      if (this.model){
        return this.model.attributes;
      } else {
        return {};
      }
    },

    submit: function(e){
      e.preventDefault();
      this.model.save(this.$('form').serializeObject(), _.extend(this.saveOptions, {
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
        this.$('form').prepend("<p class='alert alert-error'>"+allErrors.general.join(', ')+"</p>");
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
  });

  return FormView;
});
