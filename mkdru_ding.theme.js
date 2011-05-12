Drupal.theme.mkdruFacetContainer = function (facetsCfg) {
  var fs = [];
  for (var fname in facetsCfg) {
    facetsCfg[fname].originalKey = fname;
    fs.push(facetsCfg[fname]);
  }
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
