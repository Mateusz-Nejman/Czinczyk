class ScreenSingleplayer extends ScreenContainer
{
    constructor()
    {
        super();
    }

    add_to_draw()
    {
        Global.board.add_to_draw();
        Global.dice.add_to_draw();
        //Global.logs.add_to_draw();


        add_sprite(Global.message);
    }

    update_draw(delta)
    {
        Global.board.update_draw();
        Global.dice.update_draw();

        Global.message.visible = Global.player_id === Global.turnID;
    }

    update(delta)
    {
        if(Global.turnID !== Global.player_id)
        {
            if(Global.game_stage === Global.game_stage_dice)
            {
                this.stage_dice();
                if(Global.multiplayer)
                    this.to_server("add_logs",Global.board_number,Global.dice.get_value(),Global.player_name,-1,Global.turnID);
                else
                    Global.logs.add_to_logs(Global.turnID,Global.dice.value);
            }
            else if(Global.game_stage === Global.game_stage_basemove)
            {
                this.stage_base_move();

                if(Global.game_stage === Global.game_stage_move)
                {
                    var canDes = false;
                    var canMov = 0;
                    for(var a = 0; a < Global.board.pions.length; a++)
                    {
                        if(!Global.board.pions[a].in_base && Global.board.pions[a].ID === Global.turnID && Global.board.pions[a].can_move(Global.dice.get_value()).x !== 1)
                        {
                            canMov = a;
                            if(Global.board.pions[a].can_move(Global.dice.get_value()).x === 2)
                            {

                                break;
                            }
                        }
                    }

                    this.game_stage_move(canMov);
                }
            }
            else if(Global.game_stage === Global.game_stage_move)
            {
                var x2 = false;
                var canMov = 0;

                var nearest_pion = 999;
                var nearest_pion_i = -1;
                for(var a = 0; a < Global.board.pions.length; a++)
                {
                    if(!Global.board.pions[a].in_base && Global.board.pions[a].ID === Global.turnID && Global.board.pions[a].can_move(Global.dice.get_value()).x !== 1)
                    {
                        var to_house = Global.board.to_houses[Global.board.pions[a].ID];

                        var near = 0;

                        if(Global.board.pions[a].grid_id > to_house)
                        {
                            near = 40 - Global.board.pions[a].grid_id + to_house;
                        }
                        else
                        {
                            near = to_house - Global.board.pions[a].grid_id;
                        }

                        if(near < nearest_pion)
                        {
                            nearest_pion = near;
                            nearest_pion_i = a;
                        }
                        canMov = a;
                        if(Global.board.pions[a].can_move(Global.dice.get_value()).x === 2)
                        {
                            x2 = true;
                            break;
                        }
                    }
                }

                if(x2)
                    this.stage_move(canMov);
                else
                    this.stage_move(nearest_pion_i);
            }
        }

        if(Global.game_stage === Global.game_stage_end)
        {
            Global.turnID += 1;
            if(Global.turnID === 4)
                Global.turnID = 0;

            var in_house_pions = new Array(0,0,0,0);
            for(var a = 0; a < Global.board.pions.length; a++)
            {
                if(Global.board.pions[a].in_house)
                    in_house_pions[Global.board.pions[a].ID]=in_house_pions[Global.board.pions[a].ID]+1;
            }

            //MULTI_WIN = in_house_pions;

            for(var a = 0; a < in_house_pions.length; a++)
            {
                console.log("in_house_pions["+a+"] = "+in_house_pions[a]);
                if(in_house_pions[a] === 4)
                {

                    Global.win_array = in_house_pions;
                    change_screen(new ScreenEnd());
                    //GAME_CHANGE_SCREEN(4);
                }
            }

            Global.game_stage = Global.game_stage_dice;
        }
    }

    setup()
    {
        Global.board = new Board(PIXI.loader.resources.yourTurn.texture);

        Global.board.place_grids(PIXI.loader.resources.simpleGrid.texture,
            PIXI.loader.resources.simpleGridBlue.texture,
            PIXI.loader.resources.simpleGridGreen.texture,
            PIXI.loader.resources.simpleGridYellow.texture,
            PIXI.loader.resources.simpleGridRed.texture);

        Global.board.place_bases();

        Global.board.place_pions(PIXI.loader.resources.simplePionBlue.texture,
            PIXI.loader.resources.simplePionGreen.texture,
            PIXI.loader.resources.simplePionYellow.texture,
            PIXI.loader.resources.simplePionRed.texture);

        Global.dice = new Dice(
            (6*40)-16,
            ((6*40)-16)+80,
            PIXI.loader.resources.kostka1.texture,
            PIXI.loader.resources.kostka2.texture,
            PIXI.loader.resources.kostka3.texture,
            PIXI.loader.resources.kostka4.texture,
            PIXI.loader.resources.kostka5.texture,
            PIXI.loader.resources.kostka6.texture,
            PIXI.loader.resources.kostkaSh.texture);

        Global.message = new PIXI.Text("Twoja tura",style);
        Global.message.x = (13*20)-(Global.message.width/2);
        //message.interactive = true;
        //message.on("pointerdown",ONMESSAGE,this);

        Global.logs = new Logs(16,(13*40)+80);
    }

    stage_dice()
    {
        if(Global.multiplayer)
            this.to_server("roll",Global.board_number,Global.player_name,-1,Global.player_id);
        else
            Global.dice.roll();


        if(Global.dice.get_value() === 6)
        {
            if(!Global.board.bases[Global.turnID].is_empty())
            {
                var free_start_grid = true;

                for(var a = 0; a < Global.board.pions.length; a++)
                {
                    if(Global.board.pions[a].grid_id === Global.board.starts[Global.turnID] && Global.board.pions[a].ID === Global.turnID)
                    {
                        free_start_grid = false;
                        break;
                    }
                }

                if(free_start_grid)
                {
                    if(Global.multiplayer)
                        this.to_server("set_stage",Global.board_number,Global.game_stage_basemove,Global.player_name,-1,Global.player_id);
                    else
                        Global.game_stage = Global.game_stage_basemove;
                }
            }

            if(Global.game_stage === Global.game_stage_dice)
            {
                var can_move = false;

                for(var a = 0; a < Global.board.pions.length; a++)
                {
                    var pion_temp = Global.board.pions[a];

                    if(pion_temp.ID === Global.turnID && pion_temp.can_move(Global.dice.get_value()).x !== 1)
                    {
                        can_move = true;
                        break;
                    }
                }

                if(can_move)
                {
                    if(Global.multiplayer)
                        this.to_server("set_stage",Global.board_number,Global.game_stage_move,Global.player_name,-1,Global.turnID);
                    else
                        Global.game_stage = Global.game_stage_move;
                }
            }
        }
        else
        {
            var can_move = false;

            for(var a = 0; a < Global.board.pions.length; a++)
            {
                var pion_temp = Global.board.pions[a];

                if(pion_temp.ID === Global.turnID && pion_temp.can_move(Global.dice.get_value()).x !== 1)
                {
                    can_move = true;
                    break;
                }
            }

            if(can_move)
            {
                if(Global.multiplayer)
                    this.to_server("set_stage",Global.board_number,Global.game_stage_move,Global.player_name,-1,Global.turnID);
                else
                    Global.game_stage = Global.game_stage_move;
            }
            else
            {
                if(Global.multiplayer)
                    this.to_server("set_stage",Global.board_number,Global.game_stage_end,Global.player_name,-1,Global.turnID);
                else
                    Global.game_stage = Global.game_stage_end;
            }
        }

    }

    stage_base_move()
    {
        var free_start_grid = true;
        var pion_index = -1;

        for(var a = 0; a < Global.board.pions.length; a++)
        {
            if(Global.board.pions[a].grid_id === Global.board.starts[Global.turnID])
            {
                free_start_grid = false;
                pion_index = a;
                break;
            }
        }

        if(free_start_grid)
        {
            for(var a = 0; a < Global.board.pions.length; a++)
            {
                var pion_temp = Global.board.pions[a];

                if(pion_temp.ID === Global.turnID && pion_temp.in_base)
                {
                    if(Global.multiplayer)
                    {
                        this.to_server("move",Global.board_number,a,Global.player_name,Global.board.starts[Global.board.pions[a].ID],Global.turnID);
                        this.to_server("set_stage",Global.board_number,Global.game_stage_end,Global.player_name,-1,Global.turnID);

                    }
                    else
                    {
                        Global.board.pions[a].move_to_start();
                        Global.game_stage = Global.game_stage_end;
                    }
                    break;
                }
            }
        }
        else
        {
            if(Global.multiplayer)
                this.to_server("move",Global.board_number,pion_index,Global.player_name,-1,Global.turnID);
            else
                Global.board.pions[pion_index].move_to_base();

            for(var a = 0; a < Global.board.pions.length; a++)
            {
                var pion_temp = Global.board.pions[a];

                if(pion_temp.ID === Global.turnID && pion_temp.in_base)
                {
                    if(Global.multiplayer)
                    {
                        this.to_server("move",Global.board_number,a,Global.player_name,Global.board.starts[Global.board.pions[a].ID],Global.turnID);
                        this.to_server("set_stage",Global.board_number,Global.game_stage_end,Global.player_name,-1,Global.turnID);

                    }
                    else
                    {
                        Global.board.pions[a].move_to_start();
                        Global.game_stage = Global.game_stage_end;
                    }
                    break;
                }
            }
        }
    }

    stage_move(pion_id)
    {
        var can_move1 = Global.board.pions[pion_id].can_move(Global.dice.get_value());

        if(can_move1.x !== 1)
        {
            if(can_move1.x === 2)
            {
                for(var a = 0; a < Global.board.pions.length; a++)
                {
                    var pion_temp = Global.board.pions[a];

                    if(pion_temp.grid_id === can_move1.y)
                    {
                        if(Global.multiplayer)
                            this.to_server("move",Global.board_number,a,Global.p,-1,Global.turnID);
                        else
                            Global.board.pions[a].move_to_base();
                        break;
                    }
                }
            }

            if(Global.multiplayer)
                this.to_server("move",Global.board_number,pion_id,Global.player_name,can_move1.y,Global.turnID);
            else
                Global.board.pions[pion_id].move_to(can_move1);

        }

        if(Global.multiplayer)
            this.to_server("set_stage",Global.board_number,Global.game_stage_end,Global.player_name,-1,Global.turnID);
        else
            Global.game_stage = Global.game_stage_end;
    }

    to_server(act,tab,_id,nam,grd,_pid)
    {
    $.ajax({
        url:"getter.php",
        type:"GET",
        async: false,
        data: {action:act,table:tab,id:_id,name:nam,grid:grd,pid:_pid},
        dataType:"json",
        success:function(obj,textstatus)
        {
            //console.log("success join");
            console.log(obj);
            Global.game_screen.multiplayer_refresh(obj);
            //console.log("action = "+data.action);
            //MULTI_COUNTER = 0;
        },
        error:function(response)
        {
            console.log(response);
        },
        complete:function()
        {
            //console.log("COMPLETE JOIN");
        }
    });
    }

    multiplayer_refresh(json_text)
    {
        Global.multiplayer_name0 = json_text.name0;
        Global.multiplayer_name1 = json_text.name1;
        Global.multiplayer_name2 = json_text.name2;
        Global.multiplayer_name3 = json_text.name3;
    
        Global.multiplayer_wait = true;
        if(Global.multiplayer_name0 !== Global.player_name && Global.multiplayer_name0 !== NO_PLAYER)
            Global.multiplayer_wait = false;
    
        if(Global.multiplayer_name1 !== Global.player_name && Global.multiplayer_name1 !== NO_PLAYER)
            Global.multiplayer_wait = false;
    
        if(Global.multiplayer_name2 !== Global.player_name && Global.multiplayer_name2 !== NO_PLAYER)
            Global.multiplayer_wait = false;
    
        if(Global.multiplayer_name3 !== Global.player_name && Global.multiplayer_name3 !== NO_PLAYER)
            Global.multiplayer_wait = false;
        Global.turnID = json_text.turnID;
        Global.board.bases[0].used_places = new Array(false,false,false,false);
        Global.board.bases[1].used_places = new Array(false,false,false,false);
        Global.board.bases[2].used_places = new Array(false,false,false,false);
        Global.board.bases[3].used_places = new Array(false,false,false,false);
    
        for(var a = 0; a < Global.board.pions.length; a++)
        {
            Global.board.pions[a].update_from_grid_id(json_text["pion"+a]);
        }
        Global.dice.value = json_text.dice_value;
        Global.dice.change_texture();
        Global.game_stage = json_text.stage;
        Global.logs.change_logs(json_text);
    
        var in_house_pions = new Array(0,0,0,0);
        for(var a = 0; a < Global.board.pions.length; a++)
        {
            if(Global.board.pions[a].in_house)
                in_house_pions[Global.board.pions[a].ID]+=1;
        }
    

    
        for(var a = 0; a < in_house_pions.length; a++)
        {
            if(in_house_pions[a] === 4)
            {
                Global.win_array = in_house_pions;
                change_screen(new ScreenEnd());
                //change_screen(new ScreenMenu());
                //GAME_CHANGE_SCREEN(4);
            }
        }
    }
}