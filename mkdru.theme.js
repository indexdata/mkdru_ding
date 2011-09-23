Drupal.theme.mkdruResult = function(hit, num, detailLink) {
  var link = choose_url(hit);
  if (!link) link = choose_url(hit['location'][0]);
  var html = "";
  html += '<li class="search-result" id="rec_' + hit.recid + '" >' +
    '<h3 class="title">';
  if (link) html += '<a href="'+link+'" target="_blank" >';
  html += hit["md-title"];
  if (link) html += '</a>';
  html += '</h3>';
  html += '<div class="search-snippet-info">' +
      '<p class="search-snippet"></p>' +
      '<div class="ting-object clearfix">' +
       '<div class="ting-overview clearfix">' +
         '<div class="left-column left">' +
           '<div class="picture"></div>' +
         '</div>' +
         '<div class="right-column left">';
  if (hit["md-author"]) {
    html += '<div class="creator"><span class="byline">By </span>' +
       '<a class="author" href="/search/meta/'+hit['md-author']+'">' +
       hit['md-author']+'</a>';
    if (hit['md-date']) {
      html += '<span class="date"> ('+hit['md-date']+')</span>';
    }
    html += '</div><p></p>';
  }
  html += "</div>";
  if (hit["md-description"]) {
    // limit description to 400 characters
    html += hit["md-description"][0].substr(0, 400);
  }
  html += '</div>';
  html += '</div>';
  html += '</div>';
  html += '</li>';
  return html;
};

Drupal.theme.mkdruFacetContainer = function (facetsCfg) {
  var fs = [];
  for (var fname in facetsCfg) {
    facetsCfg[fname].originalKey = fname;
    fs.push(facetsCfg[fname]);
  }
  fs.sort(function (a,b) { return a.orderWeight - b.orderWeight; });
  var html = '<h2>Facet browser</h2><div class="content">';
  for (var i=0; i<fs.length; i++) {
    var f = fs[i];
    //not display
    html += '<div id="mkdru-container-'+f.originalKey +
      '" style="display: none;">';
    html += '<fieldset class="form-wrapper">';
    html += '<legend><span class="fieldset-legend">'+f.displayName +'</span></legend>';
    html += '<div class="fieldset-wrapper">';
    html += '<div class="mkdru-facet-'+f.originalKey+' form-checkboxes"/>';
    html += '</div>';
    html += '</fieldset>';
    html += '</div>';
  }
  html += '</div>';
  return html;
};

Drupal.theme.mkdruFacet = function (terms, facet, max, selections) {
  jQuery('#mkdru-container-'+facet).hide();
  var html = "";
  var show = false;
  for (var i = 0; i < terms.length && i < max; i++ ) {
    show = true;
    var term = terms[i];
    var id = term.name.split(/w+/).join("-").toLowerCase();
    html += '<div class="form-item form-type-checkbox">';
    html += '<input type="checkbox" id="'+id+'" onclick="window.location=\'' +term.toggleLink+'\'; return true;" class="form-checkbox"';
    if (term.selected) html += ' checked="checked"';
    html += '/><label class="option" for="'+id+'">'+term.name; 
    html += '<span> ('+term.freq+')</span></label></div>';
  }
  if (terms.length === 0 && selections && selections.length) {
    for (var i=0; i<selections.length; i++) {
      show = true;
      if (selections[i]) {
        // since we have no target name (only id) go for the basename
        // FIXME get the proper target name
        var name = facet == "source" ? selections[i].replace(/.*[\/\\]/, "").replace(/\?.*/, '') : selections[i];
        html += '<div class="form-item form-type-checkbox">';
        html += '<input type="checkbox" checked="checked" id="'+name+'" ' +
          'onclick="window.location=\''+mkdru.removeLimit(facet, selections[i]) +
          '\';return true;" class="form-checkbox"/><label class="option" for="' +
          name+'">'+name+'</a><span> (0)</span></label></div>';
      }
    }
  }
  if (show) jQuery('#mkdru-container-'+facet).show();
  return html;
};
