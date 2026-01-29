<?php
require "../db.php";

$id = $_GET["id"] ?? "";

$stmt = $conn->prepare("SELECT * FROM orders WHERE id = ?");
$stmt->bind_param("s", $id);
$stmt->execute();
$order = $stmt->get_result()->fetch_assoc();

$stmt = $conn->prepare("
  SELECT product_name, quantity, price
  FROM order_items WHERE order_id = ?
");
$stmt->bind_param("s", $id);
$stmt->execute();
$items = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

echo json_encode([
  "order" => $order,
  "items" => $items
]);
