<?php
require "../db.php";

$sql = "
  SELECT 
    o.id,
    o.order_number,
    o.customer_name,
    o.customer_email,
    o.total,
    o.status,
    o.created_at,
    COUNT(oi.id) AS item_count
  FROM orders o
  LEFT JOIN order_items oi ON oi.order_id = o.id
  GROUP BY o.id
  ORDER BY o.created_at DESC
";

$result = $conn->query($sql);
$orders = [];

while ($row = $result->fetch_assoc()) {
  $orders[] = [
    "id" => $row["id"],
    "orderNumber" => $row["order_number"],
    "total" => (float)$row["total"],
    "status" => $row["status"],
    "createdAt" => $row["created_at"],
    "items" => array_fill(0, (int)$row["item_count"], null),
    "customer" => [
      "name" => $row["customer_name"],
      "email" => $row["customer_email"]
    ]
  ];
}

echo json_encode($orders);
