var app = (function(){
    var author;
    var blueprint;
    var blueprints;
    var blueprintsPoints=[];
    var pointsSelected = [];
    var blueprintSel = false;
    var oldpoints;
    var oldpointsbp;
    var blueprintAdded = 0;


    var getSelectedAuthor = function(){
        return $("#author").val()
    }

    var getBlueprints = function(list){
        blueprints = list;
    }
    var getBlueprintsPoints = function(object){
        blueprintsPoints = object;
    }
    function searchBlueprintPoints(authorName, blueprintName){
            apiclient.getBlueprintsByNameAndAuthor(authorName,blueprintName,(req,resp) => {
                if(resp.points === null){
                    resp.points = [{x:0,y:0}];
                }
                draw(resp);
                getBlueprintsPoints(resp);
                blueprint = resp;
                blueprintAdded = 0;
            });
    }
    function getAuthorBlueprints(){
        author = getSelectedAuthor();
        apiclient.getBlueprintsByAuthor(author, (req,resp) => {
            parseData(resp);
            getBlueprints(resp);
        });
    }
    function clearAll() {
            $("#author-bpTable tbody").remove();
            //$("#popup").css("visibility", "hidden");
            clearCanvas();
            const c = document.getElementById("blueprintCanvas");
            const ctx = c.getContext("2d");
            ctx.clearRect(0, 0, c.width, c.height);
            ctx.restore();
            ctx.beginPath();
        }
    function clearCanvas(){
            console.log("sadsadasdasd");
            $("#blueprintCanvas").click(function () {
                return false;
            });
        }
    function parseData(data){
        console.log("Data" + data)
        author = getSelectedAuthor();
        console.log(author);
        console.log(blueprints);
        var blueprintsCopy = blueprints;
        var blueprintMapped = data.map((bp) => {
            if(bp.points != null){
                return {name:bp.name, pointsNumber:bp.points.length}
            }else{
                return {name:bp.name, pointsNumber:0}
            }

        });

        var blueprintAuthorTable = blueprintMapped.map(function(bpm){
            var row = "<tbody><tr class='table-secondary'><td align=\"center\" id=\""+bpm.name+"_\">"+bpm.name+"</td><td id=\""+bpm.name+"points\"' align=\"center\">"+bpm.pointsNumber+" </td><td align=\"center\">"+"<button onclick=\"app.searchBlueprintPoints('"+author+"','"+bpm.name+"')\" type='button' class='btn btn-primary'>Open</button>"+"</td></tr></tbody>"
            $("#author-bpTable").append(row);
            return row;
        });

        var pointsMapped = blueprintMapped.map((bpm) => {return bpm.pointsNumber});
        console.log(pointsMapped);
        var totalAuthorPoints = pointsMapped.reduce((previousValue,currentValue) => previousValue + currentValue,0);
        console.log(totalAuthorPoints);
        oldpoints = totalAuthorPoints;
        $("#totalAuthorPoints").text(totalAuthorPoints);

    }


    function draw(blueprintPoints){

        const canvas = document.getElementById("blueprintCanvas"),
                             ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
        ctx.beginPath();
        ctx.moveTo(blueprintPoints.points[0].x,blueprintPoints.points[0].y);
        for(var i=1; i<blueprintPoints.points.length; i++){
            ctx.lineTo(blueprintPoints.points[i].x,blueprintPoints.points[i].y);
        }
        ctx.stroke();
        oldpointsbp = blueprintPoints.points.length;
        init();
    }

    function init(){
        $("#blueprintCanvas").click(drawNewFunction());
    }

    function drawNewFunction(){
        const elem = document.getElementById("blueprintCanvas");
        const context = elem.getContext('2d');

        context.beginPath();
        return function(e){
            const offset = $(elem).offset();
            context.moveTo(CordX, CordY);
            var CordX = e.clientX - offset.left;
            var CordY = e.clientY - offset.top;
            console.log(blueprintsPoints);
            var startX = (blueprintsPoints.points[blueprintsPoints.points.length - 1].x);
            var startY = (blueprintsPoints.points[blueprintsPoints.points.length - 1].y);
            blueprintsPoints.points.push({x:CordX,y:CordY});
            blueprintAdded += 1;
            console.log("puntos añadidos en el push"+blueprintAdded)
            context.moveTo(startX,startY);
            context.lineTo(CordX, CordY);
            context.stroke();
        }
    }

     function saveBlueprint(){
        authorName = getSelectedAuthor();
        let data = JSON.stringify({author:authorName,name:blueprint.name,points:blueprintsPoints.points});

        apiclient.saveBlueprint(data,author,blueprint.name,(req,resp) => {
            //var numberPointsColumn = blueprints.filter(bp => bp.name === blueprint.name)[0].points.length;
            //console.log("Number Points Column" + numberPointsColumn)
            //document.getElementById(blueprint.name+"points").innerHTML = numberPointsColumn + blueprintAdded;
            //var totalPoint = oldpoints + blueprintAdded;
            //$("#totalAuthorPoints").text(totalPoint);
            $("table tbody").remove();
            getAuthorBlueprints();
        });
     }

     function postNewBlueprint(){
        clearAll();
        var newBluePrintName = $('#newBpName').val();
        var json = JSON.stringify({author:getSelectedAuthor(),name:newBluePrintName});
        apiclient.postBlueprint(json,(req,resp) =>{
            getAuthorBlueprints();
        });

     }

     function inputName(){
        const elem = document.getElementById("blueprintCanvas");
        elem.width += 0;
        document.getElementById('popup').style.display = 'block';
     }
    function deleteBlueprint(){
          const canvas = document.getElementById("blueprintCanvas"),
                                      ctx = canvas.getContext('2d');
             authorName = getSelectedAuthor();
             ctx.clearRect(0, 0, canvas.width, canvas.height);
             ctx.restore();
             ctx.beginPath();
             apiclient.deletePrint(authorName,blueprint.name,(req,resp) => {
                 $("table tbody").remove();
                 getAuthorBlueprints();
             });
         }


    return{
        getAuthor : function(){
            getSelectedAuthor();
        },
        getAuthorBlueprints: getAuthorBlueprints,
        searchBlueprintPoints: searchBlueprintPoints,
        saveBlueprint:saveBlueprint,
        inputName:inputName,
        init: init,
        postNewBlueprint:postNewBlueprint,
        deleteBlueprint:deleteBlueprint

    }

})();