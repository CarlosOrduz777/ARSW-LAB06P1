var app = (function(){
    var author;
    var blueprints;
    var blueprintsByNameAndAuthor;

    var getSelectedAuthor = function(){
        return $("#author").val()
    }

    var getBlueprints = function(list){
        blueprints = list;
    }
    var getBlueprintsByNameAndAuthor = function(object){
        blueprintsByNameAndAuthor = object;
    }
    function searchBlueprintPoints(authorName, blueprintName){
            apiclient.getBlueprintsByNameAndAuthor(authorName,blueprintName,(req,resp) => {
                draw(resp);
            });
    }
    function getAuthorBlueprints(){
        author = getSelectedAuthor();
        apiclient.getBlueprintsByAuthor(author, (req,resp) => {
            parseData(resp);
            console.log(resp);
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
            var row = "<tr><td align=\"center\" id=\""+bpm.name+"_\">"+bpm.name+"</td><td align=\"center\">"+bpm.pointsNumber+"</td><td align=\"center\">"+"<button onclick=\"app.searchBlueprintPoints('"+author+"','"+bpm.name+"')\" type='button' class='btn btn-primary'>Open</button>"+"</td></tr>"
            $("#author-bpTable tbody").append(row);
            return row;
        });

        var pointsMapped = blueprintMapped.map((bpm) => {return bpm.pointsNumber});
        console.log(pointsMapped);
        var totalAuthorPoints = pointsMapped.reduce((previousValue,currentValue) => previousValue + currentValue,0);
        console.log(totalAuthorPoints);
        $("#totalAuthorPoints").text(totalAuthorPoints);

    }


    function draw(blueprintPoints){
        console.log("ENTROOO");
        console.log("BLUEPRINTPOINTS"+ blueprintPoints);
        var canvas = document.getElementById('blueprintCanvas');
        canvas.width = canvas.width;
        var ctx = canvas.getContext("2d");

        for(var i=0; i<blueprintPoints.points.length-1; i++){
            ctx.moveTo(blueprintPoints.points[i].x,blueprintPoints.points[i].y);
            ctx.lineTo(blueprintPoints.points[i+1].x,blueprintPoints.points[i+1].y);
            ctx.stroke();
        }

    }



    return{
        getAuthor : function(){
            getSelectedAuthor();
        },
        getAuthorBlueprints: getAuthorBlueprints,
        searchBlueprintPoints: searchBlueprintPoints


    }

})();