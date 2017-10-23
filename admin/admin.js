var the_data = [];
var last_table = null;
function check_data(){
    return_data(function(){
        for(var i = 0; i <= the_data.length; i++){
          db_to_dom(the_data[i]);
        }
    });

    function return_data(callback){
      $.ajax({
        url: 'database.php',
        method: 'POST',
        dataType: 'json',
        success: function(response) {
          console.log('this is a success message', response);
          the_data = [];
          $(".append_here").html("");
          for (var i = response.data.length-1; i >= 0; i--){
            the_data.push(response.data[i]);
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

function db_to_dom(object){
  var id_table = $("<td>").html(object['id']);
  var name_table = $("<td>").html(object['name']);
  var selection_table = $("<td>").html(object['selection']);
  var date_table = $("<td>").html(object['date']);
  var del = $("<button>").addClass('btn btn-danger btn-xs').text("delete").attr({"id_num":object['id']}).click(function(){
    remove_rsvp(this);
  });
  var edit = $("<button>").addClass('btn btn-success btn-xs').text("edit").attr({"id_num":object['id']}).click(function(){
    console.log("edit me!");
  });

  var tr = $("<tr>").addClass('parent_row');
  tr.append(id_table, name_table, selection_table, date_table, edit,del);
  $('.append_here').append(tr);
}

function remove_rsvp(element){
    var delete_data = {
        'id': $(element).attr('id_num')
    };

    $.ajax({
        url: 'delete.php',
        method: 'POST',
        data: delete_data,
        dataType: 'json',
        success: function(response){
            if(response.success){
                console.log(response.message);
                check_data();
            } else {
                console.log(response.message);
            }
        }
    });
}

$(document).ready(function(){
  check_data();
});
