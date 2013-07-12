define(["hbars!templates/account_info"], function(template){
  var AccountInfo = Backbone.View.extend({
    template: template,

    tagName:   "div",
    className: "attribute-list",
    id:        "account-info",

    initialize: function(){
      this.listenTo(this.model, 'change', this.render);
      this.render();
    },

    render: function(){
      this.$el.html( this.template({email: this.model.get("email"), username: this.model.get("username")}) );
    }
  });

  return AccountInfo;
});
