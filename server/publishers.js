Meteor.publish("items", function(query, options) {
    if (query.filter == null) query.filter = '';
    let selector = {};
    selector = {
        $and: [{
            buildingId: query.buildingId
        }, {
            _id: (query.projectId != '' ? query.projectId : {
                '$regex': '.*.*',
                '$options': 'i'
            })
        }, {
            title: {
                '$regex': '.*' + query.filter || '' + '.*',
                '$options': 'i'
            }
        }]
    }
    Counts.publish(this, 'numberOfItems', Items.find(selector), {
        noReady: true
    });

    return Items.find(selector, options);
});


Meteor.publish("myItems", function(options) {
    return Items.find({
        $and: [{
            owner: this.userId
        }, {
            owner: {
                $exists: true
            }
        }]
    });
});

Meteor.publish('images', function(query, options) {
    return Images.find({
    });
});


