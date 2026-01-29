<?php
require_once '../db.php';

header("Content-Type: application/json");

$activities = [];

/* ======================
   RECENT ORDERS (SAFE)
====================== */
try {
  $orderStmt = $pdo->query("
    SELECT
      id,
      order_number,
      total,
      created_at
    FROM orders
    ORDER BY created_at DESC
    LIMIT 6
  ");

  while ($o = $orderStmt->fetch()) {
    $activities[] = [
      'type' => 'order',
      'title' => 'New order placed',
      'message' => $o['order_number'] . ' · €' . number_format($o['total'], 2),
      'time' => $o['created_at'],
    ];
  }
} catch (Throwable $e) {
  // orders table missing → ignore
}

/* ======================
   RECENT CUSTOMERS (OPTIONAL)
   Only runs if table exists
====================== */
try {
  $check = $pdo->query("SHOW TABLES LIKE 'customers'");

  if ($check->rowCount() > 0) {
    $customerStmt = $pdo->query("
      SELECT name, email, created_at
      FROM customers
      ORDER BY created_at DESC
      LIMIT 4
    ");

    while ($c = $customerStmt->fetch()) {
      $activities[] = [
        'type' => 'customer',
        'title' => 'New customer registered',
        'message' => $c['name'] . ' (' . $c['email'] . ')',
        'time' => $c['created_at'],
      ];
    }
  }
} catch (Throwable $e) {
  // customers table missing → ignore
}

/* ======================
   SORT & LIMIT
====================== */
usort($activities, fn($a, $b) =>
  strtotime($b['time']) <=> strtotime($a['time'])
);

echo json_encode(array_slice($activities, 0, 6));
