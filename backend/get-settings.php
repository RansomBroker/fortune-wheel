<?php
require_once('connection.php');

$query = $connection->query("SELECT * FROM settings")->fetch_all();

echo json_encode($query);
