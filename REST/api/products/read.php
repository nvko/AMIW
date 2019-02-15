<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../db.php';
include_once '../../models/product.php';

$database = new Database();
$db = $database->connect();

$product = new Product($db);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id'])) {
        $id = htmlspecialchars($_GET['id']);
        $result = $product->getProduct($id, null);
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
                );
                array_push($products_arr, $product);
            }
            echo json_encode($products_arr, JSON_PRETTY_PRINT);
        }
    } else {
        $result = $product->getProducts();
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
                );
                array_push($products_arr, $product);
            }

            echo json_encode($products_arr, JSON_PRETTY_PRINT);

        } else {
            echo json_encode(
                array('message' => 'No products found.')
            );
        }
    }
}
