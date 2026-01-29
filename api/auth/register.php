<?php
ob_start();
header('Content-Type: application/json');

require_once __DIR__ . '/../db.php';

try {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!$data) {
        throw new Exception('Invalid JSON');
    }

    $full_name = trim($data['full_name'] ?? '');
    $email = trim($data['email'] ?? '');
    $password = $data['password'] ?? '';

    if ($full_name === '' || $email === '' || $password === '') {
        throw new Exception('Missing required fields');
    }

    $hash = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $pdo->prepare(
        "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)"
    );
    $stmt->execute([$full_name, $email, $hash]);

    echo json_encode([
        'success' => true,
        'message' => 'User registered'
    ]);
} catch (Throwable $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}

exit;
