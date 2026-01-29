<?php
require_once '../db.php';

$data = json_decode(file_get_contents("php://input"), true);

$pdo->prepare("DELETE FROM orders WHERE id = ?")
    ->execute([$data["id"]]);

echo json_encode(["success" => true]);
