class Base
{
    constructor(x,y,tex)
    {
        this.texture = new PIXI.Sprite(tex);
        this.texture.width = 64;
        this.texture.height = 64;
        this.mask = new PIXI.Sprite(PIXI.loader.resources.baseMask.texture);
        this.mask.interactive = true;
        this.mask.on("pointerdown",this.on_click,this);
        this.set_x(x);
        this.set_y(y);

        this.used_places = new Array(false,false,false,false);
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
        this.mask.x = x;
    }

    set_y(y)
    {
        this.texture.y = y;
        this.mask.y = y;
    }

    add_to_draw()
    {
        add_sprite(this.texture);
    }

    add_to_draw_mask()
    {
        add_sprite(this.mask);
    }

    get_coordinate(index)
    {
        var ret = new Point(this.get_x(), this.get_y());

        if(index === 1)
        {
            ret.x+=32;
        }
        else if(index === 2)
        {
            ret.y += 32;
        }
        else if(index === 3)
        {
            ret.x += 32;
            ret.y += 32;
        }

        return ret;
    }

    is_empty()
    {
        for(var a = 0; a < this.used_places.length; a++)
        {
            if(this.used_places[a])
                return false;
        }

        return true;
    }

    first_free_place()
    {
        for(var a = 0; a < this.used_places.length; a++)
        {
            if(!this.used_places[a])
                return a;
        }

        return -1;
    }

    use_place(index)
    {
        this.used_places[index] = true;
    }

    unuse_place()
    {
        for(var a = 0; a < this.used_places.length; a++)
        {
            if(this.used_places[a])
            {
                this.used_places[a] = false;
                break;
            }
        }
    }

    on_click()
    {
        if(Global.turnID === Global.player_id && Global.game_stage === Global.game_stage_basemove && !Global.multiplayer_wait)
        {
            Global.game_screen.stage_base_move();
        }
    }
}