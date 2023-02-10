package org.home.rest.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class HomeController {

    @GetMapping
    String index() {
        return "login";
    }

    @GetMapping("dept")
    String dept() {
        return "dept";
    }

    @GetMapping("dept/{id}")
    String deptId() {
        return "deptTheSame";
    }

    @GetMapping("employees")
    String employeesAll() {
        return "employees";
    }

    @GetMapping("authorized")
    String authorized() {
        return "authorized";
    }

//    @GetMapping("director")
//    String director() {
//        return "director";
//    }
//
//    @GetMapping("deptchief")
//    String deptChief() {
//        return "deptchief";
//    }

    @GetMapping("employeePays")
    String employeePays() {
        return "employeePays";
    }
}
