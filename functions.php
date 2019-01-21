<?php
/**
 * Created by PhpStorm.
 * User: Mateusz
 * Date: 23.12.2018
 * Time: 18:36
 */

    $no_player = "Brak";

    function roll_the_dice($table, $pid)
    {
        $min = 0;
        $max = 7;
        //$rnd = Math.random();

        $rolled = rand($min,$max);
        if($rolled > 6)
            $rolled = 6;
        else if($rolled < 1)
            $rolled = 1;

        //echo $rolled;

        $fh = fopen("boards/board_".$table.".json","r");
        $text = fread($fh,filesize("boards/board_".$table.".json"));
        fclose($fh);

        $json = json_decode($text,true);
        $json["last".$pid] = strtotime(date('Y-m-d H:i:s'));

        $json["dice_value"] = $rolled;
        $fh1 = fopen("boards/board_".$table.".json","w");
        $toWrite = json_encode($json);
        fwrite($fh1,$toWrite);
        fclose($fh1);
        echo $toWrite;
        exit;
    }

    function move($idP,$newGridID,$table,$pid)
    {
        $fh = fopen("boards/board_".$table.".json","r");
        $text = fread($fh,filesize("boards/board_".$table.".json"));
        fclose($fh);

        $json = json_decode($text,true);
        $json["last".$pid] = strtotime(date('Y-m-d H:i:s'));

        $json["pion".$idP] = $newGridID;
        $fh1 = fopen("boards/board_".$table.".json","w");
        $toWrite = json_encode($json);
        fwrite($fh1,$toWrite);
        fclose($fh1);
        echo $toWrite;
        exit;
    }

    function join_b($idB, $newName,$table)
    {
        $fh = fopen("boards/board_".$table.".json","r");
        $text = fread($fh,filesize("boards/board_".$table.".json"));
        fclose($fh);

        $json = json_decode($text,true);


        $json["name".$idB] = $newName;
        $json["last".$idB] = strtotime(date('Y-m-d H:i:s'));

        if($json["name0"] != $GLOBALS['no_player'])
            $json["turnID"] = 0;
        else if($json["name1"] != $GLOBALS['no_player'])
            $json["turnID"] = 1;
        else if($json["name2"] != $GLOBALS['no_player'])
            $json["turnID"] = 2;
        else if($json["name3"] != $GLOBALS['no_player'])
            $json["turnID"] = 3;
        $fh1 = fopen("boards/board_".$table.".json","w");
        $toWrite = json_encode($json);
        fwrite($fh1,$toWrite);
        fclose($fh1);
        echo $toWrite;
        exit;
    }


    function next_turn($table,$pid)
    {

        //echo $rolled;

        $fh = fopen("boards/board_".$table.".json","r");
        $text = fread($fh,filesize("boards/board_".$table.".json"));
        fclose($fh);

        $json = json_decode($text,true);

        $actual_turn = $json["turnID"];
        $actual_turn+=1;
        if($actual_turn > 3)
            $actual_turn = 0;

        next_turn_id($json,$actual_turn);

        $json["last".$pid] = strtotime(date('Y-m-d H:i:s'));

        $json["turnID"] = $GLOBALS['temp_actual_turn'];
        $fh1 = fopen("boards/board_".$table.".json","w");
        $toWrite = json_encode($json);
        fwrite($fh1,$toWrite);
        fclose($fh1);
        echo $toWrite;
        exit;
    }

    function get_state($table)
    {

        //echo $rolled;

        $fh = fopen("boards/board_".$table.".json","r");
        $text = fread($fh,filesize("boards/board_".$table.".json"));
        fclose($fh);

        echo $text;
        exit;
    }

    function get_start($table)
    {
        $fh = fopen("boards/board_".$table.".json","r");
        $text = fread($fh,filesize("boards/board_".$table.".json"));
        fclose($fh);

        echo $text;
        exit;
    }

    function next_turn_id($json,$actual)
    {
        if($actual > 3)
            $actual = 0;

        if($json["name".$actual] != $GLOBALS['no_player'])
        {
            $GLOBALS['temp_actual_turn'] = $actual;
            return true;
        }
        else
        {
            return next_turn_id($json,$actual+1);
        }
    }

    function set_stage($table,$id,$pid)
    {
        $fh = fopen("boards/board_".$table.".json","r");
        $text = fread($fh,filesize("boards/board_".$table.".json"));
        fclose($fh);

        $json = json_decode($text,true);
        $json["last".$pid] = strtotime(date('Y-m-d H:i:s'));

        if($id < 3)
        {
            $json["stage"] = $id;
            $fh1 = fopen("boards/board_".$table.".json","w");
            $toWrite = json_encode($json);
            fwrite($fh1,$toWrite);
            fclose($fh1);
            echo $toWrite;
        }
        else
        {
            $json["stage"] = 0;
            $fh1 = fopen("boards/board_".$table.".json","w");
            $toWrite = json_encode($json);
            fwrite($fh1,$toWrite);
            fclose($fh1);
            next_turn($table,$pid);
        }
        exit;
    }

    function getPlayers($table)
    {
        $fh = fopen("boards/board_".$table.".json","r");
        $text = fread($fh,filesize("boards/board_".$table.".json"));
        fclose($fh);

        $json = json_decode($text,true);

        $arr = [];
        $arr[] = $json["name0"];
        $arr[] = $json["name1"];
        $arr[] = $json["name2"];
        $arr[] = $json["name3"];

        return $arr;
    }

    function add_to_logs($table, $id, $pid)
    {
        $fh = fopen("boards/board_".$table.".json","r");
        $text = fread($fh,filesize("boards/board_".$table.".json"));
        fclose($fh);

        $json = json_decode($text,true);

        if($json["log0"] == $GLOBALS["no_player"])
            $json["log0"] = $pid.",".$id;
        elseif($json["log1"] == $GLOBALS["no_player"])
            $json["log1"] = $pid.",".$id;
        elseif($json["log2"] == $GLOBALS["no_player"])
            $json["log2"] = $pid.",".$id;
        elseif($json["log3"] == $GLOBALS["no_player"])
            $json["log3"] = $pid.",".$id;
        elseif($json["log4"] == $GLOBALS["no_player"])
            $json["log4"] = $pid.",".$id;
        elseif($json["log5"] == $GLOBALS["no_player"])
            $json["log5"] = $pid.",".$id;
        else
        {
            $json["log0"] = $json["log1"];
            $json["log1"] = $json["log2"];
            $json["log2"] = $json["log3"];
            $json["log3"] = $json["log4"];
            $json["log4"] = $json["log5"];
            $json["log5"] = $pid.",".$id;
        }

        $fh1 = fopen("boards/board_".$table.".json","w");
        $toWrite = json_encode($json);
        fwrite($fh1,$toWrite);
        fclose($fh1);
        echo $toWrite;
        exit;
    }

    function get_now()
    {
        echo strtotime(date('Y-m-d H:i:s'));
        exit;
    }

    function test($chk,$data)
    {
        $obj = new stdClass();
        $obj->checked = $chk;
        $obj->data = $data;


        $json = json_encode($obj);
        echo $json;
        exit;
    }

    function createTable($table, $pass)
    {
        if(file_exists("boards/board_".$table.".json"))
        {
            test(false,"");
            //header("Location: index.php");
        }
        else
        {
            $obj = new stdClass();
            $obj->name0 = $GLOBALS['no_player'];
            $obj->name1 = $GLOBALS['no_player'];
            $obj->name2 = $GLOBALS['no_player'];
            $obj->name3 = $GLOBALS['no_player'];
            $obj->turnID = 0;
            $obj->pion0 = -1;
            $obj->pion1 = -1;
            $obj->pion2 = -1;
            $obj->pion3 = -1;
            $obj->pion4 = -1;
            $obj->pion5 = -1;
            $obj->pion6 = -1;
            $obj->pion7 = -1;
            $obj->pion8 = -1;
            $obj->pion9 = -1;
            $obj->pion10 = -1;
            $obj->pion11 = -1;
            $obj->pion12 = -1;
            $obj->pion13 = -1;
            $obj->pion14 = -1;
            $obj->pion15 = -1;
            $obj->log0 = $GLOBALS['no_player'];
            $obj->log1 = $GLOBALS['no_player'];
            $obj->log2 = $GLOBALS['no_player'];
            $obj->log3 = $GLOBALS['no_player'];
            $obj->log4 = $GLOBALS['no_player'];
            $obj->log5 = $GLOBALS['no_player'];
            $obj->dice_value = 1;
            $obj->stage = 0;
            $obj->last0 = 0;
            $obj->last1 = 0;
            $obj->last2 = 0;
            $obj->last3 = 0;
            $obj->pass = md5($pass);


            $json = json_encode($obj);

            $fh = fopen("boards/board_".$table.".json","w");
            fwrite($fh,$json);
            fclose($fh);
            test(false,"");
        }
    }
?>