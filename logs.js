class Logs
{
    constructor(X,Y)
    {
        this.x = (X*Global.screen_scale);
        this.y = (Y+4)*Global.screen_scale;
        this.border_x = X*Global.screen_scale;
        this.border_y = Y*Global.scale;
        this.log_items = [];
    }

    add_to_logs(id,dice_value)
    {

        var index_in_logs = this.log_items.length/3;
        //console.log(index_in_logs);
        var logo;
        if(id == 0)
            logo = new PIXI.Sprite(PIXI.loader.resources.simplePionBlue.texture);
        else if(id == 1)
            logo = new PIXI.Sprite(PIXI.loader.resources.simplePionGreen.texture);
        else if(id == 2)
            logo = new PIXI.Sprite(PIXI.loader.resources.simplePionYellow.texture);
        else if(id == 3)
            logo = new PIXI.Sprite(PIXI.loader.resources.simplePionRed.texture);
        logo.x = this.X;
        logo.y = this.Y+((16*Global.screen_scale)*index_in_logs);
        logo.width = (16*Global.screen_scale);
        logo.height = (16*Global.screen_scale);

        var texture;

        if(dice_value == 1)
            texture = new PIXI.Sprite(PIXI.loader.resources.kostka1.texture);
        else if(dice_value == 2)
            texture = new PIXI.Sprite(PIXI.loader.resources.kostka2.texture);
        else if(dice_value == 3)
            texture = new PIXI.Sprite(PIXI.loader.resources.kostka3.texture);
        else if(dice_value == 4)
            texture = new PIXI.Sprite(PIXI.loader.resources.kostka4.texture);
        else if(dice_value == 5)
            texture = new PIXI.Sprite(PIXI.loader.resources.kostka5.texture);
        else if(dice_value == 6)
            texture = new PIXI.Sprite(PIXI.loader.resources.kostka6.texture);

        texture.x = this.x + (20*Global.screen_scale);
        texture.y = this.y+((16*Global.screen_scale)*index_in_logs);
        texture.width = (16*Global.screen_scale);
        texture.height = (16*Global.screen_scale);


        var temp_style = new PIXI.TextStyle({
            fontFamily: "Blogger",
            fontSize: 16,
            fill: "white"
        });

        //BUTTON_PLAY_TEXT.style = {fontFamily: "Apropal", fontSize:24};

        var msgVal = "Wyrzucił";
        if(id == Global.player_id)
            msgVal+="eś";
        var tempMessage = new PIXI.Text(msgVal+" "+dice_value,temp_style);
        tempMessage.x = this.x + (40*Global.screen_scale);
        tempMessage.y = this.y+((16*Global.screen_scale)*index_in_logs);
        tempMessage.width = tempMessage.width*Global.screen_scale;
        tempMessage.height = tempMessage.height*Global.screen_scale;


        add_sprite(logo);
        add_sprite(texture);
        add_sprite(tempMessage)

        this.log_items.push(logo);
        this.log_items.push(texture);
        this.log_items.push(tempMessage);

        this.change_positions();

    }

    change_positions()
    {
        if(this.log_items.length > (6*3))
        {
            var toDelete = this.log_items.length-(6*3);

            for(var a = 0; a < toDelete; a++)
            {
                app.stage.removeChild(this.log_items[a]);

            }
            for(var a = 0; a < toDelete; a++)
            {
                this.log_items.shift();
            }

            for(var a = 0; a < this.log_items.length; a++)
            {
                this.log_items[a].y -= ((16*Global.screen_scale)*(toDelete/3));
            }
        }
    }
    change_logs(json)
    {
        for(var a = 0; a < this.log_items.length; a++)
        {
            app.stage.removeChild(this.log_items[a]);
        }

        this.log_items = [];

        var pid;
        var val;
        if(json.log0 !== Global.no_player)
        {
            pid = json.log0.substring(0,1);
            val = json.log0.substring(2,3);

            this.add_to_logs(pid,val);
        }

        if(json.log1 !== Global.no_player)
        {
            pid = json.log1.substring(0,1);
            val = json.log1.substring(2,3);

            this.add_to_logs(pid,val);
        }

        if(json.log2 !== Global.no_player)
        {
            pid = json.log2.substring(0,1);
            val = json.log2.substring(2,3);

            this.add_to_logs(pid,val);
        }

        if(json.log3 !== Global.no_player)
        {
            pid = json.log3.substring(0,1);
            val = json.log3.substring(2,3);

            this.add_to_logs(pid,val);
        }

        if(json.log4 !== Global.no_player)
        {
            pid = json.log4.substring(0,1);
            val = json.log4.substring(2,3);

            this.add_to_logs(pid,val);
        }

        if(json.log5 !== NO_PLAYER)
        {
            pid = json.log5.substring(0,1);
            val = json.log5.substring(2,3);

            this.add_to_logs(pid,val);
        }
    }
}