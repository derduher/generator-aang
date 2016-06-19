'use strict'

angular.module('<%= moduleName %>').directive('<%= name %>', [
  function (
  ) {
    return {
      restrict: 'E',
      replace: true,
      // root, root/templates
      templateUrl: '<%= tmplPath %>',
      // Ctonroller
      controller: 'PlaylistController',
      controllerAs: 'ctrl',
      bindToController: true,
      // Controller
      scope: true,
      link: function (scope, el, attrs, ctrl) {
      }
    }
  }
])
