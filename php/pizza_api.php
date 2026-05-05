<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

$dsn = "mysql:host=localhost;dbname=pizza;charset=utf8"; // WILL BE ADDED IN PRODUCTION
$user = "root"; // WILL BE ADDED IN PRODUCTION
$pass = "root"; // WILL BE ADDED IN PRODUCTION

try {
    $dbh = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
} catch (PDOException $e) {
    echo json_encode(["error" => "DB connection failed"]);
    exit;
}

$method = $_SERVER["REQUEST_METHOD"];

switch ($method) {

    case "GET":
        $stmt = $dbh->query("SELECT * FROM pizza");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;

    case "POST":
        $data = json_decode(file_get_contents("php://input"), true);
        $stmt = $dbh->prepare("INSERT INTO pizza VALUES (?, ?, ?)");
        $stmt->execute([$data["pname"], $data["categoryname"], $data["vegetarian"]]);
        echo json_encode(["status" => "created"]);
        break;

    case "PUT":
        $data = json_decode(file_get_contents("php://input"), true);
        $stmt = $dbh->prepare("UPDATE pizza SET categoryname=?, vegetarian=? WHERE pname=?");
        $stmt->execute([$data["categoryname"], $data["vegetarian"], $data["pname"]]);
        echo json_encode(["status" => "updated"]);
        break;

    case "DELETE":
        parse_str($_SERVER["QUERY_STRING"], $q);
        $stmt = $dbh->prepare("DELETE FROM pizza WHERE pname=?");
        $stmt->execute([$q["pname"]]);
        echo json_encode(["status" => "deleted"]);
        break;
}
