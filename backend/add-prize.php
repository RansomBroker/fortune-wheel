<?php

require_once ('connection.php');

// update item
$labelId = $_POST['is-prize'];

$connection->query("
    UPDATE 
        labels 
    SET 
        is_prize = !is_prize
    WHERE
        id = $labelId
    ");

echo json_encode($connection->affected_rows);

