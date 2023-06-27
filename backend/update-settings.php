<?php

require_once ('connection.php');

$bgImgName =  "background-default.png";
$logoImgName = "logo-default.png";
$headerImgName = "header-default.png";
$bodyImgName = "body-default.png";
$footerImgName = "footer-default.png";


$item = $_POST['data-name'];
// cari
$findItems = $connection->query("
                SELECT *
                FROM settings
            ")->fetch_assoc();
$dataKey = "";
foreach ($findItems as $key => $v) {
    if ($v == $item) {
        $dataKey = $key;
    }
}


// update
if ($dataKey == "bg_img") {
    $connection->query("
                UPDATE settings
                SET bg_img = '$bgImgName'  
            ");

    echo json_encode($connection->affected_rows);
}

if ($dataKey == "logo_img") {
    $connection->query("
                UPDATE settings
                SET logo_img = '$logoImgName'  
            ");

    echo json_encode($connection->affected_rows);
}

if ($dataKey == "header_img") {
    $connection->query("
                UPDATE settings
                SET header_img = '$headerImgName'  
            ");

    echo json_encode($connection->affected_rows);
}

if ($dataKey == "body_img") {
    $connection->query("
                UPDATE settings
                SET body_img = '$bodyImgName'  
            ");

    echo json_encode($connection->affected_rows);
}

if ($dataKey == "footer_img") {
    $connection->query("
                UPDATE settings
                SET footer_img = '$footerImgName'  
            ");

    echo json_encode($connection->affected_rows);
}
