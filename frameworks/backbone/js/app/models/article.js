define(['uri'], function(URI){
  var Article = Backbone.Model.extend({
    urlRoot: '/articles',
    
    createdAt: function(){
      return new Date(this.get('created_at'));
    },

    host: function(){
      var uri = new URI(this.get('url'));
      return uri.hostname;
    },

    toJSON: function(options) {
      return _.extend(_.clone(this.attributes), {
        host: this.host()
      });;
    },
  });

  return Article;
});
