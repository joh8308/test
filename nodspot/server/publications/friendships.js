Meteor.publish("friendships.requested", function () {
  var currentUserId = this.userId;

  if (currentUserId) {
    let currentUser = Meteor.users.findOne({
      _id: currentUserId
    });

    let friendshipsList = Friendships.find({
      requestedTo: this.userId
    }, {
      fields: {
        _id: 1,
        requester: 1,
        requesterName: 1,
        requestedTo: 1,
        message: 1,
        createdAt: 1
      },
      sort: {
        createdAt: -1
      }
    });

    var friendshipsUsersList = Meteor.users.find({
      _id: {
        $in: currentUser.relationship.incoming
      }
    });

    return [
      friendshipsList,
      friendshipsUsersList
    ];
  } else {
    return this.ready();
  }
});