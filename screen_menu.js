class ScreenMenu extends ScreenContainer
{
    constructor()
    {
        super();


    }


    button_play_click()
    {
        Global.multiplayer = false;
        change_screen(new ScreenSelectColor());
        //multi = false;
    }

    button_multi_click()
    {
        Global.multiplayer = true;
        //multi = true;
    }

    button_lobby_click()
    {
        document.location.href = "index.html";
    }


    add_to_draw()
    {
        add_sprite(this.button_play);
        add_sprite(this.button_play_text);

        add_sprite(this.button_multi);
        add_sprite(this.button_multi_text);

        add_sprite(this.menu_text);
        add_sprite(this.menu_title);

    }

    setup()
    {
        super.setup();
        this.button_play = new PIXI.Sprite(PIXI.loader.resources.buttonNormal.texture);
        this.button_play.x = 130;
        this.button_play.y = 130;

        this.button_play_text = new PIXI.Text("Jeden gracz");
        this.button_play_text.style = {fontFamily:"Blogger",fontSize:32};
        this.button_play_text.x = this.button_play.x + (this.button_play.width/2)-(this.button_play_text.width/2);
        this.button_play_text.y = this.button_play.y + (this.button_play.height/2)-(this.button_play_text.height/2);

        this.button_play.interactive = this.button_play_text.interactive = true;

        this.button_play.on("pointerdown",this.button_play_click);
        this.button_play_text.on("pointerdown",this.button_play_click);

        this.button_multi = new PIXI.Sprite(PIXI.loader.resources.buttonNormal.texture);

        this.button_multi.x = 130;
        this.button_multi.y = 230;

        this.button_multi_text = new PIXI.Text("Wielu graczy");
        //this.button_multi_text = new PIXI.Text(window.innerHeight);
        this.button_multi_text.x = this.button_multi.x + (this.button_multi.width/2)-(this.button_multi_text.width/2);
        this.button_multi_text.y = this.button_multi.y + (this.button_multi.height/2)-(this.button_multi_text.height/2);
        this.button_multi_text.style = {fontFamily:"Blogger",fontSize:32};

        this.button_multi.interactive = this.button_multi_text.interactive = true;

        this.button_multi.on("pointerdown",this.button_multi_click);
        this.button_multi_text.on("pointerdown",this.button_multi_click);

        //this.button_back.on("pointerdown",this.button_back_FUNC,this);
        //this.button_back_text.on("pointerdown",this.button_back_FUNC,this);

        console.log("MENU: "+getPlayerName());
        this.menu_text = new PIXI.Text("Witaj, "+getPlayerName()+"!\nCzinczyk jest bardzo prostym chinczykiem, ale " +
            "planuję rozszerzyć rozgrywkę o różne bajery.\n" +
            "Plany:\n" +
            "-Multiplayer(faza alpha)\n" +
            "-Różne plansze\n" +
            "-Tabele wyników\n" +
            "Aktualne problemy gry:\n" +
            "-W mobilnej wersji przeglądarki Chrome gra może zwiesić całą przeglądarkę\n" +
            "-Brak pomysłu jak zaimplementować boty w trybie multiplayer\n" +
            "Autor: Mateusz Nejman 2018-2019");
        this.menu_text.style = {wordWrap: true, wordWrapWidth: (13*40)-16,fontFamily: "Roboto", fontSize:18,fill:"white"};
        this.menu_text.x = 8;
        this.menu_text.y = 430;

        this.menu_title = new PIXI.Text("Czinczyk");
        this.menu_title.style = {fontFamily:"Bevan",fontSize:60,fill:"white"};
        this.menu_title.x = (13*20)-(this.menu_title.width/2);
        console.log("Czinczyk x: "+this.menu_title.x);
        this.menu_title.y = 8;
    }
}