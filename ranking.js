angular.module('rankingModule', [])
	.controller('rakingCtrl', function ($scope, $q, $http, moduleService) {
        $scope.comments = [];
        $scope.moduleService = moduleService;
        
        $scope.increaseScore = function (comment) {
            comment.score += 1;
        };

        $scope.decreaseScore = function (comment) {
            comment.score -= 1;
        };	

        $scope.getComments = function(){
        	var promise = moduleService.getComments();
        	promise.then(
				function(result){
					$scope.comments = result.comments;
				},
				function(failMessage){
					 alert('Failed: ' + reason);
				}
			);
	    }

	    $scope.postComment = function(event, comment){
	    	if(comment && event.keyCode === 13){
	    		var newComment = moduleService.postComment(comment),
	    			parentElement = event.target.parentElement;
	    		if (angular.element(parentElement).hasClass('comment')){
					$scope.comments[0].comments.push(newComment); //TO DO SINCE VALUES ARE WRONG
				}
				else if(angular.element(parentElement).hasClass('mainComment')){
					$scope.comments.push(newComment);
				}	        		
	    	}
        	
	    }
	})
	.service('moduleService', function($http, $q){
		var comments = [];

		this.getComments = function(){
			var deferred = $q.defer();
			$http.get('http://api.projetobrasil.org:4242/v1/comments')
	      		.success(function(data) {
	      			deferred.resolve(data);			
				})
				.error(function(data) {
					console.log('Error ao carregar os comentários ' + data);
					deferred.reject(data);
				})
			return deferred.promise;
		}
		this.postComment = function(comment){
    	 	return comment;						
	    }
	})
	//to use this directive <div input-directive class-name="var" post-comment="moduleService.postComment($event, comment, idParent, idComment)" msg-placeholder="text"></div>
	.directive('inputDirective', function(){
		return {
			restrict: 'A',	
			scope: {
				postComment: '&',
				msgPlaceholder: '@',
				className: '@'
			},		
			template: "<textarea ng-model='comment' class='{{className}}' placeholder='{{msgPlaceholder}}' "+
						"ng-keyup='postComment( {event:$event}, {comment: comment} )'></textarea>"						
		};
	});
	
