var last_return_object = null;

function getBoardsList()
{
    $.ajax({
        url:"getter.php",
        type:"GET",
        async: false,
        data: {action:"list"},
        dataType:"json",
        success:function(obj,textstatus)
        {
            last_return_object = obj;
            //console.log("success join");
            for(var a = 0; a < obj.tables.length; a++)
            {
                const t1 = obj.tables[a];
                const t2 = obj.players0[a];
                const t3 = obj.players0[a];
                const t4 = obj.players0[a];
                const t5 = obj.players0[a];

                $("#boards1").append("<tr><td class='toChange'>"+t1+"</td><td class='toChange'>"+t2+"</td><td class='toChange'>"+t3+"</td><td class='toChange'>"+t4+"</td><td class='toChange'>"+t5+"</td></tr>");
            }
            //console.log("action = "+data.action);
            //MULTI_COUNTER = 0;
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

function serverAction(actioN,tablE,iD,namE,griD,piD,pasS)
{
    $.ajax({
        url:"getter.php",
        type:"GET",
        async: false,
        //data: {name:readCookie("nazwa"),number:readCookie("numer"),pass:readCookie("haslo")},
        data: {action:actioN,table:tablE,id:iD,name:namE,grid:griD,pid:piD,pass:pasS},
        dataType:"json",
        success:function(obj,textstatus)
        {
            console.log(obj);
            //console.log("success join");
            last_return_object = obj;
            //console.log("action = "+data.action);
            //MULTI_COUNTER = 0;
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