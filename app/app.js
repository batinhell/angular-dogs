var app = angular.module('dogs', ['ngRoute']);

app.controller('AppController', AppController);

function AppController($scope, $location, $http) {
  const dogUlr = 'https://dog.ceo/api/breed';
  const vm = this;

  vm.breed = '';
  vm.breeds = [ 'Labrador', 'Beagle', 'borzoi', 'Husky' ];

  vm.onBreedChange = () => {
    $location.url(`/${vm.breed}`);
  };

  function getDoggos() {
    const url = `${dogUlr}/${vm.breed}/images/random`
    $http.get(url).then((response) => {
      vm.src = response.data.message;
    });
  }

  $scope.$on("$routeChangeSuccess", (e, currentRoute) => {
    vm.breed = currentRoute.params.breed;
    const exist = vm.breeds.includes(currentRoute.params.breed)
    if (!exist) {
      vm.breeds.push(currentRoute.params.breed);
    }
    getDoggos();
  });
}

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider.when('/:breed', {
    controller: 'AppController',
  });

  $routeProvider.otherwise({redirectTo: '/'});
}]);
