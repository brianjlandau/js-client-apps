define(function(){
  var Session = Backbone.Model.extend({
    url: '/session'
  });

  return Session;
});
