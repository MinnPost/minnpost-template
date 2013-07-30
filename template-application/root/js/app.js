/**
 * Main app logic for: {%= name %}
 */
(function(app, $, undefined) {
  // Start function that starts the application.  This is not
  // necessary, but just a helpful way to do this.  The main
  // application HTML file calls this by default.
  app.prototype.start = function() {
    // Add in footnote HTML
    this.getTemplate('template-footnote', function(compiledTemplate) {
      $(this.options.el).append(compiledTemplate({ }));
    }, this);
  };
  
  // Get templates.  The get template method should be updated
  // to handle multiple templates.
  app.prototype.getTemplates = function(done, context) {
    this.getTemplate('template-application', function(compiledTemplate) {
      this.getTemplate('template-footnote', function(compiledTemplate) {
        this.getTemplate('template-loading', function(compiledTemplate) {
          {% if (has_maps) { %}
            this.getTemplate('template-map-label', function(compiledTemplate) {
              done.apply(context, []);
            }, this);
          {% } else { %}
            done.apply(context, []);
          {% } %}
        }, this);
      }, this);
    }, this);
  };
  
  // Start function that starts the application.
  app.prototype.start = function() {
    var thisApp = this;
  
    this.getTemplates(function() {
      this.$el.html(this.template('template-application')({ }));
      this.$el.find('.footnote-container').html(this.template('template-footnote')({ }));
      
      // Mark as loading
      this.$el.find('.message-container').html(this.template('template-loading')({ })).slideDown();
      
      // Do stuff like get data
      {% if (has_maps) { %}
      thisApp.makeMap();
      {% } %}
      
      // Stop loading
      this.$el.find('.message-container').slideUp(function() {
        $(this).html('');
      });
      
    }, this);
  };
  
  
  
  {% if (has_maps) { %}
  // Make Map
  app.prototype.makeMap = function() {
    var thisApp = this;
    var baseLayer = new L.tileLayer('//{s}.tiles.mapbox.com/v3/minnpost.map-wi88b700/{z}/{x}/{y}.png');

    // Create map
    this.map = new L.map('map', {
      zoom: 10,
      center: [44.9800, -93.2636],
      minZoom: 10,
      maxZoom: 18
    });
    this.map.attributionControl.setPrefix(false);
    this.map.addLayer(baseLayer);
    
    // Create a label container
    this.LabelControl = this.LabelControl || L.Control.extend({
      options: {
        position: 'topright'
      },

      onAdd: function (map) {
        var container = L.DomUtil.create('div', 'map-label-container');
        return container;
      }
    });
    this.map.addControl(new this.LabelControl());
    this.$el.find('.map-label-container').hide();
    
    // Create geojson layer, handle styles and interaction
    /*
    this.fiberJSONLayer = L.geoJson(this.fiberJSON, {
      style: function(feature) {
        // feature.properties.party
        var style = _.clone(thisApp.defaultMapStyle);
        
        // If live, then green, but if capacity full, yellow
        if (feature.properties.status === 'live') {
          style.color = thisApp.colors.live;
          
          if (feature.properties.capacity === 1) {
            style.color = thisApp.colors.capacity;
          }
        }
        
        // Determine thickness from zoom
        style.weight = 3 + (thisApp.map.getZoom() - 12);
        
        return style;
      },
      onEachFeature: function(feature, layer) {
        layer.on({
          mouseover: function(e) {
            var layer = e.target;
            var options = _.clone(layer.options);
            
            // Label
            thisApp.$el.find('.map-label-container').html(
              thisApp.template('template-map-label')(layer.feature.properties)
            ).show();
        
            // Set style
            options.opacity = 0.9;
            layer.setStyle(options);
            layer.bringToFront();
          },
          mouseout: function(e) {
            thisApp.$el.find('.map-label-container').hide();
            thisApp.fiberJSONLayer.resetStyle(e.target);
          },
          click: function(e) {
            thisApp.map.fitBounds(e.target.getBounds());
          }
        });
      }
    });
    this.map.addLayer(this.fiberJSONLayer);
    
    // Zoom to extents
    this.map.fitBounds(this.fiberJSONLayer.getBounds());
    
    // Simple reset map view
    this.$el.find('.reset-map-view').text('Reset map view')
      .on('click', this.$el, function(e) {
        e.preventDefault();
        thisApp.map.fitBounds(thisApp.fiberJSONLayer.getBounds());
      });
    */
  };
  {% } %}
  
})(mpApps['{%= name %}'], jQuery);