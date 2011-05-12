// Wrapper for jQuery
(function ($) {
var mkdru_ding = {};

Drupal.theme.prototype.mkdruFacetContainer = function (facetsCfg) {
  var fs = [];
  for (var fname in facetsCfg) {
    facetsCfg[fname].originalKey = fname;
    fs.push(facetsCfg[fname]);
  }
  fs.sort(function (a,b) { return a.orderWeight - b.orderWeight });
  var html = '<h2>Facet browser</h2><div class="content">';
  for (var i=0; i<fs.length; i++) {
    var f = fs[i];
    //not display
    html += '<div id="mkdru-container-'+f.originalKey
      +'" style="display: none;">';
    html += '<fieldset class="form-wrapper">'
    html += '<legend><span class="fieldset-legend">'+f.displayName
      +'</span></legend>';
    html += '<div class="fieldset-wrapper">';
    html += '<div class="mkdru-facet-'+f.originalKey+' form-checkboxes"/>';
    html += '</div>';
    html += '</fieldset>';
    html += '</div>';
  }
  html += '</div>';
  return html;
};

mkdru_ding.populateFacetContainer = function () {
  $(Drupal.settings.mkdru_ding.facetContainerSelector).html(Drupal.theme('mkdruFacetContainer', mkdru.facets));
}

// sometimes/browsers defer won't work and we need to have mkdru call us back
if (mkdru.pz2) {
  mkdru_ding.populateFacetContainer();
} else {
  mkdru.callbacks.push(mkdru_ding.populateFacetContainer);
}

})(jQuery);