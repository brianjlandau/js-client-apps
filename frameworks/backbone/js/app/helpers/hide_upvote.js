define(function(){
  Handlebars.registerHelper('hideUpvote', function() {
    if (!currentSession.isLoggedIn() || _.include(currentSession.currentAccount.favoriteIds, this.id)){
      return " hide";
    } else {
      return "";
    }
  });
});
