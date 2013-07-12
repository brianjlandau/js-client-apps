requirejs.config({
  baseUrl: '/js',

  paths: {
    // Vendor Paths
    bootstrap: 'vendor/bootstrap',
    backbone: 'vendor/backbone',
    jquery: 'vendor/jquery',
    underscore: 'vendor/lodash.underscore',
    Handlebars: 'vendor/handlebars',
    text: 'vendor/text',
    hbars: 'vendor/hbars',

    // Backbone Paths
    collections: 'app/collections',
    models: 'app/models',
    routers: 'app/routers',
    views: 'app/views',
    templates: 'app/templates',
    helpers: 'app/helpers'
  },

  shim: {
    jquery: {
      exports: '$'
    },
    underscore: {
      exports : "_"
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    Handlebars: {
      exports: 'Handlebars'
    },
    bootstrap: {
      deps: ['jquery']
    }
  },

  hbars: {
    extension: ".mustache"
  }

});

require(['bootstrap', 'backbone'], function() {

  console.log("BOOTED");

});
