<?php
require_once '../db.php';

header("Content-Type: application/json");

$alerts = [];

/* ======================
   STUCK ORDERS
====================== */
$stmt = $pdo->query("
  SELECT COUNT(*) FROM orders
  WHERE status = 'processing'
  AND created_at < NOW() - INTERVAL 24 HOUR
");

$stuck = (int) $stmt->fetchColumn();

if ($stuck > 0) {
  $alerts[] = [
    'type' => 'warning',
    'title' => 'Orders stuck in processing',
    'message' => "$stuck orders have not been shipped in 24h",
  ];
}

/* ======================
   HIGH VALUE ORDER
====================== */
$stmt = $pdo->query("
  SELECT order_number, total
  FROM orders
  ORDER BY total DESC
  LIMIT 1
");

$high = $stmt->fetch();

if ($high && $high['total'] > 300) {
  $alerts[] = [
    'type' => 'info',
    'title' => 'High value order',
    'message' => $high['order_number'] . ' · €' . number_format($high['total'], 2),
  ];
}

/* ======================
   NO ORDERS TODAY
====================== */
$stmt = $pdo->query("
  SELECT COUNT(*) FROM orders
  WHERE DATE(created_at) = CURDATE()
");

$todayOrders = (int) $stmt->fetchColumn();

if ($todayOrders === 0) {
  $alerts[] = [
    'type' => 'danger',
    'title' => 'No orders today',
    'message' => 'No orders have been placed today',
  ];
}

echo json_encode($alerts);
