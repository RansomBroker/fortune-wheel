<?php
require_once ('connection.php');

$id = $_POST['id'];


$query = $connection->query("DELETE FROM labels WHERE id = $id");

echo json_encode($connection->affected_rows);