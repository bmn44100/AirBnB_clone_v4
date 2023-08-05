let objectsTotal = [];
$(document).ready(() => {
  $('.amenities input').change(function () {
    if ($(this).prop('checked')) {
      objectsTotal.push($(this).attr('data-name'));
    } else {
      let object = $(this).attr('data-name');
      let index = objectsTotal.indexOf(object);
      if (index > -1) {
        objectsTotal.splice(index, 1);
      }
    }
    objectsTotal.sort();
    $('.amenities h4').text(objectsTotal.join(', '));
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
});
