<?php

class Product
{
    private $conn;
    private $table = 'products';

    public $id;
    public $name;
    public $price;
    public $img_path;
    public $quantity = null;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getProducts()
    {
        $query = 'SELECT * FROM `products`';
        $statement = $this->conn->prepare($query);
        $statement->execute();
        return $statement;
    }

    public function getProduct($id)
    {

        $query = 'SELECT * FROM `' . $this->table . '` WHERE id = ' . $id;
        $statement = $this->conn->prepare($query);
        $statement->execute();
        return $statement;

        //     $query = 'SELECT DISTINCT h.`purchase_date`, h.`transaction_token`, p.*,  h.`quantity`
        //     FROM `purchase_history` h
        //     INNER JOIN `products` p
        //     ON (p.id = h.product_id) WHERE `username` = ' . $user . ' ORDER BY `transaction_token`")';

        //     $statement = $this->conn->prepare($query);
        //     $statement->execute();
        //     return $statement;
        // }
    }

}
