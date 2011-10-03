Drupal.theme.mkdruShowFullDescr = function(id) {
  document.getElementById("short_"+id).style.display = 'none';
  document.getElementById("full_"+id).style.display = 'block';
}
Drupal.theme.mkdruShowShortDescr = function(id) {
  document.getElementById("short_"+id).style.display = 'block';
  document.getElementById("full_"+id).style.display = 'none';
}
Drupal.theme.mkdruTruncateDescr = function(desc,length) {
  var s=desc.substr(0,length);
  return s.substr(0,s.lastIndexOf(' ')); 
}

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
    // expand on ; and reprint in the same form
    var authors = hit["md-author"][0].split(';');
    html += '<div class="creator"><span class="byline">By </span>'
    for(var i=0; i<authors.length-1; i++) {
      html+='<a class="author" href="'+Drupal.settings.basePath+'search/meta/author/'+authors[i].trim()+'">'+authors[i]+'</a> ;';
    }
    html+='<a class="author" href="'+Drupal.settings.basePath+'search/meta/author/'+authors[authors.length-1].trim()+'">'+authors[authors.length-1]+'</a>';
    if (hit['md-date']) {
      html += '<span class="date"> ('+hit['md-date']+')</span>';
    }
    html += '</div><p></p>';
  }
  var dhit=hit['location'][0];
  if (dhit["md-journal-subpart"]) {
    html += '<div>'+Drupal.t("Full reference")+': '+dhit["md-journal-subpart"];
    if (dhit["md-medium"]) { html += ', '+Drupal.t("published as")+': '+dhit["md-medium"]; }
    html += '</div><p/>';
  }
  if (dhit["md-subject"] && dhit["md-subject"].length > 0) {
    html+='<div>';
    html+=Drupal.formatPlural(dhit["md-subject"].length,"Subject","Subjects")+': <ul>';
    for(i=0; i<dhit["md-subject"].length; i++) {
       html+='<a href="'+Drupal.settings.basePath+'search/meta/subject/'+dhit["md-subject"][i]+'"><li style="display:inline; padding-right:0.5em" >'+dhit["md-subject"][i]+'</li></a>';
    }
    html+='</ul></div>';
  }
  html += "</div>";
  if (hit["md-description"]) {
    // limit description to 600 characters
    var d=hit["md-description"][0];
    var recid=hit.recid;
    if (d.length < 601) {
      html+='<div>'+d+'</div>';
    } else {
      html += '<div id="full_' +recid+'" style="display:none">'+
              d +'<a href="javascript:Drupal.theme.mkdruShowShortDescr(\''+recid+'\')"> <i>less</i></a></div>';
      html += '<div id="short_'+recid+'" style="display:block">'+
              Drupal.theme.mkdruTruncateDescr(d,600)
                +'<a href="javascript:Drupal.theme.mkdruShowFullDescr(\''+recid+'\')"> <i>more</i></a></div>';
    }
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
