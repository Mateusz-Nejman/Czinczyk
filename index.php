

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <title>Czinczyk</title>

    <link rel="stylesheet" href="style.css"/>
</head>

<body onload="">
<?php
$path = (isset($argv[1]) ? $argv[1] : ".");


function listDir(array $param)
{
    $root = scandir($param['directory']);
    $pad = $param['pad'];

    array_shift($root);
    array_shift($root);

    foreach($root as $value) {

        if(is_dir(realpath($param['directory']."/".$value))) {
            //echo $pad."+ ".$value."\n";

            /*$newParam = [
                'directory' => realpath($param['directory']."/".$value),
'level' => $param['level'] + 1,
'pad' => $pad.= "    "
];
listDir($newParam);*/
        }
        else {
            if(ends_with($value,".js") && !ends_with($value,"new_main.js") && !ends_with($value,"global_variables.js"))
                echo "<script src=\"".$value."\"></script>";
//echo $pad."- ".$value."\n";
        }
    }
}

function ends_with($string,$end)
{
    if($end === '')
        return true;

    $diff = \strlen($string) - \strlen($end);

    return $diff >= 0 && strpos($string,$end,$diff) !== false;
}

$param = [
    'directory' => '.',
    'level' => 0,
    'pad' => ""
];
listDir($param);
echo "<script src=\"global_variables.js\"></script>";
echo "<script src=\"new_main.js\"></script>";
?>

<!--<div id="center" class="center">
    <header>
        Czinczyk</header>
    <div class="content" id="content">
        <table style="border:1px solid black">
            <tr>
                <td style="border:1px solid black">Imię</td>
                <td style="border:1px solid black"><input id="inputName" type="text" name="name" class='toChange'>
                </td>
            </tr>
            <tr>
                <td style="border:1px solid black">Numer stołu</td>
                <td style="border:1px solid black"><input id="inputNumber" type="text" name="number" class='toChange' ></td>
            </tr>
            <tr>
                <td style="border:1px solid black">Hasło</td>
                <td style="border:1px solid black"><input id="inputPassword" type="password" name="pass" class='toChange' ></td>
            </tr>
        </table>
        <button onclick="playButtonClick()">Graj</button>
        <button onclick="createButtonClick()">Stwórz</button>
        <table style="width:100%" id="boards1">
            <tr>
                <th class='toChange'>Numer stołu</th>
                <th class='toChange'>Gracz 1</th>
                <th class='toChange'>Gracz 2</th>
                <th class='toChange'>Gracz 3</th>
                <th class='toChange'>Gracz 4</th>
            </tr>

        </table>
        Autor: Mateusz Nejman 2018-2019
    </div>
</div>--></body>
</html>