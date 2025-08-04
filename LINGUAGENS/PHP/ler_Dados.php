<?php

require("conexao.php");


mysql_select_db("sis_academico");


$consulta = "SELECT * FROM matricula";


$matricula= mysql_query($consulta);


while($array = mysql_fetch_array($matricula))

{

  echo $array[‘id’] . " - ".

       " Aluno: " . $array[‘nome’].

       " Curso: ".$array[‘curso’]." <br />";

}

?>