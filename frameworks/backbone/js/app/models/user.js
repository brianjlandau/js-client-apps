define(function(){
  var User = Backbone.Model.extend({
    urlRoot: '/users'
  });

  return User;
});
