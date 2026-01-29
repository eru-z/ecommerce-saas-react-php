<?php
require_once '../db.php';

$data = json_decode(file_get_contents("php://input"), true);

$pdo->beginTransaction();

$pdo->prepare("
  UPDATE orders SET
    order_number = ?,
    customer_name = ?,
    customer_email = ?,
    total = ?,
    status = ?
  WHERE id = ?
")->execute([
  $data["orderNumber"],
  $data["customer"]["name"],
  $data["customer"]["email"],
  $data["total"],
  $data["status"],
  $data["id"],
]);

$pdo->prepare("DELETE FROM order_items WHERE order_id = ?")
    ->execute([$data["id"]]);

$stmt = $pdo->prepare("
  INSERT INTO order_items (
    order_id, product_id, product_name, quantity, price
  ) VALUES (?, ?, ?, ?, ?)
");

foreach ($data["items"] as $item) {
  $stmt->execute([
    $data["id"],
    $item["productId"],
    $item["productName"],
    $item["quantity"],
    $item["price"],
  ]);
}

$pdo->commit();

echo json_encode(["success" => true]);
