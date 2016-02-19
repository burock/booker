Items = new Meteor.Collection('items');

Items.allow({
  insert: function (userId, item) {
    return userId && item.owner === userId;
  },
  update: function (userId, item, fields, modifier) {
    return userId && item.owner === userId;
  },
  remove: function (userId, item) {
    return userId && item.owner === userId;
  }
});

Images = new FS.Collection("images", {
  stores: [
    new FS.Store.GridFS("images")
  ],
  filter: {
    allow: {
      contentTypes: ['image/*']
    }
  }
});
 
Images.allow({
  insert: function (userId) {
    return (userId ? true : false);
  },
  remove: function (userId) {
    return (userId ? true : false);
  },
  download: function () {
    return true;
  },
  update: function (userId) {
    return (userId ? true : false);
  }
});