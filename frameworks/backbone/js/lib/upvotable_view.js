define(['models/vote', 'helpers/hide_upvote'], function(Vote){
  var UpvotableView = {
    upvotableInitialization: function(){
      this.listenTo(Backbone, 'login', this.render);
      this.listenTo(Backbone, 'logout', this.hideUpvotes);
    },

    upvote: function(e){
      var $upvotable = $(e.currentTarget).closest('.upvotable'),
          vote = new Vote({target_id: $upvotable.data('id'), target_type: $upvotable.data('type')});
      e.preventDefault();
      vote.save({}, {success: this.updateVoteCount.bind($upvotable)});
    },

    hideUpvotes: function(){
      this.$("a.upvote").addClass('hide');
    },

    updateVoteCount: function(){
      var $pointsElm = this.find('.points'), points = parseInt($pointsElm.text());
      $pointsElm.text(points + 1);
      this.find('a.upvote').addClass('hide');
    }
  };

  return UpvotableView;
});
