<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../db.php';
include_once '../../models/product.php';
include_once '../../models/history.php';

$database = new Database();
$db = $database->connect();
$history = new History($db);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $history->username = $_GET['user'];
    $result = $history->getPurchaseHistory('anon');
    $num = $result->rowCount();

    if ($num > 0) {
        $products_arr = array();

        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $history = array(
                'purchase_date' => $purchase_date,
                'transaction_token' => $transaction_token,
                'id' => $id,
                'name' => $name,
                'price' => $price,
                'img_path' => $img_path,
                'quantity' => $quantity,
            );
            array_push($products_arr, $history);
        }
        echo json_encode($products_arr, JSON_PRETTY_PRINT);
    }
}
