<?php
require_once ('connection.php');

$query = $connection->query("SELECT * FROM labels")->fetch_all();

echo json_encode($query);