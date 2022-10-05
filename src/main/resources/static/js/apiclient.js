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
                            alert("No existe author")
                        });
        },
        saveBlueprint:function(sdata,authname,bpname,callback){
            console.log("entra al apiclient");
            console.log(sdata);
            const promise = $.ajax({
                                  url: "/blueprints/addBlueprint/"+authname+"/"+bpname,
                                  type: 'PUT',
                                  data: sdata,
                                  contentType: "application/json; charset=utf-8"
              });
               promise.then(function(data){
                                            callback(null,data);
                                        },function(error){
                                            alert("No existe autor y blueprint")
                                        });
        },
        postBlueprint:function(bpname,callback){
            const promise = $.ajax({
                                              url: "/blueprints/addBlueprint/",
                                              type: 'POST',
                                              data: bpname,
                                              contentType: "application/json; charset=utf-8"
                          });
                           promise.then(function(data){
                                                        console.log("promise correct")
                                                        callback(null,data);
                                                    },function(error){
                                                        alert("No se logró crear el blueprint")
                                                    });

        },
          deletePrint:function(author,bpname,callback){
                     console.log("delete apiclient")
          const promise = $.ajax({
                         url: "/blueprints/deletebp/"+author+"/"+bpname,
                         type: 'DELETE',
                         contentType: "application/json"
                     });
                     promise.then(function(data){
                             callback(null,data);
                         },function(error){
                             alert("No existe autor y blueprint")
                         });
          }

    }

})();