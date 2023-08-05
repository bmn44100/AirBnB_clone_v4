let objectsTotal = []; // amenity names
let statesTotal = []; // states names
let citiesTotal = []; // cities names
let amenities = []; // amenity ids
let states = []; // states ids
let cities = []; // cities ids

$(document).ready(() => {
  $('.amenities input').change(function () {
    if ($(this).prop('checked')) {
      objectsTotal.push($(this).attr('data-name'));
      amenities.push($(this).attr('data-id'));
    } else {
      let v = $(this).attr('data-name');
      let w = $(this).attr('data-id');
      let ind = objectsTotal.indexOf(v);
      let ind2 = amenities.indexOf(w);
      if (ind > -1) {
        objectsTotal.splice(ind, 1);
      }
      if (ind2 > -1) {
        amenities.splice(ind2, 1);
      }
    }
    objectsTotal.sort();
    $('.amenities h4').text(objectsTotal.join(', '));
  });
});

$(document).ready(() => {
  $('.states input').change(function () {
    if ($(this).prop('checked')) {
      statesTotal.push($(this).attr('data-name'));
      states.push($(this).attr('data-id'));
    } else {
      let v = $(this).attr('data-name');
      let w = $(this).attr('data-id');
      let ind = statesTotal.indexOf(v);
      let ind2 = states.indexOf(w);
      if (ind > -1) {
        statesTotal.splice(ind, 1);
      }
      if (ind2 > -1) {
        states.splice(ind2, 1);
      }
    }
    statesTotal.sort();
    $('.states h4').text(statesTotal.join(', '));
  });
});

$(document).ready(() => {
  $('.cities input').change(function () {
    if ($(this).prop('checked')) {
      citiesTotal.push($(this).attr('data-name'));
      cities.push($(this).attr('data-id'));
    } else {
      let v = $(this).attr('data-name');
      let w = $(this).attr('data-id');
      let ind = citiesTotal.indexOf(v);
      let ind2 = cities.indexOf(w);
      if (ind > -1) {
        citiesTotal.splice(ind, 1);
      }
      if (ind2 > -1) {
        cities.splice(ind2, 1);
      }
    }
    citiesTotal.sort();
    $('.cities').text(citiesTotal.join(', '));
  });
});

$.get('http://localhost:5001/api/v1/status',
  function (data, textStatus) {
    if (data['status'] === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  }
);

$.ajax({
  url: 'http://localhost:5001/api/v1/places_search/',
  type: 'POST',
  data: '{}',
  contentType: 'application/json',
  dataType: 'json',
  success: (data) => {
    for (let place of data) {
      $('SECTION.places').append('<article> <div class="title"> <h2>' +
        '#' + place.name + '</h2>' + '<div class="price_by_night">' + '$' +
        place.price_by_night + '</div> </div>' +
        '<div class="information"> <div class="max_guest">' +
        '<i class="fa fa-users fa-3x" aria-hidden="true"></i>' +
        '<br />' + place.max_guest + ' Guests' +
        '</div>' +
        '<div class="number_rooms"> <i class="fa fa-bed fa-3x" aria-hidden="true">' +
        '</i><br />' + place.number_rooms + ' Bedrooms' + '</div>' +
        '<div class="number_bathrooms"> <i class="fa fa-bed fa-3x" aria-hidden="true">' +
        '</i><br />' + place.number_bathrooms + ' Bathrooms' + '</div> </div>' +
        '<div class="description">' + place.description + '</div>' +
        '</article>');
    }
  }
});

$('button').click(() => {
  $.ajax({
    url: 'http://localhost:5001/api/v1/places_search/',
    type: 'POST',
    data: JSON.stringify({amenities: amenities, states: states, cities: cities}),
    contentType: 'application/json',
    dataType: 'json',
    success: (data) => {
      $('SECTION.places article').remove(); // remove old article
      for (let place of data) {
        $('SECTION.places').append('<article> <div class="title"> <h2>' +
          '#' + place.name + '</h2>' + '<div class="price_by_night">' + '$' +
          place.price_by_night + '</div> </div>' +
          '<div class="information"> <div class="max_guest">' +
          '<i class="fa fa-users fa-3x" aria-hidden="true"></i>' +
          '<br />' + place.max_guest + ' Guests' +
          '</div>' +
          '<div class="number_rooms"> <i class="fa fa-bed fa-3x" aria-hidden="true">' +
          '</i><br />' + place.number_rooms + ' Bedrooms' + '</div>' +
          '<div class="number_bathrooms"> <i class="fa fa-bed fa-3x" aria-hidden="true">' +
          '</i><br />' + place.number_bathrooms + ' Bathrooms' + '</div> </div>' +
          '<div class="description">' + place.description + '</div>' +
          '</article>');
      }
    }
  });
});
