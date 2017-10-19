function delete_area() {
  var the_data = $("#input_data").val();
  var the_choice = $("#exampleSelect1").val();
  console.log('AJAX call to mysql DB to input', the_data, "with choice of", the_choice);
  check_input_fields();
}

function db_check() {
  $.ajax({
    url: 'database.php',
    method: 'POST',
    dataType: 'json',
    success: function(response) {
      console.log('this is a success message', response);
    },
    error: function(response) {
      console.log('failed', response);
    }
  });
}

function add_rsvp() {
  //check input fields to ensure that the fields are filled out
  if (check_input_fields()) {
    return;
  }
  //object outlining the name and the choice
  var create_rsvp = {
    name: $('#input_data').val(),
    selection: $('#exampleSelect1').val()
  };
  //ajax call to mysql db
  $.ajax({
    url: 'lunch_rsvp.php',
    method: 'POST',
    data: create_rsvp,
    dataType: 'json',
    success: function(response) {
      console.log('this is a success message', response);
      delete_area();
    },
    error: function(response) {
      console.log('this is an error message', response);
    }
  });
}

function check_input_fields() {
  var name = $('#input_data').val().replace(/\s+/g, '');
  if (name == '') {
    var message = 'All input fields must contain at least one non-space character.';
    display(message);
    return true;
  }
}

function display(message) {
  $('#modal_message').html(message);
  $('#Modal').modal('show');
}

function select_menu(picture) {
  switch (picture) {
    case 'filet_mignon':
      $(".add_me").children().remove();
      $('#the_pic').attr("src", "photos/filet.jpg").css({
        "-webkit-animation": "fadein 2s",
        "-moz-animation": "fadein 2s",
        "-ms-animation": "fadein 2s",
        "-o-animation": "fadein 2s",
        "animation": "fadein 2s"
      });
      $("<li>").text("Coffee Rubbed Prime Filet Mignon").appendTo(".add_me");
      $("<li>").text("Tart Cherry Infused Demiglace").appendTo(".add_me");
      break;
    case 'chicken':
      $(".add_me").children().remove();
      $('#the_pic').attr("src", "photos/chicken.jpg").css({
        "-webkit-animation": "fadein 2s",
        "-moz-animation": "fadein 2s",
        "-ms-animation": "fadein 2s",
        "-o-animation": "fadein 2s",
        "animation": "fadein 2s"
      });
      $("<li>").text("Butter Roasted Chicken Breast").appendTo(".add_me");
      $("<li>").text("Charred Chanterelle and Rosemary Creme").appendTo(".add_me");
      break;
    case 'sea_bass':
      $(".add_me").children().remove();
      $('#the_pic').attr("src", "photos/seabass.jpg").css({
        "-webkit-animation": "fadein 2s",
        "-moz-animation": "fadein 2s",
        "-ms-animation": "fadein 2s",
        "-o-animation": "fadein 2s",
        "animation": "fadein 2s"
      });
      $("<li>").text("Sea Bass Poached in Butter").appendTo(".add_me");
      $("<li>").text("Sautéed Frisee and Caper Beurre Blanc").appendTo(".add_me");
      break;
    case 'vegetarian':
      $(".add_me").children().remove();
      $('#the_pic').attr("src", "photos/vegetarian.jpg").css({
        "-webkit-animation": "fadein 2s",
        "-moz-animation": "fadein 2s",
        "-ms-animation": "fadein 2s",
        "-o-animation": "fadein 2s",
        "animation": "fadein 2s"
      });
      $("<li>").text("BBQ Jack Fruit Stuffed Avocados").appendTo(".add_me");
      $("<li>").text("Sweet Corn Succotash").appendTo(".add_me");
      break;
  }
}

$(document).ready(function() {
  $('.the_button').click(delete_area);
  $('input[name=entreeselect]:radio').click(function() {
    $(".remove_me").remove();
    select_menu($(this).val());
  });
});
