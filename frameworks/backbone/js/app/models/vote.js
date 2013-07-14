define(function(){
  var Vote = Backbone.Model.extend({
    url: function(){
      return '/'+this.targetTypeForURL()+'/'+this.get("target_id")+'/votes';
    },

    targetTypeForURL: function(){
      return this.get("target_type").toLowerCase() + 's';
    }
  });

  return Vote;
});
