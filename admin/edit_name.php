<?php
require_once ('mysqli_connect.php');
$response['success']= false;
$response['error'] = false;
if (isset($_POST['id'])){
    $rsvp_id = $_POST['id'];
    $change = $_POST['name'];
    $query = "UPDATE rsvp SET name = '$change'  WHERE ID = '$rsvp_id'";
    $result = mysqli_query($conn,$query);
    if ($result && mysqli_affected_rows($conn) == 1){
        $response = [
            'success' => true,
            'message' => 'Selection successfuly changed!'
        ];
    } else {
        $response['message'][] =  'There was an error, please try again';
    };
    print(json_encode($response));
}
?>
