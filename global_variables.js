var Global = function()
{
    function init(){

    }

    init.player_name = "";
    init.board_number = 0;
    init.multiplayer = false;
    init.player_id = 0;
    init.multiplayer_wait = false;
    init.win_array = new Array(0,0,0,0);
    init.turnID = 0;
    init.game_stage = 0;
    init.game_stage_dice = 0;
    init.game_stage_move = 1;
    init.game_stage_basemove = 2;
    init.game_stage_end = 3;
    init.pion_width = 32;
    init.pion_height = 32;
    init.grid_width = 32;
    init.grid_height = 32;
    init.multiplayer_name0 = "no";
    init.multiplayer_name1 = "no";
    init.multiplayer_name2 = "no";
    init.multiplayer_name3 = "no";
    init.no_player = "Brak";
    init.board = null;
    init.dice = null;
    init.message = null;
    init.logs = null;
    init.game_screen = null;
    init.screen_scale = 1;
    init.index_file = "index.php";


    return init;
}();

function getPlayerName()
{
    console.log("getPlayerName"+Global.player_name);
    return Global.player_name;
}