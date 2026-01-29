<?php
require_once '../db.php';

$total = $db->query("SELECT COUNT(*) FROM orders")->fetchColumn();

$statuses = [
  'delivered' => 0,
  'processing' => 0,
  'cancelled' => 0,
];

$rows = $db->query("
  SELECT status, COUNT(*) as count
  FROM orders
  GROUP BY status
");

foreach ($rows as $row) {
  if (isset($statuses[$row['status']])) {
    $statuses[$row['status']] = (int)$row['count'];
  }
}

$result = [];
foreach ($statuses as $key => $count) {
  $result[$key] = $total > 0
    ? round(($count / $total) * 100)
    : 0;
}

echo json_encode($result);
