<?php

?>


<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File Upload</title>
    <link rel="stylesheet" href="./app/views/assets/css/style.css">
</head>
<body>
    <form action="./app/views/assets/pages/upload.php"
        method="POST"
        enctype="multipart/form-data">
        <input type="file" name="foto" accept="image/*">
        <button type="submit">Enviar</button>
    </form>
</body>
</html>








