class Board
{
    constructor(cur_tex)
    {
        this.board_x = 0;
        this.board_y = 80;
        this.grid_width = 40;
        this.grid_height = 40;

        this.grids = [];
        this.pions = [];

        this.bases = [];

        this.to_houses = new Array(1,11,21,31);

        this.house_starts = new Array(40,44,48,52);

        this.starts = new Array(2,12,22,32);





        this.cursor_tex = new PIXI.Sprite(cur_tex);
    }

    place_grids(grid_texture,grid_texture0,grid_texture1,grid_texture2,grid_texture3)
    {
        this.generate(grid_texture, grid_texture0, grid_texture1, grid_texture2, grid_texture3);
        this.add_houses(grid_texture0, grid_texture1, grid_texture2, grid_texture3);
    }



    place_bases()
    {
        this.bases[0] = new Base(this.board_x + (9 * this.grid_width), this.board_y + (2 * this.grid_height), PIXI.loader.resources.baseTexture.texture);
        this.bases[1] = new Base(this.board_x + (9 * this.grid_width), this.board_y + (9 * this.grid_height), PIXI.loader.resources.baseTexture.texture);
        this.bases[2] = new Base(this.board_x + (2 * this.grid_width), this.board_y + (9 * this.grid_height), PIXI.loader.resources.baseTexture.texture);
        this.bases[3] = new Base(this.board_x + (2 * this.grid_width), this.board_y + (2 * this.grid_height), PIXI.loader.resources.baseTexture.texture);

    }

    place_pions(pion0texture,pion1texture,pion2texture,pion3texture)
    {
        this.pions[0] = new Pion(0, pion0texture);
        this.pions[1] = new Pion(0, pion0texture);
        this.pions[2] = new Pion(0, pion0texture);
        this.pions[3] = new Pion(0, pion0texture);

        this.pions[4] = new Pion(1, pion1texture);
        this.pions[5] = new Pion(1, pion1texture);
        this.pions[6] = new Pion(1, pion1texture);
        this.pions[7] = new Pion(1, pion1texture);

        this.pions[8] = new Pion(2, pion2texture);
        this.pions[9] = new Pion(2, pion2texture);
        this.pions[10] = new Pion(2, pion2texture);
        this.pions[11] = new Pion(2, pion2texture);

        this.pions[12] = new Pion(3, pion3texture);
        this.pions[13] = new Pion(3, pion3texture);
        this.pions[14] = new Pion(3, pion3texture);
        this.pions[15] = new Pion(3, pion3texture);
    }
    add(x,y,tex)
    {
        this.grids.push(new Grid(this.board_x + (this.grid_width * x), this.board_y + (this.grid_height * y),tex));
    }

    generate(grid_texture, grid_texture0, grid_texture1,grid_texture2,grid_texture3)
    {
        this.add(5, 0, grid_texture);
        this.add(6, 0, grid_texture); //tohouse
        this.add(7, 0, grid_texture0); //start

        this.add(7, 1, grid_texture);
        this.add(7, 2, grid_texture);
        this.add(7, 3, grid_texture);

        this.add(8, 4, grid_texture);

        this.add(9, 5, grid_texture);
        this.add(10, 5, grid_texture);
        this.add(11, 5, grid_texture);

        this.add(12, 5, grid_texture);
        this.add(12, 6, grid_texture); //tohouse
        this.add(12, 7, grid_texture1); //start

        this.add(11, 7, grid_texture);
        this.add(10, 7, grid_texture);
        this.add(9, 7, grid_texture);

        this.add(8, 8, grid_texture);

        this.add(7, 9, grid_texture);
        this.add(7, 10, grid_texture);
        this.add(7, 11, grid_texture);

        this.add(7, 12, grid_texture);
        this.add(6, 12, grid_texture); //tohouse
        this.add(5, 12, grid_texture2); //start

        this.add(5, 11, grid_texture);
        this.add(5, 10, grid_texture);
        this.add(5, 9, grid_texture);

        this.add(4, 8, grid_texture);

        this.add(3, 7, grid_texture);
        this.add(2, 7, grid_texture);
        this.add(1, 7, grid_texture);

        this.add(0, 7, grid_texture);
        this.add(0, 6, grid_texture); //tohouse
        this.add(0, 5, grid_texture3); //start

        this.add(1, 5, grid_texture);
        this.add(2, 5, grid_texture);
        this.add(3, 5, grid_texture);

        this.add(4, 4, grid_texture);

        this.add(5, 3, grid_texture);
        this.add(5, 2, grid_texture);
        this.add(5, 1, grid_texture);
    }

    add_houses(grid_texture0, grid_texture1, grid_texture2, grid_texture3)
    {
        this.add(6, 1, grid_texture0);
        this.add(6, 2, grid_texture0);
        this.add(6, 3, grid_texture0);
        this.add(6, 4, grid_texture0);

        this.add(11, 6, grid_texture1);
        this.add(10, 6, grid_texture1);
        this.add(9, 6, grid_texture1);
        this.add(8, 6, grid_texture1);

        this.add(6, 11, grid_texture2);
        this.add(6, 10, grid_texture2);
        this.add(6, 9, grid_texture2);
        this.add(6, 8, grid_texture2);

        this.add(1, 6, grid_texture3);
        this.add(2, 6, grid_texture3);
        this.add(3, 6, grid_texture3);
        this.add(4, 6, grid_texture3);
    }

    add_to_draw()
    {
        for(var a = 0; a < this.grids.length; a++)
        {
            this.grids[a].add_to_draw();
        }

        for(var a = 0; a < this.bases.length; a++)
        {
            this.bases[a].add_to_draw();
        }

        for(var a = 0; a < this.pions.length; a++)
        {
            this.pions[a].add_to_draw();
        }

        for(var a = 0; a < this.bases.length; a++)
        {
            this.bases[a].add_to_draw_mask();
        }

        add_sprite(this.cursor_tex);
    }

    update_draw()
    {
        this.cursor_tex.x = this.bases[Global.turnID].get_x()+(32*Global.screen_scale);
        this.cursor_tex.y = this.bases[Global.turnID].get_y()+(32*Global.screen_scale);
        this.cursor_tex.anchor.set(0.5);
        this.cursor_tex.rotation += 0.01;
    }
}
