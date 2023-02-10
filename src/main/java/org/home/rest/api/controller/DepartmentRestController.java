package org.home.rest.api.controller;

import lombok.RequiredArgsConstructor;
import org.home.rest.entity.Department;
import org.home.rest.service.DepartmentService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/dept")
@RequiredArgsConstructor
public class DepartmentRestController {
    private final DepartmentService departmentService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    List<Department> getAllDepts() {
        return departmentService.getAllDepts();
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<Department> getDeptById (@PathVariable Long id) {
        return departmentService.getDeptById(id);
    }

    @PostMapping
    ResponseEntity<?> addNewDept(@RequestBody Department dept) {
        return departmentService.addDept(dept);
    }

    @DeleteMapping("/{id}")
    ResponseEntity<?> deleteDeptById(@PathVariable Long id) {
        return departmentService.deleteDeptById(id);
    }

    @PutMapping("/{id}")
    ResponseEntity<Department> updateDeptDayLimits(@PathVariable Long id, @RequestBody Department dept) {
        return departmentService.updateDept(id, dept);
    }
}
