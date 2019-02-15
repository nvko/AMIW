<?php
class History
{
    private $conn;
    private $table = 'purchase_history';

    public $id;
    public $username;
    public $product_id;
    public $quantity;
    public $transaction_token;
    public $purchase_date;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getPurchaseHistory()
    {
        $query = 'SELECT DISTINCT h.`purchase_date`, h.`transaction_token`, p.*,  h.`quantity`
        FROM `' . $this->table . '` h
        INNER JOIN `products` p
        ON (p.id = h.product_id) WHERE h.username = \'' . $this->username . '\' ORDER BY `purchase_date` DESC';
        $statement = $this->conn->prepare($query);
        $statement->execute();
        return $statement;
    }

    public function insertIntoPurchaseHistory($token, $date)
    {
        $query = 'INSERT INTO `' . $this->table . '`
        SET username = :username,
        product_id = :product_id,
        quantity = :quantity,
        transaction_token = :transaction_token,
        purchase_date =  :purchase_date';

        $statement = $this->conn->prepare($query);

        $this->username = htmlspecialchars(strip_tags($this->username));
        $this->product_id = htmlspecialchars(strip_tags($this->product_id));
        $this->quantity = htmlspecialchars(strip_tags($this->quantity));
        $this->transaction_token = htmlspecialchars(strip_tags($this->transaction_token));
        $this->purchase_date = htmlspecialchars(strip_tags($this->purchase_date));

        $statement->bindParam(':username', $this->username);
        $statement->bindParam(':product_id', $this->product_id);
        $statement->bindParam(':quantity', $this->quantity);
        $statement->bindParam(':transaction_token', $this->transaction_token);
        $statement->bindParam(':purchase_date', $this->purchase_date);

        $statement->execute();

    }
}
