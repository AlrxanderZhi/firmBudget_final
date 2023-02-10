package org.home.rest.api.controller;

import org.home.rest.controller.IAuthenticationFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GetUserWithCustomInterfaceController {

    @Autowired
    private IAuthenticationFacade authenticationFacade;

    @GetMapping("/username")
    String currentUserNameSimple() {
        Authentication authentication = authenticationFacade.getAuthentication();
        return authentication.getName();
    }

    @GetMapping("/user")
    Object currentUserRole() {
        return SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
