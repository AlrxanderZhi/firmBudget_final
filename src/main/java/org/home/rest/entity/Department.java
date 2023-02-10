package org.home.rest.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@RequiredArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @NonNull
    String name;
    @NonNull
    Integer balance;
    @NonNull
    Integer departDayLimit;
    @NonNull
    Integer departOnePayLimit;
    @NonNull
    Integer departDateLimit;
    @NonNull
    LocalDate departDate;

    @JsonIgnore
    @OneToMany(mappedBy = "department", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
    List<Employee> employees = new ArrayList<>();

    public void addEmployee(Employee... employees) {
        for (Employee employee : employees) {
            employee.setDepartment(this);
            this.employees.add(employee);
        }
    }
}
