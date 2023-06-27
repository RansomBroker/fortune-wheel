<?php

require_once ('connection.php');

$imgVal = $connection->query("SELECT * FROM settings WHERE setting_id = 1")->fetch_assoc();

$bgImgName = $imgVal != NULL? ($imgVal['bg_img'] != ''? $imgVal['bg_img'] : "background-default.png") : "background-default.png";
$logoImgName = $imgVal != NULL? ($imgVal['logo_img'] != ''? $imgVal['logo_img'] : "logo-default.png") : "logo-default.png";
$headerImgName = $imgVal != NULL? ($imgVal['header_img'] != ''? $imgVal['header_img'] : "header-default.png") : "header-default.png";
$bodyImgName = $imgVal != NULL? ($imgVal['body_img'] != ''? $imgVal['body_img'] : "body-default.png") : "body-default.png";
$footerImgName = $imgVal != NULL? ($imgVal['footer_img'] != ''? $imgVal['footer_img'] : "footer-default.png") : "footer-default.png";

if (isset($_FILES['bg-img'])) {
    $bgImgExt = pathinfo($_FILES['bg-img']['name'], PATHINFO_EXTENSION);
    $bgImgName = time().'.'.$bgImgExt;

    move_uploaded_file($_FILES['bg-img']['tmp_name'], '../img/assets/'.$bgImgName);
}

if (isset($_FILES['logo-img'])) {
    $logoImgExt = pathinfo($_FILES['logo-img']['name'], PATHINFO_EXTENSION);
    $logoImgName = time().'.'.$logoImgExt;

    move_uploaded_file($_FILES['logo-img']['tmp_name'], '../img/assets/'.$logoImgName);
}

if (isset($_FILES['header-img'])) {
    $headerImgExt = pathinfo($_FILES['header-img']['name'], PATHINFO_EXTENSION);
    $headerImgName = time().'.'.$headerImgExt;

    move_uploaded_file($_FILES['header-img']['tmp_name'], '../img/assets/'.$headerImgName);
}

if (isset($_FILES['body-img'])) {
    $bodyImgExt = pathinfo($_FILES['body-img']['name'], PATHINFO_EXTENSION);
    $bodyImgName = time().'.'.$bodyImgExt;

    move_uploaded_file($_FILES['body-img']['tmp_name'], '../img/assets/'.$bodyImgName);
}

if (isset($_FILES['footer-img'])) {
    $footerImgExt = pathinfo($_FILES['footer-img']['name'], PATHINFO_EXTENSION);
    $footerImgName = time().'.'.$footerImgExt;

    move_uploaded_file($_FILES['footer-img']['tmp_name'], '../img/assets/'.$footerImgName);
}

$connection->query("
    INSERT INTO settings 
        (bg_img, logo_img, header_img, body_img, footer_img, setting_id) 
    VALUES 
        ('$bgImgName', '$logoImgName', '$headerImgName', '$bodyImgName','$footerImgName', 1)
    ON DUPLICATE KEY UPDATE 
        bg_img='$bgImgName', 
        logo_img='$logoImgName', 
        header_img='$headerImgName', 
        body_img='$bodyImgName', 
        footer_img='$footerImgName' 
    ");

echo $connection->affected_rows;