<?php
require_once ('mysqli_connect.php');
$response['success']= false;
$response['error'] = false;
if (isset($_POST['id'])){
    $rsvp_id = $_POST['id'];
    $query = "DELETE FROM `rsvp` WHERE ID=$rsvp_id";
    $result = mysqli_query($conn,$query);
    if ($result && mysqli_affected_rows($conn) == 1){
        $response = [
            'success' => true,
            'message' => 'Student successfully deleted!'
        ];
    } else {
        $response['message'][] = 'There was an error';
    };
    print(json_encode($response));
}
?>
