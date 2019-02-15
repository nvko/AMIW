<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../db.php';
include_once '../../models/cart.php';
include_once '../../models/product.php';

$database = new Database();
$db = $database->connect();
$product = new Product($db);
$cart = new Cart($db);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['user'])) {
        $cart->user = htmlspecialchars($_GET['user']);
        $result = $cart->getProducts();
        $num = $result->rowCount();
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
            echo json_encode($products_arr, JSON_PRETTY_PRINT);
        } else {
            array('message' => 'No products in cart.');
        }
    }
}
