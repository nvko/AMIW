<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../db.php';
include_once '../../models/cart.php';
include_once '../../models/history.php';

$database = new Database();
$db = $database->connect();

$history = new History($db);
$cart = new Cart($db);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $data_json = json_decode(file_get_contents("php://input"), true);

    // generate transaction token and purchase date
    $transaction_token = md5(uniqid(rand(), true));
    $date = date("Y-m-d H:i:s");

    // bind cart and history variables
    $history->username = $data_json['user'];
    $cart->user = $data_json['user'];

    $history->transaction_token = $transaction_token;
    $history->purchase_date = $date;

    $result = $cart->getProducts();
    $num = $result->rowCount();
    // if any products in cart
    if ($num > 0) {

        $products_arr = array();
        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $product = array(
                'id' => $id,
                'name' => $name,
                'price' => $price,
                'img_path' => $img_path,
                'quantity' => $quantity,
            );
            array_push($products_arr, $product);
        }

        //insert products into purchase history
        for ($i = 0; $i < count($products_arr); ++$i) {
            // bind other history variables
            $history->product_id = $products_arr[$i]['id'];
            $history->quantity = $products_arr[$i]['quantity'];
            $history->insertIntoPurchaseHistory($transaction_token, $date);
        }

        //clear user's cart
        $cart->clearCart();
        echo json_encode(
            array('message' => 'You successfully bought your products!')
        );
    } else {
        echo json_encode(
            array('message' => 'No products in cart.')
        );
    }

}
