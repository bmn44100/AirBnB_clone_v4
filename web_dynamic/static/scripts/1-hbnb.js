let hbnbAmenities = [];
$(document).ready(() => {
  $('.amenities input').change(function () {
    if ($(this).prop('checked')) {
      hbnbAmenities.push($(this).attr('data-name'));
    }
    else {
      let amenity = $(this).attr('data-name');
      let index = hbnbAmenities.indexOf(amenity);
      if (index > -1) {
        hbnbAmenities.splice(index, 1);
      }
    }
    hbnbAmenities.sort();
    $('.amenities h4').text(hbnbAmenities.join(', '));
  });
});
