<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../db.php';
include_once '../../models/cart.php';

$database = new Database();
$db = $database->connect();
$cart = new Cart($db);

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // getting data from sent json string
    $data_json = json_decode(file_get_contents("php://input"), true);
    // setting cart variables
    $cart->user = $data_json['user'];
    $cart->product_id = $data_json['product_id'];
    if ($cart->ifProductExistsInCart()) {
        if ($cart->delete()) {
            echo json_encode(
                array('message' => 'Product has been removed.')
            );
        } else {
            echo json_encode(
                array('message' => 'Error. Product was not removed.')
            );
        }
    } else {
        echo json_encode(
            array('message' => 'Product is not in the cart.')
        );
    }
}
