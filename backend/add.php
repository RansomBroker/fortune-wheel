<?php

require_once('connection.php');

// get last item in db
$query = $connection->query("SELECT * FROM labels ORDER BY ID DESC")->fetch_assoc();

// initial data
if ($query != NULL) {
    $counter = 1;
    $label = $_POST['label'];
    $color = $query['counter'] % 2 == 0 ? "#5dc1d8" : "#f42d92";
    // upload image
    if (isset($_FILES['img'])) {
        $exstention = pathinfo($_FILES['img']['name'], PATHINFO_EXTENSION);
        $new_name = time() . '.' . $exstention;

        move_uploaded_file($_FILES['img']['tmp_name'], '../img/' . $new_name);
    }
    $counter += $query['counter'];
    $insert = $connection->query("INSERT INTO labels (fillStyle, name, img, counter) VALUES ('$color', '$label', '$new_name', '$counter')");

    echo json_encode($connection->affected_rows);
} else {
    $counter = 1;
    $label = $_POST['label'];
    $color = "#5dc1d8";
    // upload image
    if (isset($_FILES['img'])) {
        $exstention = pathinfo($_FILES['img']['name'], PATHINFO_EXTENSION);
        $new_name = time() . '.' . $exstention;

        move_uploaded_file($_FILES['img']['tmp_name'], '../img/' . $new_name);
    }
    $insert = $connection->query("INSERT INTO labels (fillStyle, name, img, counter) VALUES ('$color', '$label', '$new_name', '$counter')");

    echo json_encode($connection->affected_rows);
}
