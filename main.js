function delete_area() {
  var the_data = $("#input_data").val();
  var the_choice = $("#exampleSelect1").val();
  console.log('AJAX call to mysql DB to input', the_data, "with choice of", the_choice);
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

function add_rsvp(){
  //check input fields to ensure that the fields are filled out
    if(check_input_fields()){
        return;
    }
    //object outlining the name and the choice
    var create_rsvp = {
        Name: $('#student_name').val(),
        Selection: $('#exampleSelect1').val()
    };
    //ajax call to mysql db
    $.ajax({
        url:'inserturl.here',
        method: 'POST',
        data: create_rsvp,
        dataType: 'json',
        success: function(response){
            console.log('this is a success message', response);
            if(response.success){
                success_message(response.message)
            } else {
                error_message(response.message);
            }
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

$(document).ready(function(){
  $('.the_button').click(delete_area);
})
