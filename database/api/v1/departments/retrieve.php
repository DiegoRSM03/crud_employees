<?php

header('Content-Type: application/json');

require('../../../connection.php');

$page = $_GET['page'] - 1;
$page = 15 * $page;

$query = "SELECT * FROM departments LIMIT $page, 15";
$result = mysqli_query($link, $query);

$departments = [];
while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
	array_push($departments, $row);
}

echo json_encode($departments);