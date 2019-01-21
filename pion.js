class Pion
{
    constructor(id,tex)
    {
        this.ID = id;
        this.grid_id = -1;
        this.texture = new PIXI.Sprite(tex);
        this.texture.width = Global.pion_width;
        this.texture.height = Global.pion_height;
        this.texture.interactive = true;
        this.texture.on("pointerdown",this.on_click,this);
        this.in_base = false;
        this.in_house = false;

        this.move_to_base();
    }

    get_x()
    {
        return this.texture.x;
    }

    get_y()
    {
        return this.texture.y;
    }

    set_x(x)
    {
        this.texture.x = x;
    }

    set_y(y)
    {
        this.texture.y = y;
    }
    
    add_to_draw()
    {
        add_sprite(this.texture);
    }


    move_to_base()
    {
        var base = Global.board.bases[this.ID];
        if(base.first_free_place() >= 0)
        {
            var place = base.first_free_place();
            var position = base.get_coordinate(place);

            this.set_x(position.x);
            this.set_y(position.y);
            Global.board.bases[this.ID].use_place(place);
            this.in_base = true;
            this.in_house = false;
            this.grid_id = -1;
        }
    }

    move_to_start()
    {
        var startID = Global.board.starts[this.ID];
        this.grid_id = startID;

        if(Global.multiplayer)
        {
            var idp = -1;
            for(var a = 0; a < Global.board.pions.length; a++)
            {
                if(Global.board.pions[a].grid_id === this.grid_id)
                {
                    idp = a;
                    break;
                }
            }
            Global.game_screen.to_server("move",Global.board_number,idp,Global.player_name,this.grid_id,Global.player_id);
        }
        else
        {
            var startGrid = Global.board.grids[startID];

            this.set_x(startGrid.get_x());
            this.set_y(startGrid.get_y());
            this.in_base = false;
            this.in_house = false;
        }
        Global.board.bases[this.ID].unuse_place();
    }

    move_to(vec)
    {
        console.log("VEC.y = "+vec.y);
        var start_id = vec.y;
        this.grid_id = start_id;

        var start_grid = Global.board.grids[start_id];

        this.set_x(start_grid.get_x());
        this.set_y(start_grid.get_y());
        this.in_base = false;

        this.in_house= vec.x === 3;
    }

    on_click()
    {
        if(this.ID === Global.player_id && (Global.game_stage === Global.game_stage_basemove || Global.game_stage === Global.game_stage_move) && !Global.multiplayer_wait)
        {
            var can_move = this.can_move(Global.dice.get_value());

            if(can_move.x !== 1)
            {
                if(can_move.x === 2)
                {
                    for(var a = 0; a < Global.board.pions.length; a++)
                    {
                        var pion_temp = Global.board.pions[a];

                        if(pion_temp.grid_id === can_move.y)
                        {
                            if(Global.multiplayer)
                                Global.game_screen.to_server("move",Global.board_number,a,Global.player_name,-1,Global.player_id);
                            else
                                Global.board.pions[a].move_to_base();
                            break;
                        }
                    }
                }

                if(Global.multiplayer)
                {
                    for(var a = 0; a < Global.board.pions.length; a++)
                    {
                        var pion_temp = Global.board.pions[a];

                        if(pion_temp.grid_id === this.grid_id)
                        {
                            Global.game_screen.to_server("move",Global.board_number,a,Global.player_name,can_move.y,Global.player_id);
                            break;
                        }
                    }
                }
                else
                    this.move_to(can_move);

                if(Global.multiplayer)
                    Global.game_screen.to_server("set_stage",Global.board_number,Global.game_stage_end,Global.player_name,can_move.y,Global.player_id);
                else
                    Global.game_stage = Global.game_stage_end;

            }
        }
    }

    can_move(next_grids)
    {
        console.log("1 -> canMove");
        if(this.in_base || this.grid_id < 0)
            return new Point(1,0);
        var house_start = Global.board.house_starts[this.ID];
        var to_house = Global.board.to_houses[this.ID];

        var next = this.grid_id + next_grids;

        var grid_ret = -1;

        if(this.grid_id <= to_house && next > to_house)
        {
            var in_house_g = next - (to_house+1);
            if(this.ID === 0)
                console.log("in_house_g = "+in_house_g);

            if(in_house_g <= 3)
            {
                grid_ret = house_start + in_house_g;
                console.log("in_house_g < 3 grid_ret = "+grid_ret);
            }
        }
        else
        {
            if(next >= 40)
            {
                if(this.in_house)
                {
                    if(next > house_start + 3)
                        grid_ret = -1;
                    else
                        grid_ret = next;
                }
                else
                    grid_ret = next - 40;
            }
            else
                grid_ret = next;
        }

        if(this.ID === 0)
        {
            if(this.grid_id < 40 && next >= 40)
            {
                var next_temp = next - 40;
                console.log("next_temp: "+next_temp);

                if(next_temp > 1)
                    grid_ret = house_start + (next_temp - 2);
                else
                    grid_ret = next_temp;
            }
        }

        if(grid_ret < 0)
        {
            console.log("1 -> grid_ret < 0");
            return new Point(1, 0);
        }
        else
        {
            for(var a = 0; a < Global.board.pions.length; a++)
            {
                var pion1 = Global.board.pions[a];

                if(pion1.grid_id === grid_ret)
                {
                    if(pion1.ID === this.ID)
                    {
                        console.log("1 -> pion1.ID == this.ID");
                        return new Point(1,0);
                    }
                    else
                    {
                        if(grid_ret >= house_start && grid_ret < house_start + 4)
                            return new Point(3, grid_ret);
                        else if(grid_ret >= house_start+4)
                        {
                            console.log("1 -> grid_ret >= gouseStart+4");
                            return new Point(1, 0);
                        }
                        else
                            return new Point(2, grid_ret);
                    }
                }
            }

            if(grid_ret >= house_start && grid_ret < house_start+4)
                return new Point(3, grid_ret);
            else if(grid_ret >= house_start + 4)
            {
                console.log("1 -> grid_ret >= house_start + 4");
                return new Point(1,0);
            }

            return new Point(0, grid_ret);
        }
    }

    update_from_grid_id(gid)
    {
        if(gid === -1)
            this.move_to_base();
        else
        {
            var first_house = Global.board.house_starts[this.ID];
            if(gid >= first_house && gid <= first_house+3)
                this.move_to(new Point(3,gid));
            else
                this.move_to(new Point(0,gid));
        }
    }
}