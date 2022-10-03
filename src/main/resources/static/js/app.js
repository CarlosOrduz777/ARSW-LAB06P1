var app = (function(){
    var author;
    var blueprints;
    var blueprintsPoints=[];
    var pointsSelected = [];
    var blueprintSel = false;


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
                draw(resp);
                getBlueprintsPoints(resp);
            });
    }
    function getAuthorBlueprints(){
        author = getSelectedAuthor();
        apiclient.getBlueprintsByAuthor(author, (req,resp) => {
            parseData(resp);
            getBlueprints(resp);
        });
    }
    function parseData(data){
        console.log("Data" + data)
        author = getSelectedAuthor();
        console.log(author);
        console.log(blueprints);
        var blueprintsCopy = blueprints;
        var blueprintMapped = data.map((bp) => {return {name:bp.name, pointsNumber:bp.points.length}
        });
        var blueprintAuthorTable = blueprintMapped.map(function(bpm){
            var row = "<tbody><tr class='table-secondary'><td align=\"center\" id=\""+bpm.name+"_\">"+bpm.name+"</td><td align=\"center\">"+bpm.pointsNumber+"</td><td align=\"center\">"+"<button onclick=\"app.searchBlueprintPoints('"+author+"','"+bpm.name+"')\" type='button' class='btn btn-primary'>Open</button>"+"</td></tr></tbody>"
            $("#author-bpTable").append(row);
            return row;
        });

        var pointsMapped = blueprintMapped.map((bpm) => {return bpm.pointsNumber});
        console.log(pointsMapped);
        var totalAuthorPoints = pointsMapped.reduce((previousValue,currentValue) => previousValue + currentValue,0);
        console.log(totalAuthorPoints);
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
            var startX = (blueprintsPoints.points[blueprintsPoints.points.length - 1].x)
            var startY = (blueprintsPoints.points[blueprintsPoints.points.length - 1].y)
            blueprintsPoints.points.push({'x':CordX,'y':CordY});
            context.moveTo(startX,startY);
            context.lineTo(CordX, CordY);
            context.stroke();
        }
    }

    function putNewPoints(){

    }



    return{
        getAuthor : function(){
            getSelectedAuthor();
        },
        getAuthorBlueprints: getAuthorBlueprints,
        searchBlueprintPoints: searchBlueprintPoints,
        init: init

    }

})();