var prompt_name = prompt("Podaj swoję imię lub nick: ",readCookie("nazwa"));
if(prompt_name == "")
{
    alert("Wprowadź imię lub nick!");
    document.location.href = Global.index_file;
}
var prompt_board = prompt("Podaj numer stołu(0 jeżeli chcesz grać tylko z botami): ",readCookie("numer"));
var prompt_pass = "";

if(prompt_board == '' )
{
    alert("Niepoprawny numer stołu! Spróbuj jeszcze raz");
    document.location.href = Global.index_file;

}
else
{
    if(prompt_board != '0')
    {
        getBoardsList();
        var boards_list = last_return_object;

        var board_exists = false;

        console.log(boards_list.tables.length);
        for(var a = 0; a < boards_list.tables.length; a++)
        {
            if(prompt_board == boards_list.tables[a])
            {

                board_exists = true;
                break;
            }
        }

        if(!board_exists)
        {
            if(confirm("Nie ma takiego stołu. Czy chcesz go utworzyć?"))
            {
                var crPass = prompt("Podaj hasło: ","singleplayer");
                serverAction("MD5",prompt_board,0,prompt_name,0,0,crPass);
                var password = last_return_object.MD5;
                serverAction("create",prompt_board,0,prompt_name,0,0,password);
            }
            else
            {
                alert("Niepoprawny numer stołu! Spróbuj jeszcze raz");
                document.location.href = Global.index_file;
            }

        }
        else
        {
            prompt_pass = prompt("Podaj hasło: ",readCookie("haslo"));
            serverAction("get_state",prompt_board,0,prompt_name,0,0,"");
            var board_state = last_return_object;
            serverAction("MD5",prompt_board,0,prompt_name,0,0,prompt_pass);
            var password = last_return_object.MD5;

            if(password != board_state.pass)
            {
                alert("Niepoprawne hasło! Spróbuj jeszcze raz");
                document.location.href = Global.index_file;
            }
        }
    }
}

setCookie("nazwa",prompt_name,30);
setCookie("numer",prompt_board,30);
if(prompt_pass != "")
    setCookie("haslo",prompt_pass,30);
setBoard(prompt_board);
setName(prompt_name);


WebFont.load(
    {
        custom: {
            families: ['Bevan','Blogger','Roboto'],
            urls:['style.css']
        }
    }
);

function readCookie(cookie)
{
    const cookies = document.cookie.split(/; */);
    for(var a = 0; a < cookies.length; a++)
    {
        const ctemp = cookies[a].split("=");
        if(ctemp[0] == cookie)
            return ctemp[1];
    }

    return "";
}
function setCookie(cname, cvalue, exdays)
{
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));

    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "="+cvalue+";"+expires+";path=/";
}

/*$(function() {
    setName(readCookie("nazwa"));
    setBoard(readCookie("numer"));
});*/

//SCALE_TO_SCREEN();

let app = new PIXI.Application({
    //width: 13*40,
    //height: (13*40)+80+(16*6)+8,
    width: 520,
    height: 706,
    antialias: true,
    transparent: false,
    //resolution: 1,
    backgroundColor: 0x000000,
    forceCanvas: false, //Ewentualnie zmienić
    autoResize: false,
    //resolution: devicePixelRatio,
    cacheAsBitmap: true,
    legacy: true

});

let style = new PIXI.TextStyle({
    fontFamily: "Bevan",
    fontSize: 60,
    fill: "white"
});


current_stage = app.stage;
var div_element = document.createElement("div");
div_element.id = "center";
div_element.setAttribute("style","width: "+(520)+"px");
div_element.appendChild(app.view);
document.body.appendChild(div_element);

//var DIV = document.getElementById("center");
//DIV.appendChild(app.view);


PIXI.loader.add("baseMask","content/baseMask.png")
    .add("baseTexture","content/baseTexture.png")
    .add("buttonNormal","content/buttonNormal.png")
    .add("kostka1","content/kostka1.png")
    .add("kostka2","content/kostka2.png")
    .add("kostka3","content/kostka3.png")
    .add("kostka4","content/kostka4.png")
    .add("kostka5","content/kostka5.png")
    .add("kostka6","content/kostka6.png")
    .add("kostkaSh","content/kostkaSh.png")
    .add("simpleGrid","content/simpleGrid.png")
    .add("simpleGridBlue","content/simpleGridBlue.png")
    .add("simpleGridGreen","content/simpleGridGreen.png")
    .add("simpleGridRed","content/simpleGridRed.png")
    .add("simpleGridYellow","content/simpleGridYellow.png")
    .add("simplePionBlue","content/simplePionBlue.png")
    .add("simplePionGreen","content/simplePionGreen.png")
    .add("simplePionRed","content/simplePionRed.png")
    .add("simplePionYellow","content/simplePionYellow.png")
    .add("yourTurn","content/yourTurn.png").on("progress",loadProgress).load(setup);

initialized = false;
//var textures = 0;

//parseFont("content/Apropal-Bold.ttf")

function setup()
{
    //textures = PIXI.loader.resources["content/czinczyk.json"].textures;
    this.testTime = 30;
    app.ticker.add(delta => gameLoop(delta));
    change_screen(new ScreenMenu());

}

function gameLoop(delta)
{

    if(!initialized)
    {
        screen_clear_stage();

        if(Global.game_screen !== null)
        {
            Global.game_screen.setup();
            Global.game_screen.add_to_draw();
        }
        GAME_RESIZE_ALL();
        initialized = true;
    }
    if(this.testTime < 30)
    {
        this.testTime+=delta;
    }
    else
    {
        this.testTime = 0;



        if(initialized)
        {
            if(Global.game_screen !== null)
            {
                Global.game_screen.update(delta);
            }

        }
    }

    if(initialized)
    {
        if(Global.game_screen != null)
        Global.game_screen.update_draw(delta);
    }
}

function setName(name)
{
    Global.player_name = name;
    console.log(name);
}

function setBoard(board_n)
{
    console.log("setBoard to "+board_n);
    Global.board_number = board_n;
}

function loadProgress(loader,resource)
{
    console.log("Load "+resource.url);
}

