<?php

header('Content-Type: application/json');

require('../../../connection.php');

$page = $_GET['page'] - 1;

$query = "SELECT * FROM salaries LIMIT $page, 15";
$result = mysqli_query($link, $query);

$salaries = [];
while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
	array_push($salaries, $row);
}

echo json_encode($salaries);