<?php
require_once '../../config/database.php';
require_once '../../utils/response.php';

$data = json_decode(file_get_contents('php://input'), true);

$userId = $data['user_id'] ?? null;
$items  = $data['items'] ?? [];
$subtotal = $data['subtotal'] ?? 0;
$tax = $data['tax'] ?? 0;
$total = $data['total'] ?? 0;

if (!$items || !$total) {
    jsonResponse(['error' => 'Invalid order'], 400);
}

$orderId = uuid_create(UUID_TYPE_RANDOM);
$orderNumber = 'ORD-' . time();

try {
    $pdo->beginTransaction();

    $stmt = $pdo->prepare("
        INSERT INTO orders (id, order_number, user_id, subtotal, tax, total)
        VALUES (?, ?, ?, ?, ?, ?)
    ");

    $stmt->execute([
        $orderId,
        $orderNumber,
        $userId,
        $subtotal,
        $tax,
        $total
    ]);

    $itemStmt = $pdo->prepare("
        INSERT INTO order_items (id, order_id, product_id, quantity, price)
        VALUES (?, ?, ?, ?, ?)
    ");

    foreach ($items as $item) {
        $itemStmt->execute([
            uuid_create(UUID_TYPE_RANDOM),
            $orderId,
            $item['product_id'],
            $item['quantity'],
            $item['price']
        ]);
    }

    $pdo->commit();

    jsonResponse([
        'message' => 'Order placed successfully',
        'order_number' => $orderNumber
    ], 201);

} catch (Throwable $e) {
    $pdo->rollBack();
    jsonResponse(['error' => 'Checkout failed'], 500);
}
