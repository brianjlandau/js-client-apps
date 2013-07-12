define(function(){
  var methods = ['hash', 'host', 'hostname', 'pathname', 'port', 'protocol', 'search'],
      URI = function(uriString){
        var parser = document.createElement('a');
        parser.href = uriString;

        _.each(methods, function(method){
          this[method] = parser[method];
        }.bind(this));
      };

  return URI;
});
