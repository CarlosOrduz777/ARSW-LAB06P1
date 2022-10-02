apiclient=(function(){
    return {
        getBlueprintsByAuthor:function(authname,callback){
            const promise = $.get({
                              url: "/blueprints/" + authname,
                              contentType: "application/json"
                            });

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
        }

    }

})();