var the_data = [];
var filet_counter = 0;
var chicken_counter = 0;
var seabass_counter = 0;
var vegan_counter = 0;
var na_counter = 0;
var other_counter = 0;

function check_data() {
  return_data(function() {
    for (var i = 0; i <= the_data.length; i++) {
      db_to_dom(the_data[i]);
      update_info();
    }
  });

  function return_data(callback) {
    $.ajax({
      url: 'database.php',
      method: 'POST',
      dataType: 'json',
      success: function(response) {
        console.log('this is a success message', response);
        the_data = [];
        $(".append_here").html("");
        counter_reset();
        for (var i = response.data.length - 1; i >= 0; i--) {
          the_data.push(response.data[i]);
          switch (response.data[i].selection) {
            case 'Filet Mignon':
              filet_counter++;
              break;
            case 'Chicken':
              chicken_counter++;
              break;
            case 'Sea Bass':
              seabass_counter++;
              break;
            case 'Vegetarian':
              vegan_counter++;
              break;
            case 'Not Attending':
              na_counter++;
              break;
            default:
              other_counter++;
              break;
          }
        }
        callback();
        console.log("refresh success")
      },
      error: function(response) {
        console.error("Error, unable to reach the server", response);
      }
    });
  }
}
//function to post data from array to the dom
function db_to_dom(object) {
  var id_table = $("<td>").html(object['id']);
  var name_table = $("<td>").attr({
    "contenteditable": true,
    "id_num": object['id']
  }).html(object['name']).bind("keydown", function(e) {
    if (e.which === 13) {
      e.preventDefault();
      edit_object2(this, this.textContent);
    } else {
      return;
    }
  });
  var selection_table = $("<td>").html(object['selection']).click(function(){
    console.log("I was clicked!")
      });
  var date_table = $("<td>").html(object['date']);
  var del = $("<button>").addClass('btn btn-danger btn-xs').text("delete").attr({
    "id_num": object['id']
  }).click(function() {
    remove_rsvp(this);
  });
  var edit = $("<button>").addClass('btn btn-success btn-xs').text("edit").attr({
    "id_num": object['id']
  }).click(function() {
    console.log("edit me!")
  });
  var tr = $("<tr>").addClass('parent_row');
  tr.append(id_table, name_table, selection_table, date_table, edit, del);
  $('.append_here').append(tr);
}
//function to delete the rsvp via delete button
function remove_rsvp(element) {
  var delete_data = {
    'id': $(element).attr('id_num')
  };

  $.ajax({
    url: 'delete.php',
    method: 'POST',
    data: delete_data,
    dataType: 'json',
    success: function(response) {
      if (response.success) {
        display_success(response.message);
        check_data();
      } else {
        display_error(response.message);
      }
    }
  });
}
//callback function for the selection change
function edit_object(element, value) {

  edit_selection(function(object) {
    $.ajax({
      url: 'edit.php',
      method: 'POST',
      data: object,
      dataType: 'json',
      success: function(response) {
        if (response.success) {
          display_success(response.message)
          check_data();
        } else {
          display_error(response.message);
        }
      }
    });
  })

  function edit_selection(callback) {
    var edit_select = {
      'id': $(element).attr('id_num'),
      'selection': value
    };
    callback(edit_select);
  }
}
//Callback function for the name change
function edit_object2(element, value) {

  edit_selection(function(object) {
    $.ajax({
      url: 'edit_name.php',
      method: 'POST',
      data: object,
      dataType: 'json',
      success: function(response) {
        if (response.success) {
          display_success(response.message)
          check_data();
        } else {
          display_error(response.message);
        }
      }
    });
  })

  function edit_selection(callback) {
    var edit_select = {
      'id': $(element).attr('id_num'),
      'name': value
    };
    callback(edit_select);
  }
}

function update_info(){
  $(".filet_count").text(filet_counter);
  $(".chicken_count").text(chicken_counter);
  $(".seabass_count").text(seabass_counter);
  $(".vegetarian_count").text(vegan_counter);
  $(".na_count").text(na_counter);
  $(".other_count").text(other_counter);
  $(".total_count").text(the_data.length);
}

function counter_reset(){
  filet_counter = 0;
  chicken_counter = 0;
  seabass_counter = 0;
  vegan_counter = 0;
  na_counter = 0;
  other_counter = 0;
}

function display_success(msg) {
  $(".the_message").css({
    "font-size": "14px",
    "color": "green"
  }).text(msg);
}

function display_error(msg) {
  $(".the_message").css({
    "font-size": "14px",
    "color": "red"
  }).text(msg);
}
