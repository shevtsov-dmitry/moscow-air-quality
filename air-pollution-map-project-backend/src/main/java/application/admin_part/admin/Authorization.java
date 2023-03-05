package application.admin_part.admin;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
abstract class Authorization {
    @GetMapping(value = "/admin", produces = MediaType.TEXT_HTML_VALUE)
    public String showServerHtmlPage(){
        return "templates/index.html";
    }
    public boolean verify() {
        return false;
    }
}
