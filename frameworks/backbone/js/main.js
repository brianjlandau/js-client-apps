requirejs.config({
  baseUrl: '/js',

  paths: {
    // Vendor Paths
    bootstrap:  'vendor/bootstrap',
    backbone:   'vendor/backbone',
    jquery:     'vendor/jquery',
    underscore: 'vendor/lodash.underscore',
    Handlebars: 'vendor/handlebars',
    text:       'vendor/text',
    hbars:      'vendor/hbars',
    timeago:    'vendor/jquery.timeago',

    // lib paths
    serialize_object: 'lib/jquery.serialize_object',
    session:          'lib/session',
    form_view:        'lib/form_view',
    uri:              'lib/uri',

    // Backbone Paths
    collections: 'app/collections',
    models:      'app/models',
    routers:     'app/routers',
    views:       'app/views',
    templates:   'app/templates',
    helpers:     'app/helpers'
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
    },
    serialize_object: {
      deps: ['jquery']
    },
    timeago: {
      deps: ['jquery']
    }
  },

  hbars: {
    extension: ".mustache"
  }

});

require(['bootstrap', 'backbone', 'serialize_object'], function() {

  require(['session', 'routers/app', 'collections/articles'], function(Session, App, Articles){
    window.currentSession = Session;

    window.articles = new Articles;
    articles.fetch();

    $.ajaxPrefilter(function( options, originalOptions, xhr ){
      if (currentSession.isLoggedIn()){
        options.headers = {'X-User-Token': currentSession.currentUserToken()};
      }
    });

    currentSession.fetchCurrentAccount(function(){
      window.app = new App();

      Backbone.history.start();

      console.log("BOOTED");
    });
  });

});
