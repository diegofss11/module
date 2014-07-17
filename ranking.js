angular.module('rankingModule', [])
	.controller('rakingCtrl', function ($scope, $q, $http, moduleService) {
        $scope.comments = [];
        /*var comment1 = {
	  			idParent: 0,
	  			idComment : 1,
	  			content: 'aaaaa',
	  			score: 0,
	  			comments: [{
	  				idParent: 1,
	  				idComent: 1,
	  				score: 0,
	  				content: 'Anwser to aaaa'
	  			}]
			},
        	comment2 = {
	  			idParent: 0,
	  			idComment : 2,
	  			content: 'bbbbb',
	  			score: 0,
	  			comments: [{
	  				idParent: 2,
	  				idComent: 2,
	  				score: 0,
	  				content: 'Anwser to bbbb'
	  			}]
			},
        	comment3 = {
  				idParent:0,
  				idComment : 3,
  				content: 'ccccc',
  				score: 0,
  				comments: [{
  					idParent: 3,
  					idComment:1,
  					score: 0,
	  				content: 'Anwser to ccccccc'
	  			},
	  			{
  					idParent: 3,
  					idComment:2,
  					score: 0,
	  				content: 'Anwser to ccccccc [2]'
	  			}]
			},
			comment4 = {
  				idParent: 0,
  				idComment: 4,
  				content: 'ddddddd',
  				score: 0,
  				comments: [{
	  				
	  			}]
			};

        $scope.comments.push(comment1);
        $scope.comments.push(comment2);
        $scope.comments.push(comment3);	
        $scope.comments.push(comment4);	
		*/
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
	})
	.directive('inputDirective', function(moduleService){
		return {
			restrict: 'A',			
			template: "<textarea ng-model='comment' ng-keyup='moduleService.postComment($event, comment, idParent, idComment)'></textarea>",
			scope: {
				idParent: '@',
				idComment: '@'
			},
			link : function (scope, elem, attrs, controller) {
				if ( attrs.class === 'mainComment' ){
					elem.children().eq(0).attr('placeholder','Redija um comentario...');
					elem.children().eq(0).addClass('globalInput');
				}
				else if ( attrs.class === 'comment' ){
					elem.children().eq(0).attr('placeholder','Redija uma resposta...');
				}                
            }
		};
	}).service('moduleService', function($http, $q){
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
		this.postComment = function(event, comment){
        	if(comment && event.keyCode === 13){
        		var commentObj = {};
	        	
				commentObj = {
	        		idParent: 0,
	        		idComment: 0,
	        		content: comment,
	        		score: 0
				}
				if (event.target.parentElement.className == "comment"){
					comments.comments.push(commentObj);
				}
				else if(event.target.parentElement.className == "mainComment"){
					comments.push(commentObj);
				}				
	        }
        }
	});
	
