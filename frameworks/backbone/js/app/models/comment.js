define(function(){
  var Comment = Backbone.Model.extend({
    url: function(){
      return '/'+this.parentTypeForURL()+'/'+this.get("parent_id")+'/comments';
    },

    parentTypeForURL: function(){
      return this.get("parent_type").toLowerCase() + 's';
    }
  });

  return Comment;
});
