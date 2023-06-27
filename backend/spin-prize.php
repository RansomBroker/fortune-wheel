<?php

require_once ('connection.php');

$prize = $connection->query("
            SELECT * 
            FROM labels
            WHERE
                is_prize = 1
        ")->fetch_all();

if (sizeof($prize) < 1) {
    echo json_encode(array("resp"=> 0));
    die();
}
$calculated_prize = array_rand($prize);

echo json_encode($prize[$calculated_prize]);
