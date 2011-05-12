// Wrapper for jQuery
(function ($) {
var mkdru_ding = {};

// replace mkdru.hashChange() to play better with tabs
mkdru_ding.originalHashChange = mkdru.hashChange;
mkdru.hashChange = function () {
  // TING hack, switching tabs resets the hash but does not re-load the page
  // simply ignore new hash and set it to the old state
  var hash = $.param.fragment();
  if (hash.indexOf("-result") != -1 || hash.indexOf("facets=") != -1) {
    mkdru.hashFromState();
    return;
  }
  mkdru_ding.originalHashChange();
};

Drupal.theme.prototype.mkdruFacetContainer = function (facetsCfg) {
  var fs = [];
  for (var fname in facetsCfg) {
    facetsCfg[fname].originalKey = fname;
    fs.push(facetsCfg[fname]); }
  fs.sort(function (a,b) { return a.orderWeight - b.orderWeight });
  var html = '<div class="content"><table class="mkdru-facets-table"><tr>';
  for (var i=0; i<fs.length; i++) {
    var f = fs[i];
    html += '<td><fieldset class="form-wrapper">'
    html += '<legend><span class="fieldset-legend">'+f.displayName
      +'</span></legend>';
    html += '<div class="fieldset-wrapper">';
    html += '<div class="mkdru-facet-list-container mkdru-facet-'
      +f.originalKey+'"/>';
    html += '</div>';
    html += '</fieldset></td>'
  }
  html += '</tr></table></div>';
  return html;
};

mkdru_ding.populateFacetContainer = function () {
  $(Drupal.settings.mkdru_ding.facetContainerSelector).html(Drupal.theme('mkdruFacetContainer', mkdru.facets));
}

if (mkdru.pz2) {
  mkdru_ding.populateFacetContainer();
} else {
  mkdru.callbacks.push(mkdru_ding.populateFacetContainer);
}

})(jQuery);