<?php

define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PSSWD', '');
define('DB_NAME', 'employees');


$link = mysqli_connect(DB_HOST, DB_USER, DB_PSSWD) or die('Error al conectar con base de datos');

mysqli_select_db($link, DB_NAME) or die('Error al seleccionar base de datos');

mysqli_set_charset($link, 'utf8');