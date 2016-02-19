angular.module('booker').controller('AdminCtrl', ['$scope', 
     '$rootScope','$translate', '$reactive',
    function ($scope, $rootScope, $translate, $reactive) {
      $reactive(this).attach($scope);
      $scope.item = {
        itemName : '',
        tags : []
      };
      $scope.perPage = 3;
      $scope.page = 1;
      $scope.sort = {
        name: 1
      };
      $scope.orderProperty = '1';
      $scope.searchText = '';

      this.helpers({
        items: () => {
          return Items.find({}, { sort : $scope.getReactively('sort') });
        },
        isLoggedIn: () => {
          return Meteor.userId() !== null;
        },
        currentUserId: () => {
          return Meteor.userId();
        },
        images: () => {
          return Images.find({});
        }
      });
        
      this.subscribe('images');

      this.subscribe('myItems', () => {
        return [
          {
            limit: parseInt($scope.perPage),
            skip: parseInt(($scope.getReactively('page') - 1) * $scope.perPage),
            sort: $scope.getReactively('sort')
          }
        ]
      });

      $scope.pageChanged = (newPage) => {
        $scope.page = newPage;
      };

      $scope.updateSort = () => {
        $scope.sort = {
          name: parseInt($scope.orderProperty)
        }
      };
      
      $scope.displayItem = (itemId) => {
        $scope.currentItemId = itemId;
        $scope.item = Items.findOne({ _id : itemId });    
      };
      
      $scope.addItem = () => {
        console.log('adding');
        $scope.item = {
          itemName : $translate.instant('NEW'),
          owner : Meteor.userId(),
          tags : [],
          available : false,
          createDate : new Date()
        };
        Items.insert($scope.item, function(err, data) {
          if (err) console.log("error", err);
          $scope.item._id = data;
          console.log("item is:", $scope.item);
        });
      };
      
      $scope.addImages = (files,event) => {
        if (files.length > 0) {
          FS.Utility.eachFile(event, function(file) {
              Images.insert(file, function (err, fileObj) {
                if (err){
                  console.log("Error uploading", err);
                } else {
                  var userId = Meteor.userId();
                  console.log(fileObj.url());
                  $scope.item.imageURL = "/cfs/files/images/" + fileObj._id;
                  $scope.save();
                }
              });
          });
        }
      };
      
      $scope.save = function() {
        console.log('saving', $scope.item);
        if (!$scope.item._id) return ;
        Items.update({_id: $scope.item._id }, {
            $set : {
                itemName : $scope.item.itemName,
                description: $scope.item.description,
                imageURL : $scope.item.imageURL,
                category : $scope.item.category,
                available : $scope.item.available,
                tags : $scope.item.tags
            }
        });
          // $rootScope.showSimpleToast(this, $translate.instant('SAVED'));
      };

      $scope.delete = function() {
        console.log('deleting', $scope.item);
        if (!$scope.item._id) return ;
        Items.remove({_id: $scope.item._id });
      };
    }]
);