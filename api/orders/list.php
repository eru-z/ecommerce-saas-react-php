<?php
require '../db.php';

$stmt = $pdo->query("SELECT * FROM orders ORDER BY id DESC");
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
