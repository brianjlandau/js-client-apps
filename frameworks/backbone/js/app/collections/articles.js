define(['models/article'], function(Article){
  var Articles = Backbone.Collection.extend({
    model: Article,

    url: '/articles',

    comparator: function(a, b){
      var dateA = a.createdAt(), dateB = b.createdAt();
      if (dateA == dateB) return 0;
      return dateA > dateB ? -1 : 1;
    }
  });

  return Articles;
});
