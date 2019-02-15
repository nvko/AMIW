<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../db.php';
include_once '../../models/cart.php';
include_once '../../models/product.php';

$database = new Database();
$db = $database->connect();

$cart = new Cart($db);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // getting data from sent json string
    $data_json = json_decode(file_get_contents("php://input"), true);
    // setting cart variables
    $cart->user = $data_json['user'];
    $cart->product_id = $data_json['product_id'];
    if ($cart->ifProductExistsInCart()) {
        if ($cart->update()) {
            echo json_encode(
                array('message' => 'Updated product in cart')
            );
        } else {
            echo json_encode(
                array('message' => 'Couldn\'t update product to cart')
            );
        }
    } else {
        if ($cart->insert()) {
            echo json_encode(
                array('message' => 'Added product to cart')
            );
        } else {
            echo json_encode(
                array('message' => 'Couldn\'t add product to cart')
            );
        }
    }
}
