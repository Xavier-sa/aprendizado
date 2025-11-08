<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form method="get" action="zindex.php">
    Número 1: <input type="number" name="a"><br>
    Número 2: <input type="number" name="b"><br>
    <input type="submit" value="Calcular">
</form>

    <?php
    $n1= $_GET["a"];
    $n2= $_GET["b"];
    echo "<h2> Valores recebidos: $n1 e $n2</h2>";
    $m = ($n1 + $n2) / 2;
    echo "A soma vale" . ($n1 + $n2) ;
    echo "<br> A subtração vale " . ($n1 - $n2);
    echo "<br> A média vale " . $m;
    echo "<br>" . $m;

    ?>
</body>
</html>