var hooks = require('../commons/hooks');
var fs = require('fs');
var pdfGenerator = require('../commons/pdf-generator')


module.exports = function () {
  
  this.BeforeScenario(function (scenario) {
    featureData = fs.readFileSync('./files/feature.txt', 'utf8');
    featureName = featureData.toString();
    var scenario = scenario.getName();
    hooks.guardaScenario(scenario);
    hooks.getScreenshot();
    pdfGenerator.iniciaPdf(featureName, scenario);
  })

  this.After(function (scenario) {
    hooks.getScreenshot();
    
    if (scenario.isFailed()) {
      pdfGenerator.finalizaPdf();
    }

  })

  this.AfterFeature(function (feature) {

    pdfGenerator.disponibilizaPdf(feature);
  });

  this.BeforeFeature(function (feature) {
    var feature = feature.getName();
    hooks.guardaFeature(feature);
    pdfGenerator.novoPdf(feature);
  })


} 