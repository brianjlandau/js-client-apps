define(function(){
  var Account = Backbone.Model.extend({
    url: '/account',

    initialize: function(){
      $.getJSON('/account/favorites', function(favorites){
        this.favoriteIds = _.map(favorites, function(fav){
          return fav.id;
        });
      }.bind(this));
    }
  });

  return Account;
});
