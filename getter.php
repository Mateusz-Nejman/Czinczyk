<?php
include "functions.php";

header("Content-Type: application/json");
$temp_actual_turn = 0;
$action = (string)$_GET['action'];
$table = (int)$_GET['table'];
$id = (int)$_GET['id'];
$name = (string)$_GET['name'];
$grid = (int)$_GET['grid'];
$pid = (int)$_GET['pid'];
$pass = (string)$_GET['pass'];

if($action == "create")
{
    createTable($table,$pass);
}
//echo $action;

if($action == "join")
{
    join_b($id,$name,$table);
}

if($action == "move")
{
    move($id,$grid,$table,$pid);
}
if($action == "roll")
{
    roll_the_dice($table,$pid);
}
if($action == "next")
{
    next_turn($table,$pid);
}
if($action == "get_state")
{
    get_state($table);
}

if($action == "set_stage")
{
    set_stage($table, $id,$pid);
}

if($action == "add_logs")
{
    add_to_logs($table,$id,$pid);
}

if($action == "now")
{
    get_now();
}

if($action == "list")
{
    $dir = "boards";
    $files = scandir($dir);
    $obj = new stdClass();
    $obj->tables = [];
    $obj->players0 = [];
    $obj->players1 = [];
    $obj->players2 = [];
    $obj->players3 = [];

    foreach($files as $i => $v) {
        if ($i > 1) {
            $id = str_replace("board_", "", str_replace(".json", "", $v));
            $arr = getPlayers($id);

            $obj->tables[] = $id;
            $obj->players0[] = $arr[0];
            $obj->players1[] = $arr[1];
            $obj->players2[] = $arr[2];
            $obj->players3[] = $arr[3];
        }
    }

    echo json_encode($obj,true);
    exit;
}

if($action == "MD5")
{
    $obj = new stdClass();
    $obj->MD5 = md5($pass);
}
?>