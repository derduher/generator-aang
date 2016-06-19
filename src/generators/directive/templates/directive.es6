'use strict'

angular.module('<%= moduleName %>').directive('<%= name %>', [
  function (
  ) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '<%= tmplPath %>',<%
      if (controller) { %>
      controller: '<%= controller %>',
      controllerAs: 'ctrl',
      bindToController: true,<%
      } %>
      scope: true,
      link: function (scope, el, attrs, ctrl) {
      }
    }
  }
])
