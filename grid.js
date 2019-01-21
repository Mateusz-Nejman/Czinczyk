class Grid
{
    constructor(x,y,tex)
    {
        this.texture = new PIXI.Sprite(tex);
        this.texture.width = Global.grid_width;
        this.texture.height = Global.grid_height;

        this.set_x(x);
        this.set_y(y);
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
}