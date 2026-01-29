<?php
require "../db.php";

$data = json_decode(file_get_contents("php://input"), true);

$stmt = $conn->prepare("DELETE FROM products WHERE id = ?");
$stmt->bind_param("s", $data["id"]);

$success = $stmt->execute();

echo json_encode(["success" => $success]);
