<?php
require "../db.php";

$data = json_decode(file_get_contents("php://input"), true);

$stmt = $conn->prepare("
  INSERT INTO products
  (id, name, category, description, price, stock, status, image)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
");

$stmt->bind_param(
  "ssssdiis",
  $data["id"],
  $data["name"],
  $data["category"],
  $data["description"],
  $data["price"],
  $data["stock"],
  $data["status"],
  $data["image"]
);

$success = $stmt->execute();

echo json_encode(["success" => $success]);
