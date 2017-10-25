<?php
require_once ('mysqli_connect.php');
$output['success'] = false;
$output['error'] = false;
$query = "SELECT * FROM `rsvp`";
$list = mysqli_query($conn, $query);
if(mysqli_num_rows($list)){
    $output['success'] = true;
    $output['message'] = 'List Retrieved!';
    while ($row = mysqli_fetch_assoc($list)) {
        $output['data'][] = $row;
    }
} else {
    $output['error'] = true;
    $output['message'][] = 'There was a problem retrieving data from the server. Please try again later.';
}
print(json_encode($output));
?>
