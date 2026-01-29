<?php
require_once '../db.php';

$sql = "
  SELECT 
    p.name,
    SUM(oi.quantity) AS sold
  FROM order_items oi
  JOIN products p ON p.id = oi.product_id
  GROUP BY p.id
  ORDER BY sold DESC
  LIMIT 3
";

$stmt = $db->query($sql);

echo json_encode($stmt->fetchAll());
