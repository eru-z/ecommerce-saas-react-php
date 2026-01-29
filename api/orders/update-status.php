<?php
require "../db.php";

$data = json_decode(file_get_contents("php://input"), true);

$stmt = $conn->prepare("
  UPDATE orders SET status = ? WHERE id = ?
");
$stmt->bind_param("ss", $data["status"], $data["id"]);
$stmt->execute();

echo json_encode(["success" => true]);
