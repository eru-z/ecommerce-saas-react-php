<?php
require_once '../db.php';

$months = [];
for ($i = 11; $i >= 0; $i--) {
  $key = date('Y-m', strtotime("-$i months"));
  $months[$key] = [
    'month' => date('M', strtotime($key)),
    'revenue' => 0,
  ];
}

$sql = "
  SELECT 
    DATE_FORMAT(created_at, '%Y-%m') AS ym,
    SUM(total) AS revenue
  FROM orders
  GROUP BY ym
";

$stmt = $db->query($sql);

while ($row = $stmt->fetch()) {
  if (isset($months[$row['ym']])) {
    $months[$row['ym']]['revenue'] = (float)$row['revenue'];
  }
}

echo json_encode(array_values($months));
