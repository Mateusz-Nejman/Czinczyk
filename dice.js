class Dice {
    constructor(start_x, start_y, k1, k2, k3, k4, k5, k6, kSh) {
        this.value = 0;
        this.texture = new PIXI.Sprite(PIXI.loader.resources.baseMask.texture);
        this.texture.interactive = true;

        this.texture.on("pointerdown", this.on_click,this);
        this.value1 = new PIXI.Sprite(k1);
        this.value2 = new PIXI.Sprite(k2);
        this.value3 = new PIXI.Sprite(k3);
        this.value4 = new PIXI.Sprite(k4);
        this.value5 = new PIXI.Sprite(k5);
        this.value6 = new PIXI.Sprite(k6);
        this.value_shadow = new PIXI.Sprite(kSh);


        this.set_x(start_x);
        this.set_y(start_y);

        this.your_turn = new PIXI.Sprite(PIXI.loader.resources.yourTurn.texture);
        this.your_turn.anchor.set(0.5);
        this.your_turn.x = this.get_x() + (32 * Global.screen_scale);
        this.your_turn.y = this.get_y() + (32 * Global.screen_scale);

        this.roll();
    }

    get_x() {
        return this.texture.x;
    }

    get_y() {
        return this.texture.y;
    }

    set_x(x) {
        this.texture.x = x;
        this.value1.x = x;
        this.value2.x = x;
        this.value3.x = x;
        this.value4.x = x;
        this.value5.x = x;
        this.value6.x = x;
        this.value_shadow.x = x;
    }

    set_y(y) {
        this.texture.y = y;

        this.value1.y = y;
        this.value2.y = y;
        this.value3.y = y;
        this.value4.y = y;
        this.value5.y = y;
        this.value6.y = y;
        this.value_shadow.y = y;
    }

    add_to_draw() {
        add_sprite(this.value1);
        add_sprite(this.value2);
        add_sprite(this.value3);
        add_sprite(this.value4);
        add_sprite(this.value5);
        add_sprite(this.value6);
        add_sprite(this.value_shadow);

        add_sprite(this.your_turn);
        add_sprite(this.texture);
    }

    update_draw()
    {
        this.value_shadow.visible = Global.player_id !== Global.turnID;
        this.your_turn.visible = (Global.player_id === Global.turnID) && (Global.game_stage === Global.game_stage_dice);
        this.your_turn.rotation += 0.01;
    }

    roll()
    {
        var min = 0;
        var max = 7;

        var rnd = Math.random();

        var rolled = Math.floor((rnd*(max-min))+min);
        if(rolled > 6)
            rolled = 6;
        else if(rolled < 1)
            rolled = 1;

        this.value = rolled;
        this.change_texture();
    }
    get_value()
    {
        return this.value;
    }

    change_texture()
    {
        this.value1.visible = this.value2.visible =this.value3.visible =this.value4.visible =this.value5.visible =this.value6.visible =this.value_shadow.visible = false;

        if(this.value == 1)
            this.value1.visible = true;
        else if(this.value == 2)
            this.value2.visible = true;
        else if(this.value == 3)
            this.value3.visible = true;
        else if(this.value == 4)
            this.value4.visible = true;
        else if(this.value == 5)
            this.value5.visible = true;
        else if(this.value == 6)
            this.value6.visible = true;


    }

    on_click()
    {
        //console.log("DICE ONCLICK");
        if(Global.game_stage === Global.game_stage_dice && Global.turnID === Global.player_id && !Global.multiplayer_wait)
        {
            //console.log("gameStageDice()");
            Global.game_screen.stage_dice();
            //gameStageDice();
			//console.log("gameStageDice end()");
            if(Global.multiplayer)
                Global.game_screen.to_server("add_logs",Global.board_number,this.value,Global.player_name,-1,Global.turnID);
            else
                Global.logs.add_to_logs(Global.turnID,this.value);
        }
    }
}