<?php
require('mysqli_connect.php');
$output['success'] = false;
$output['error'] = false;
$name = $_POST['name'];
$selection = $_POST['selection'];
$query = "INSERT INTO `rsvp`(`name`,`selection`) VALUES ('$name','$selection')";
$list = mysqli_query($conn,$query);
if(mysqli_affected_rows($conn) > 0){
  $output['success'] = true;
  $output['message'][] = 'It worked!';
  $output['info'][] = mysqli_insert_id($conn); 
} else {
  $output['error'] = true;
  $output['message'][] = 'Didnt work bruh';
}
print(json_encode($output));
 ?>
