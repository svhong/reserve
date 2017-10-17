function delete_area() {
  var the_data = $("#input_data").val();
  var the_choice = $("#exampleSelect1").val();
  console.log('AJAX call to mysql DB to input', the_data, "with choice of", the_choice);
  $('.form-inline').remove();
  $('.the_button').remove();
  $('h1').text("ACCESS DENIED!");
  $('h3').text("Your Credentials have been logged into the MI-6 Database")
  $('<h3>').text("This device will self destruct in...").appendTo('.the_area');
  $('<div>').css({
    "display":"inline-block",
    "height":"60px",
    "width":"45px",
    "background-color":"black",
    "color":"red",
    "position":"relative",
    "left":"50%",
    "transform":"translate(-50%)",
    "font-size":"50px",
    "text-align":"center"
  }).text("5").appendTo('.the_area');
  check_input_fields();
}

function db_check(){
  $.ajax({
      url:'database.php',
      method: 'POST',
      dataType: 'json',
      success: function(response){
          console.log('this is a success message', response);
      },
      error: function(response){
        console.log('failed', response);
      }
  });
}

function add_rsvp(){
  //check input fields to ensure that the fields are filled out
    if(check_input_fields()){
        return;
    }
    //object outlining the name and the choice
    var create_rsvp = {
        name: $('#input_data').val(),
        selection: $('#exampleSelect1').val()
    };
    //ajax call to mysql db
    $.ajax({
        url:'lunch_rsvp.php',
        method: 'POST',
        data: create_rsvp,
        dataType: 'json',
        success: function(response){
          console.log('this is a success message', response);
          delete_area();
        },
        error: function(response){
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

function select_menu(picture){
    switch(picture){
      case 'filet_mignon':
            $('<img>').attr("src","photos/filet.jpg").addClass("the_pic").appendTo('.the_menu')
            console.log("switch statement for filet mig")
            break;
      case 'chicken':
            $('.the_menu').text("CHICKEN BRUH")
            break;
      case 'sea_bass':
            $('.the_menu').text("SEA BASS BRUH")
            break;
      case 'vegetarian':
            $('.the_menu').text("EAT MEAT BRUH")
            break;
    }
}

$(document).ready(function(){
  $('.the_button').click(delete_area);
  $('input[name=entreeselect]:radio').click(function(){
    select_menu($(this).val());
  });
});
