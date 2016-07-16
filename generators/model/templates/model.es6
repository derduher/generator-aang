'use strict'

angular.module('<%= moduleName %>').factory('<%= name %>', [
  'AppBaseModel',
  function (
    AppBaseModel
  ) {
    return class <%= name %> extends AppBaseModel {
    }
  }
])
