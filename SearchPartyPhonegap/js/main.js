var app = {

  showAlert: function (message, title) {
    if (navigator.notification) {
      navigator.notification.alert(message, null, title, 'OK');
    } else {
      alert(title ? (title + ": " + message) : message);
    }
  },

  registerEvents: function() {
    var self = this;
    // Check of browser supports touch events...
    if (document.documentElement.hasOwnProperty('ontouchstart')) {
      // ... if yes: register touch event listener to change the "selected" state of the item
      $('body').on('touchstart', 'a', function(event) {
        $(event.target).addClass('tappable-active');
      });
      $('body').on('touchend', 'a', function(event) {
        $(event.target).removeClass('tappable-active');
      });
    } else {
      // ... if not: register mouse events instead
      $('body').on('mousedown', 'a', function(event) {
        $(event.target).addClass('tappable-active');
      });
      $('body').on('mouseup', 'a', function(event) {
        $(event.target).removeClass('tappable-active');
      });
    }
    //Event listener som lytter p� URL endringer
    //Kaller route() ved hver endring
    $(window).on('hashchange', $.proxy(this.route, this));
  },

  initialize: function() {
    var self = this;
    //routes
    this.cameraUrl = /^#camera/;
    this.restUrl = /^#rest/;

    this.mainTpl = Handlebars.compile($("#index-tpl").html());
    this.storage = new WebSqlStore();

    self.registerEvents();
    self.route();
  },

  route: function() {
	    var hash = window.location.hash;
	    if (!hash) {
	    	$('body').html(this.mainTpl);
	        return;
	    }

	    if (hash.match(app.restUrl)) {
	    	$('body').html(new RestView().render().el);
	    } else {
	    	$('body').html(new HomeView().render().el);
	    }
	}

};

app.initialize();
