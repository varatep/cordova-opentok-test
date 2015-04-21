// the importance lies in onDeviceReady fn
// make sure you add the plugin first:
//  $ cordova plugin add https://github.com/songz/cordova-plugin-opentok/

'use strict';

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
    // app.receivedEvent('deviceready');
      var apiKey = "";
      var sessionId = "";
      var token = "";

      // publish to a div called 'myPublisherDiv' in index.html
      var publisher = TB.initPublisher(apiKey,'myPublisherDiv');

      var session = TB.initSession( apiKey, sessionId );
      session.on({
        // subscribe to 'streamCreated'
        'streamCreated': function( event ){
            var div = document.createElement('div');
            div.setAttribute('id', 'stream' + event.stream.streamId);
            document.body.appendChild(div);
            session.subscribe( event.stream, div.id, {subscribeToAudio: false} );
        }
      });
      session.connect(token, function(){
        session.publish( publisher );
      });

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
