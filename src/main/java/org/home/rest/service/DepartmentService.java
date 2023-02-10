package org.home.rest.service;

import lombok.RequiredArgsConstructor;
import org.home.rest.entity.Department;
import org.home.rest.repo.DepartmentRepo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DepartmentService {
    private final DepartmentRepo departmentRepo;

    public List<Department> getAllDepts() {
        return departmentRepo.findAll();
    }

    public ResponseEntity<Department> getDeptById(Long id) {
        if (departmentRepo.existsById(id)) {
            return ResponseEntity.of(departmentRepo.findById(id));
        }
        return ResponseEntity.notFound().build();
    }

    public ResponseEntity<?> deleteDeptById(Long id) {
        if (departmentRepo.existsById(id)) {
            departmentRepo.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    public ResponseEntity<?> addDept(Department dept) {
        try {
            var newDept = departmentRepo.save(dept);
            return ResponseEntity
                    .created(URI.create("/api/v1/dept/" + newDept.getId()))
                    .build();
        } catch (Throwable throwable) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(throwable);
        }
    }

    public ResponseEntity<Department> updateDept(Long id, Department dept) {
        Optional<Department> foundDepart = departmentRepo.findById(id);
        if (foundDepart.isPresent()) {
            var dpt = foundDepart.get();
            dpt.setName(dept.getName());
            dpt.setBalance(dept.getBalance());
            dpt.setDepartDayLimit(dept.getDepartDayLimit());
            dpt.setDepartOnePayLimit(dept.getDepartOnePayLimit());
            dpt.setDepartDateLimit(dept.getDepartDateLimit());
            dpt.setDepartDate(dept.getDepartDate());
            return ResponseEntity.of(Optional.of(departmentRepo.save(dpt)));
        }
        return ResponseEntity.notFound().build();
    }
}
