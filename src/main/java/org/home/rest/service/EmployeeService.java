package org.home.rest.service;

import lombok.RequiredArgsConstructor;
import org.home.rest.entity.Department;
import org.home.rest.entity.Employee;
import org.home.rest.repo.DepartmentRepo;
import org.home.rest.repo.EmployeeRepo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepo employeeRepo;
    private final DepartmentRepo departmentRepo;

    public List<Employee> getAllEmployees() {
        return employeeRepo.findAll();
    }

    public ResponseEntity<Employee> getEmployeeById(Long id) {
        if (employeeRepo.existsById(id)) {
            return ResponseEntity.of(employeeRepo.findById(id));
        }
        return ResponseEntity.notFound().build();
    }

    public ResponseEntity<Employee> updateEmployee(Long id, Employee employee) {
        Optional<Employee> foundEmployee = employeeRepo.findById(id);
        if (foundEmployee.isPresent()) {
            var person = foundEmployee.get();
            person.setFirstName(employee.getFirstName());
            person.setLastName(employee.getLastName());
            person.setDayLimit(employee.getDayLimit());
            person.setOnePayLimit(employee.getOnePayLimit());
            person.setBalance(employee.getBalance());
            person.setDate(employee.getDate());
            return ResponseEntity.of(Optional.of(employeeRepo.save(person)));
        }
        return ResponseEntity.notFound().build();
    }

    public ResponseEntity<?> deleteEmployeeById(Long id) {
        if (employeeRepo.existsById(id)) {
            employeeRepo.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    public ResponseEntity<?> addEmployee(Employee employee) {
        try {
            Optional<Department> optionalDepartment = departmentRepo.findById(employee.getDepartment().getId());
            if (optionalDepartment.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            var saved = employeeRepo.save(employee);
            return ResponseEntity
                    .created(URI.create("/api/v1/employee/" + saved.getId()))
                    .build();
        } catch (Throwable throwable) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(throwable);
        }
    }

//    public String getCurrentUsername() {
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        return auth.getName();
//    }
}
