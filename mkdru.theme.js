Drupal.theme.mkdruResult = function(hit, num, detailLink) {
  var html = "";

  // OPEN - result list item
  html += '<li class="mkdru-result" id="rec_' + hit.recid + '" >'

  // thumbnail
  html += '<div class="picture"></div>';

  // OPEN - record div
  html += '<div class="record">';


  // media type
  if (hit["md-medium"] && hit["md-medium"][0]) {
    html += '<div class="types">'
      + '<ul class="ting-search-collection-types item-list">'
      + '<li class="available even first last">';
    switch (hit["md-medium"][0]) {
      case '(CD)videorecording':
        html += Drupal.t('CD');
        break;
      case '(DVD)videorecording':
        html += Drupal.t('DVD');
        break;        
      case 'article':
        html += Drupal.t('article');
        break;      
      case 'book':
        html += Drupal.t('book');
        break;
      case 'cartographic material':
        html += Drupal.t('map');
        break;
      case 'electronicresource':
        html += Drupal.t('online');
        break;
      case 'Enregistrementsonore':
        html += Drupal.t('recording');
        break;
      case 'enregistrementvidéo':
        html += Drupal.t('video');
        break;
      case 'map':
        html += Drupal.t('map');
        break;
      case 'microform':
        html += Drupal.t('microform');
        break;
      case 'microforme':
        html += Drupal.t('microform');
        break;
      case 'resourceélectronique':
        html += Drupal.t('online');
        break;
      case 'ressourceélectronique':
        html += Drupal.t('online');
        break;
      case 'soundrecording':
        html += Drupal.t('recording');
        break;
      case 'videorecording':
        html += Drupal.t('video');
        break;
      default:
        html += Drupal.t('other');
        break;
    }
    html += '</li></ul></div>';
  }


  // title and link
  var link = choose_url(hit);
  if (!link) link = choose_url(hit['location'][0]);

  html += '<h3 class="title">';
  if (link) html += '<a href="' + link + '" target="_blank" class="title">';
  html += hit["md-title"];
  if (hit["md-title-remainder"])
    html += ' - ' + hit["md-title-remainder"];
  if (link) html += '</a>';
  html += '</h3>';


  html += '<div class="meta">';
  // author
  if (hit["md-author"]) {
    html += '<span class="creator">' + Drupal.t('By')
      + ' <em>' + hit['md-author'] + '</em></span> ';
  } else if (hit['md-title-responsibility']) {
    html += '<span class="creator">' + ' <em>' + hit['md-title-responsibility'] + '</em></span>';
  }
  // date
  if (hit['md-date']) {
    html += '<span class="publication_date"> (<em>'
      + hit['md-date'] + '</em>)</span>';
  }
  html += '</div>';

  // journal title
  html += '<div class="meta">';
  if (hit["location"] && hit["location"][0] && hit["location"][0]["md-journal-title"]) {
    html += hit["location"][0]["md-journal-title"];
    if (hit["location"][0]["md-journal-subpart"]) {
      html += '&nbsp;&nbsp;&nbsp;' + hit["location"][0]["md-journal-subpart"];
    }
  } else if (hit["md-journal-title"]) {
    html += hit["md-journal-title"];
    if (hit["md-journal-subpart"]) {
      html += '&nbsp;&nbsp;&nbsp;' + hit["md-journal-subpart"];
    }
  }
  html += '</div>';
  
  
  // description
  if (hit["md-description"]) {
    html += '<div class="abstract"><p>';
    // limit description to 400 characters
    html += hit["md-description"][0].substr(0, 400);
    html += '</p></div>';
  }


  // subjects
  if (hit["location"] && hit["location"][0] && hit["location"][0]["md-subject"]) {
    html += '<div class="subjects"><h4>'
      + Drupal.t('Subjects') + ':</h4><ul>';
    for (var i = 0; i < hit["location"][0]["md-subject"].length; i++) {
      html += '<li>' + hit["location"][0]["md-subject"][i]  + '</li>';
    }
    html += '</ul></div>';
  }

  // CLOSE - record div
  html += '</div>';
  // CLOSE - result list item
  html += '</li>';

  return html;
};

Drupal.theme.mkdruStatus = function(activeClients, clients) {
  if (Number(activeClients) < 1) {
    jQuery('a[href="#addon-0-result"]').parent().removeClass('spinning');
  }
  return Drupal.t('Waiting on ') + activeClients + Drupal.t(' out of ')
         + clients + Drupal.t(' targets');
};

