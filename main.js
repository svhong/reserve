var the_data = [];
function delete_area() {
  change_buttons();
$(".modal_area").html("");
$("<p>").text("Confirmation #"+the_data[0].id).css({
  "font-size":"50px",
  "text-align":"center"
}).appendTo(".modal_area");
$("<p>").text("Thank you for RSVPing " + the_data[0].name +"!").css({
  "font-size":"30px",
  "text-align":"center"
}).appendTo(".modal_area");
  // $(".modal_area").html("Confirmation #"+the_data[0].id+"<br/>"+"Thank you for RSVPing " + the_data[0].name +"!"+ "<br/>" + "your selection was: " + the_data[0].selection).css("text-align","center");// It works, just need to add css and other stuff
}

// function db_check() {
//   $.ajax({
//     url: 'database.php',
//     method: 'POST',
//     dataType: 'json',
//     success: function(response) {
//       console.log('this is a success message', response);
//       for (var i = response.data.length-1; i >= 0; i--){
//         the_data.push(response.data[i]);
//       }
//     },
//     error: function(response) {
//       console.log('failed', response);
//     }
//   });
// }

function check_data(){
    return_data(function(){

      delete_area();
    });

    function return_data(callback){
      $.ajax({
        url: 'database.php',
        method: 'POST',
        dataType: 'json',
        success: function(response) {
          console.log('this is a success message', response);
          for (var i = response.data.length-1; i >= 0; i--){
            the_data.push(response.data[i]);
          }
          callback();
        },
        error: function(response) {
          console.error("Error, unable to reach the server", response);
        }
      });
    }
}

function add_rsvp() {
  //check input fields to ensure that the fields are filled out
  if (check_input_fields()) {
    error_input();
    return;
  }
  //object outlining the name and the choice
  var create_rsvp = {
    name: $('#input_data').val(),
    selection: $('input[name=entreeselect]:checked').val()
  };
  //ajax call to mysql db
  $.ajax({
    url: 'lunch_rsvp.php',
    method: 'POST',
    data: create_rsvp,
    dataType: 'json',
    success: function(response) {
      check_data();
    },
    error: function(response) {
      console.log('this is an error message', response);
      error_message();
    }
  });

}

function error_message(){
  $(".error_area").text("Sorry, there was an error. Please try again.").css({
    "font-size":"10px",
    "color":"red"
  })
}

function error_input(){
  $(".error_area").text('All input fields must contain at least one non-space character.').css({
    "font-size":"10px",
    "color":"red"
  })
}

function error_selection(){
  $(".error_area").text('All input fields must contain at least one non-space character.').css({
    "font-size":"10px",
    "color":"red"
  })
}

function check_input_fields() {
  var name = $('#input_data').val().replace(/\s+/g, '');
  if (name == '') {
    return true;
  }

}




// function display(message) {
//   $('#modal_message').html(message);
//   $('#error_modal').modal('show');
// }

function rsvp_modal() {
  $('#rsvp_modal').modal({
    backdrop: 'static',
    keyboard: false,
    show: true
  });
}

function select_menu(picture) {
  switch (picture) {
    case 'Filet Mignon':
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
    case 'Chicken':
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
    case 'Sea Bass':
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
    case 'Vegetarian':
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
    default:
      $(".add_me").children().remove();
      $('#the_pic').attr("src", "photos/bondmartini.jpg");
  }
}

function change_buttons(){
  $(".submit_button").remove();
  $(".done_button").text("Done!");
}
$(document).ready(function() {
  $('.the_button').click(rsvp_modal);
  $('.submit_button').click(add_rsvp);
  $('input[name=entreeselect]:radio').click(function() {
    $(".remove_me").remove();
    select_menu($(this).val());
  });
});
