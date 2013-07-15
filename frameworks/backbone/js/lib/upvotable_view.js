define(['models/vote', 'helpers/hide_upvote'], function(Vote){
  var UpvotableView = {
    upvotableInitialization: function(){
      this.listenTo(currentSession, 'login', this.render);
      this.listenTo(currentSession, 'logout', this.hideUpvotes);
    },

    upvote: function(e){
      var $upvotable = $(e.currentTarget).closest('.upvotable'),
          vote = new Vote({target_id: $upvotable.data('id'), target_type: $upvotable.data('type')});
      e.preventDefault();
      vote.save( {}, {
        success: function(){ 
          this.updateVoteCount.apply(this, [$upvotable]);
        }.bind(this)
      } );
    },

    hideUpvotes: function(){
      this.$("a.upvote").addClass('hide');
    },

    updateVoteCount: function($upvotable){
      var $pointsElm = $upvotable.find('.points'),
          points = parseInt($pointsElm.text());

      $pointsElm.text(points + 1);

      $upvotable.find('a.upvote').addClass('hide');

      currentSession.currentAccount.favoriteIds.push($upvotable.data('id'));

      this.getUpvoteable($upvotable.data('type'), $upvotable.data('id')).set('points', points + 1);
    }
  };

  return UpvotableView;
});
