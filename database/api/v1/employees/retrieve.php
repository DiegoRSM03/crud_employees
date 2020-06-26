<?php

header('Content-Type: application/json');

require('../../../connection.php');

$page = $_GET['page'] - 1;
$page = 15 * $page;

$query = "SELECT emp_no, first_name, last_name, hire_date FROM employees LIMIT $page, 15";
$result = mysqli_query($link, $query);

$users = [];
while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
	array_push($users, $row);
}

echo json_encode($users);