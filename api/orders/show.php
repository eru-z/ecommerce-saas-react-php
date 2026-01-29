<?php
require_once "../../config/cors.php";
require_once "../../config/db.php";

$id = $_GET['id'] ?? null;

if (!$id) {
  http_response_code(400);
  echo json_encode(["error" => "Order ID required"]);
  exit;
}

$order = $pdo->prepare("SELECT * FROM orders WHERE id = ?");
$order->execute([$id]);

$items = $pdo->prepare("SELECT * FROM order_items WHERE order_id = ?");
$items->execute([$id]);

echo json_encode([
  "order" => $order->fetch(),
  "items" => $items->fetchAll()
]);
