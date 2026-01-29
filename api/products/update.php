<?php
require "../db.php";

$data = json_decode(file_get_contents("php://input"), true);

$stmt = $conn->prepare("
  UPDATE products SET
    name = ?,
    category = ?,
    description = ?,
    price = ?,
    stock = ?,
    status = ?,
    image = ?
  WHERE id = ?
");

$stmt->bind_param(
  "sssdiiss",
  $data["name"],
  $data["category"],
  $data["description"],
  $data["price"],
  $data["stock"],
  $data["status"],
  $data["image"],
  $data["id"]
);

$success = $stmt->execute();

echo json_encode(["success" => $success]);
