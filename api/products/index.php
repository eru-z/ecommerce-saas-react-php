<?php

require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../utils/response.php';

// CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

$method = $_SERVER['REQUEST_METHOD'];
$id = $_GET['id'] ?? null;

switch ($method) {

  case 'GET':
    $stmt = $pdo->query("SELECT * FROM products ORDER BY id DESC");
    jsonResponse($stmt->fetchAll());
    break;

  case 'POST':
    $data = json_decode(file_get_contents("php://input"), true);

    $stmt = $pdo->prepare("
      INSERT INTO products (name, description, category, price, stock, status, image)
      VALUES (:name, :description, :category, :price, :stock, :status, :image)
    ");

    $stmt->execute($data);

    $data['id'] = $pdo->lastInsertId();
    jsonResponse($data, 201);
    break;

  case 'PUT':
    if (!$id) jsonResponse(['error' => 'Missing ID'], 400);

    $data = json_decode(file_get_contents("php://input"), true);

    $stmt = $pdo->prepare("
      UPDATE products SET
        name=:name,
        description=:description,
        category=:category,
        price=:price,
        stock=:stock,
        status=:status,
        image=:image
      WHERE id=:id
    ");

    $stmt->execute([...$data, 'id' => $id]);

    jsonResponse(['id' => $id, ...$data]);
    break;

  case 'DELETE':
    if (!$id) jsonResponse(['error' => 'Missing ID'], 400);

    $stmt = $pdo->prepare("DELETE FROM products WHERE id=?");
    $stmt->execute([$id]);

    jsonResponse(null, 204);
    break;

  default:
    jsonResponse(['error' => 'Method not allowed'], 405);
}
