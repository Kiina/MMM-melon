const NodeHelper = require("node_helper");
const Melon = require('melon-chart-api');

module.exports = NodeHelper.create({
  start: function() {
    var events = [];
    this.fetchers = [];
    console.log("Starting node helper for: " + this.name);
  },
  createFetcher: function(cutLine) {
    var self = this;
    //date doesn't matter for daily
    Melon('08/10/1990', {
      cutLine: this.cutLine
    }).daily().then(chartData => {
      self.sendSocketNotification("UPDATE", {
        chartData: chartData
      });
    });
  },
  socketNotificationReceived: function(notification, payload) {
    if (notification === "UPDATE") {
      this.createFetcher({
        cutLine: this.cutLine
      });
    }
  }
});
