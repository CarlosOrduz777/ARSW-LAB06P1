apiclient=(function(){
    return {
        getBlueprintsByAuthor:function(authname,callback){
            const promise = $.get({
                              url: "/blueprints/" + authname,
                              contentType: "application/json"
                            });
            console.log("Promesa: "+promise);
            promise.then(function(data){
                callback(null,data);
            },function(error){
                alert("No existe este autor")
            });

        },
        getBlueprintsByNameAndAuthor: function(authname,bpname,callback){
            const promise = $.get({
                                          url: "/blueprints/" + authname+"/"+bpname,
                                          contentType: "application/json"
                                        });

                        promise.then(function(data){
                            callback(null,data);
                        },function(error){
                            alert("No existe este autor")
                        });
        },
        saveBlueprint:function(sdata,authname,bpname,callback){
            console.log("entra al apiclient");
            console.log(sdata);
            const promise = $.ajax({
                                  url: "/blueprints/addBlueprint/"+authname+"/"+bpname,
                                  type: 'PUT',
                                  data: sdata,
                                  contentType: "application/json"
              }).done(function () {
                  console.log('SUCCESS');
              }).fail(function (msg) {
                  console.log('FAIL');
              }).always(function (msg) {
                  console.log('ALWAYS');
              });
        }

    }

})();