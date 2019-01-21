function screen_clear_stage()
{
    for(var a = app.stage.children.length-1; a >= 0; a--)
    {
        app.stage.removeChild(app.stage.children[a]);
    }
}


function change_screen(newScreen)
{
    screen_clear_stage();
    Global.game_screen = newScreen;
    initialized = false;

}

function add_sprite(sprite)
{
    app.stage.addChild(sprite);
}

function GAME_CHANGE_SCREEN(numb)
{
    screen_numb = numb;
    initialized = false;
}

function GAME_RESIZE_ALL()
{
    var SCALE = 1;
    console.log("RESIZE");
    for(var a = 0; a < app.stage.children.length; a++)
    {
        app.stage.children[a].x = app.stage.children[a].x*SCALE;
        app.stage.children[a].y = app.stage.children[a].y*SCALE;
        app.stage.children[a].width = app.stage.children[a].width*SCALE;
        app.stage.children[a].height = app.stage.children[a].height*SCALE;
    }
    //console.log("RESIZE TEST: "+MENU_TITLE.x);
}