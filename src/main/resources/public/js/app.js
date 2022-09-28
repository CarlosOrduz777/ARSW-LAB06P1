var app = (function(){
    var author;
    var blueprints;

    var getSelectedAuthor = function(){
        return $("#author").val()
    }

    var getBlueprints = function(list){
        blueprints = list;
    }

    function getAuthorBlueprints(){
        author = getSelectedAuthor();
        console.log(author);
        apimock.getBlueprintsByAuthor(author,getBlueprints);
        console.log(blueprints);
        var blueprintsCopy = blueprints;
        var blueprintMapped = blueprintsCopy.map((bp) => {return {name:bp.name, pointsNumber:bp.points.length}
        });
        var blueprintAuthorTable = blueprintMapped.map(function(bpm){
            var row = "<tr><td align=\"center\" id=\""+bpm.name+"_\">"+bpm.name+"</td><td align=\"center\">"+bpm.pointsNumber+"</td></tr>"
            $("#author-bpTable tbody").append(row);
            return row;
        });

        var pointsMapped = blueprintMapped.map((bpm) => {return bpm.pointsNumber});
        console.log(pointsMapped);
        var totalAuthorPoints = pointsMapped.reduce((previousValue,currentValue) => previousValue + currentValue,0);
        console.log(totalAuthorPoints);
        $("#totalAuthorPoints").text(totalAuthorPoints);

    }
    return{
        getAuthor : function(){
            getSelectedAuthor();
        },
        getAuthorBlueprints: getAuthorBlueprints


    }

})();
app;