<?php

class Cart
{
    private $conn;
    private $table = 'cart';

    public $id;
    public $user;
    public $product_id;
    public $quantity;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // all products in cart
    public function getProducts() {
        $query = 'SELECT p.*, c.quantity FROM `' . $this->table . '` c
        INNER JOIN `products` p
        ON (c.product_id = p.id)
        WHERE c.user = \'' . $this->user .'\'';
        $statement = $this->conn->prepare($query);
        $statement->execute();
        return $statement;
    }

    // adds product to cart
    public function insert()
    {
        $query = 'INSERT INTO `' . $this->table . '`
        SET user =  :user, product_id = :product_id, quantity = 1';
        $statement = $this->conn->prepare($query);
        $this->user = htmlspecialchars(strip_tags($this->user));
        $this->product_id = htmlspecialchars(strip_tags($this->product_id));
        $statement->bindParam(':user', $this->user);
        $statement->bindParam(':product_id', $this->product_id);
        if ($statement->execute()) {
            return true;
        } else {
            printf("Error: %s.\n", $statement->error);
            return false;
        }
    }

    // updates quantity of a product
    public function update() {
        $query = 'UPDATE ' . $this->table . '
        SET quantity = quantity + 1
        WHERE (user = :user AND product_id = :product_id)';
        $statement = $this->conn->prepare($query);
        $this->user = htmlspecialchars(strip_tags($this->user));
        $this->product_id = htmlspecialchars(strip_tags($this->product_id));
        $statement->bindParam(':user', $this->user);
        $statement->bindParam(':product_id', $this->product_id);
        if ($statement->execute()) {
            return true;
        } else {
            printf("Error: %s.\n", $statement->error);
            return false;
        }
    }

    // removes product from cart
    public function delete() {
        $query = 'DELETE FROM ' . $this->table . '
        WHERE (user = :user AND product_id = :product_id)';
        $statement = $this->conn->prepare($query);
        $this->user = htmlspecialchars(strip_tags($this->user));
        $this->product_id = htmlspecialchars(strip_tags($this->product_id));
        $statement->bindParam(':user', $this->user);
        $statement->bindParam(':product_id', $this->product_id);
        if ($statement->execute()) {
            return true;
        } else {
            printf("Error: %s.\n", $statement->error);
            return false;
        }
    }

    // checks if given product is in cart
    public function ifProductExistsInCart() {
        $query = 'SELECT * FROM `' . $this->table . '`
        WHERE (user = :user AND product_id = :product_id)';
        $statement = $this->conn->prepare($query);
        $this->user = htmlspecialchars(strip_tags($this->user));
        $this->product_id = htmlspecialchars(strip_tags($this->product_id));
        $statement->bindParam(':user', $this->user);
        $statement->bindParam(':product_id', $this->product_id);
        $statement->execute();
        if ($statement->rowCount() > 0) {
            return true;
        } else {
            return false;
        }
    }

    // removes all products from cart
    public function clearCart() {
        $query = 'DELETE FROM `' . $this->table . '` WHERE user = :user';
        $statement = $this->conn->prepare($query);
        $this->user = htmlspecialchars(strip_tags($this->user));
        $statement->bindParam(':user', $this->user);
        $statement->execute();
    }
}
