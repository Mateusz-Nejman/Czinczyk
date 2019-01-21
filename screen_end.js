class ScreenEnd extends ScreenContainer
{
    constructor()
    {
        super();
    }

    add_to_draw()
    {

    }

    update_draw(delta)
    {

    }

    update(delta)
    {

    }

    setup()
    {
        this.end_color_text = new PIXI.Text("Przegrałeś");
        if(Global.win_array[Global.player_id] === 4)
            this.end_color_text.text = "Wygrałeś";
        this.end_color_text.style = {fontFamily:"Bevan",fontSize:60,fill:"white"};
        this.end_color_text.x = (13*20)-(this.end_color_text.width/2);
        this.end_color_text.y = 8;

        this.end_color0 = new PIXI.Sprite(PIXI.loader.resources.simplePionBlue.texture);
        this.end_color1 = new PIXI.Sprite(PIXI.loader.resources.simplePionGreen.texture);
        this.end_color2 = new PIXI.Sprite(PIXI.loader.resources.simplePionYellow.texture);
        this.end_color3 = new PIXI.Sprite(PIXI.loader.resources.simplePionRed.texture);

        this.end_color0.x = this.end_color1.x = this.end_color2.x = this.end_color3.x = (13*10)-32;
        this.end_color0.interactive = this.end_color1.interactive = this.end_color2.interactive = this.end_color3.interactive = true;

        this.end_color0.y = 100;
        this.end_color1.y = 180;
        this.end_color2.y = 260;
        this.end_color3.y = 340;
        this.end_color0_text = new PIXI.Text("Wygrany",style);
        this.end_color0_text.x = this.end_color0.x+80;
        this.end_color0_text.y = this.end_color0.y;

        var winIndex = 0;
        for(var a = 0; a < Global.win_array.length; a++)
        {
            if(Global.win_array[a] == 4)
            {
                winIndex = a;
                break;
            }
        }
        var your = winIndex;

        if(winIndex > 0)
        {
            var tempY = 100;
            window["this.end_color0"].y = window["this.end_color"+your].y;
            window["this.end_color"+your].y = tempY;
        }

        this.button_back = new PIXI.Sprite(PIXI.loader.resources.buttonNormal.texture);

        this.button_back.x = (13*10)-32;
        this.button_back.y = 420;

        this.button_back_text = new PIXI.Text("Lobby");
        this.button_back_text.x = this.button_back.x + (this.button_back.width/2)-(this.button_back_text.width/2);
        this.button_back_text.y = this.button_back.y + (this.button_back.height/2)-(this.button_back_text.height/2);
        this.button_back_text.style = {fontFamily:"Blogger",fontSize:32};

        this.button_back.interactive = this.button_back_text.interactive = true;

        this.button_back.on("pointerdown",this.button_back_FUNC,this);
        this.button_back_text.on("pointerdown",this.button_back_FUNC,this);
    }

    button_back()
    {
        if(Global.multiplayer)
        {
            $.ajax({
                url:"game.php",
                type:"GET",
                async: false,
                data: {action:"new",table:board_number,id:0,name:PLAYER_NAME,grid:-1},
                dataType:"json",
                success:function(obj,textstatus)
                {
                    //console.log("success join");
                    console.log(obj);
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

        document.location.href = Global.index_file;
    }
}