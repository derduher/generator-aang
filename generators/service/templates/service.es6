'use strict'

angular.module('<%= moduleName %>').service('<%= name %>', [<%

  if (Factory) { %>
  '<%= Factory %>',<%
  } %>
  function (<%

  if (Factory) { %>
    <%= Factory %><%
  } %>
  ) {<%

  if (Factory) { %>
    return new <%= Factory %>()<%
  } %>
  }
])
