<?php
require_once '../db.php';

$userId = $_GET['userId'] ?? 0;

$stats = [
  'sales' => 0,
  'volume' => 0,
  'revenue' => 0,
  'orders' => 0,
  'returns' => 0,
];

// Revenue + orders
$row = $db->query("
  SELECT 
    COUNT(*) AS orders,
    SUM(total) AS revenue
  FROM orders
")->fetch();

$stats['orders']  = (int)$row['orders'];
$stats['revenue'] = (float)$row['revenue'];
$stats['sales']   = round($stats['revenue']);
$stats['volume']  = $stats['orders'] * 3; // example metric

// Returns
$row = $db->query("
  SELECT COUNT(*) AS returns
  FROM orders
  WHERE status = 'cancelled'
")->fetch();

$stats['returns'] = (int)$row['returns'];

echo json_encode($stats);
