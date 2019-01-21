class ScreenSelectColor extends ScreenContainer
{
    constructor()
    {
        super();


    }

    add_to_draw()
    {
        add_sprite(this.select_color_text);
        add_sprite(this.select_color0);
        add_sprite(this.select_color1);
        add_sprite(this.select_color2);
        add_sprite(this.select_color3);

        add_sprite(this.select_color0_text);
        add_sprite(this.select_color1_text);
        add_sprite(this.select_color2_text);
        add_sprite(this.select_color3_text);

        add_sprite(this.button_back);
        add_sprite(this.button_back_text);
    }

    setup()
    {
        super.setup();
        this.select_color_text = new PIXI.Text("Wybierz Kolor");
        this.select_color_text.style = {fontFamily:"Bevan",fontSize:60,fill:"white"};
        this.select_color_text.x = (13*20)-(this.select_color_text.width/2);
        this.select_color_text.y = 8;

        this.select_color0 = new PIXI.Sprite(PIXI.loader.resources.simplePionBlue.texture);
        this.select_color1 = new PIXI.Sprite(PIXI.loader.resources.simplePionGreen.texture);
        this.select_color2 = new PIXI.Sprite(PIXI.loader.resources.simplePionYellow.texture);
        this.select_color3 = new PIXI.Sprite(PIXI.loader.resources.simplePionRed.texture);

        this.select_color0.x = this.select_color1.x = this.select_color2.x = this.select_color3.x = (13*10)-32;
        this.select_color0.interactive = this.select_color1.interactive = this.select_color2.interactive = this.select_color3.interactive = true;

        this.select_color0.y = 100;
        this.select_color1.y = 180;
        this.select_color2.y = 260;
        this.select_color3.y = 340;

        this.select_color0_text = new PIXI.Text("Zajęte",style);
        this.select_color1_text = new PIXI.Text("Zajęte",style);
        this.select_color2_text = new PIXI.Text("Zajęte",style);
        this.select_color3_text = new PIXI.Text("Zajęte",style);

        this.select_color0_text.x = this.select_color1_text.x = this.select_color2_text.x = this.select_color3_text.x = this.select_color0.x+80;
        this.select_color0_text.y = this.select_color0.y;
        this.select_color1_text.y = this.select_color1.y;
        this.select_color2_text.y = this.select_color2.y;
        this.select_color3_text.y = this.select_color3.y;

        this.select_color0_text.visible = this.select_color1_text.visible = this.select_color2_text.visible = this.select_color3_text.visible = false;

        this.select_color0.on("pointerdown",this.selectColor0,this);
        this.select_color1.on("pointerdown",this.selectColor1,this);
        this.select_color2.on("pointerdown",this.selectColor2,this);
        this.select_color3.on("pointerdown",this.selectColor3,this);

        this.button_back = new PIXI.Sprite(PIXI.loader.resources.buttonNormal.texture);

        this.button_back.x = (13*10)-32;
        this.button_back.y = 420;

        this.button_back_text = new PIXI.Text("Wróć");
        this.button_back_text.x = this.button_back.x + (this.button_back.width/2)-(this.button_back_text.width/2);
        this.button_back_text.y = this.button_back.y + (this.button_back.height/2)-(this.button_back_text.height/2);
        this.button_back_text.style = {fontFamily:"Blogger",fontSize:32};

        this.button_back.interactive = this.button_back_text.interactive = true;

        this.button_back.on("pointerdown",this.back_to_menu,this);
        this.button_back_text.on("pointerdown",this.back_to_menu,this);
    }

    selectColor(color)
    {
        Global.player_id = color;
        if(Global.multiplayer)
            change_screen(new ScreenSingleplayer());
        else
            change_screen(new ScreenSingleplayer());
    }

    selectColor0()
    {
        if(!this.select_color0_text.visible || this.select_color0_text.text === "*"+Global.player_name)
            this.selectColor(0);
    }

    selectColor1()
    {
        if(!this.select_color1_text.visible || this.select_color1_text.text === "*"+Global.player_name)
            this.selectColor(1);
    }

    selectColor2()
    {
        if(!this.select_color2_text.visible || this.select_color2_text.text === "*"+Global.player_name)
            this.selectColor(2);
    }

    selectColor3()
    {
        if(!this.select_color3_text.visible || this.select_color3_text.text === "*"+Global.player_name)
            this.selectColor(3);
    }

    back_to_menu()
    {
        change_screen(new ScreenMenu());
    }
}