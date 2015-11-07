'use strict'

angular.module('<%= moduleName %>').factory('<%= modelName %>', [
  'AppBaseModel',
  function (
    AppBaseModel
  ) {
    return class <%= modelName %> extends AppBaseModel {
    }
  }
])
