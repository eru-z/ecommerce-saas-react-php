<?php
require_once '../db.php';

$stmt = $pdo->query("
  SELECT
    id,
    order_number,
    customer_name,
    customer_email,
    total,
    status,
    created_at
  FROM orders
  ORDER BY created_at DESC
");

$orders = [];

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
  $orders[] = [
    "id" => $row["id"],
    "orderNumber" => $row["order_number"],
    "customer" => [
      "name" => $row["customer_name"],
      "email" => $row["customer_email"],
    ],
    "total" => (float) $row["total"],
    "status" => $row["status"],
    "createdAt" => $row["created_at"],
    "items" => []
  ];
}

echo json_encode($orders);
