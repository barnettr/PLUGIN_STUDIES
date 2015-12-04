$("#login").live("click", function(){
        var formData = $("#login-form").serialize();
        $.ajax({
                type: "POST",
                url: "url",
                cache: false,
                data: formData,
                dataType: "json",
                success: onLogin
                });
    });
       function onLogin(data) {
                  if(data.state == 1) {
                $.mobile.changePage("page1", {transition: "slideup"});
                  }else {
                      $.mobile.changePage("page2", {transition: "pop", role: "dialog"});
                  }
       }