<?php
require_once '../db.php';
session_start();

$data = json_decode(file_get_contents('php://input'), true);

$stmt = $pdo->prepare("
  UPDATE users SET name = ?, email = ? WHERE id = ?
");
$stmt->execute([
  $data['name'],
  $data['email'],
  $_SESSION['user_id']
]);

echo json_encode(['success' => true]);
