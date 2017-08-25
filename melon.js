/* global Module */

Module.register("melon", {
  getTranslations() {
    return {
      en: 'translations/en.json',
      de: 'translations/de.json',
      kr: 'translations/kr.json'
    };
  },
  defaults: {
    updateInterval: 60 * 60 * 1000, //every 60 minutes
    initialLoadDelay: 0,
    colored: false,
    fade: true,
    fadePoint: 0.5,
    fadeListBigger: 3,
    cutLine: 5
  },
  start: function() {
    Log.info("Starting module: " + this.name);
    this.loaded = false;
    this.chartData = {};
    this.scheduleUpdate(this.config.initialLoadDelay);
  },
  getDom: function() {
    var wrapper = document.createElement("div");

    var table = document.createElement("table");
    table.className = "small";

    var heading = table.insertRow(0);
    heading.insertCell(0).outerHTML = '<th>' + this.translate('TITLE') + '</th>';
    heading.insertCell(1).outerHTML = '<th>' + this.translate('ARTIST') + '</th>';
    heading.insertCell(2).outerHTML = '<th>' + this.translate('ALBUM') + '</th>';

    for (var place in this.chartData.data) {
      var chart = this.chartData.data[place];

      var row = document.createElement("tr");
      if (this.config.colored) {
        row.className = "colored";
      }
      table.appendChild(row);

      var titleCell = document.createElement("td");
      titleCell.innerHTML = chart.title;
      titleCell.className = "";
      row.appendChild(titleCell);

      var artistCell = document.createElement("td");
      artistCell.innerHTML = chart.artist;
      artistCell.className = "";
      row.appendChild(artistCell);

      var albumCell = document.createElement("td");
      albumCell.innerHTML = chart.album;
      albumCell.className = "";
      row.appendChild(albumCell);

      // Create fade effect.
      if (this.config.fade && this.config.fadePoint < 1 && this.config.fadeListBigger < this.chartData.data.length) {
        if (this.config.fadePoint < 0) {
          this.config.fadePoint = 0;
        }
        var startingPoint = this.chartData.data.length * this.config.fadePoint;
        var steps = this.chartData.data.length - startingPoint;
        if (chart >= startingPoint) {
          var currentStep = chart - startingPoint;
          row.style.opacity = 1 - (1 / steps * currentStep);
        }
      }
    }
    return table;
  },
  updateMelon: function() {
    this.sendSocketNotification("UPDATE", {
      cutLine: this.config.cutLine
    });
  },
  getStyles: function() {
    return ["melon.css"];
  },
  socketNotificationReceived: function(notification, payload) {
    if (notification === "UPDATE") {
      this.chartData = payload.chartData;
      this.updateDom();
    }
  },
  scheduleUpdate: function(delay) {
    var nextLoad = this.config.updateInterval;
    if (typeof delay !== "undefined" && delay >= 0) {
      nextLoad = delay;
    }
    var self = this;
    setTimeout(function() {
      self.updateMelon();
    }, nextLoad);
  }
});
