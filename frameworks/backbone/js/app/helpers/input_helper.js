define(["hbars!templates/input"], function(inputTemplate){
  Handlebars.registerHelper('input', function(objectName, fieldName, inputType, displayName, value) {
    if (value) value = Handlebars.Utils.escapeExpression(value);
    var html = inputTemplate({objectName: objectName, fieldName: fieldName, displayName: displayName, value: value, type: inputType});
    return new Handlebars.SafeString(html);
  });
});
