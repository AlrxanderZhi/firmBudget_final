package org.home.rest.init;

import lombok.RequiredArgsConstructor;
import org.home.rest.entity.Department;
import org.home.rest.entity.Employee;
import org.home.rest.repo.DepartmentRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@RequiredArgsConstructor
@Component
public class InitDatabase implements CommandLineRunner {

    private final DepartmentRepo departmentRepo;

    @Override
    public void run(String... args) {
        var department1 = new Department("Electrical", 100000, 10000, 1000, 1111, LocalDate.of(2023, 7, 11));
        department1.addEmployee(
                new Employee("George", "Washington", "gwashington", "$2a$10$kX2q13kFAHisJj3n7KJRButVIL/ldTaAZU8nIN5qx3ZFH9jTlyzkO", "d1pos0", 200, 1000, "ROLE_CHIEF"),
                new Employee("John", "Adams", "jadams", "$2a$10$1Z1XYSnYWgNWL/64.ihewOSVwRx4b5p/ldjffUKjFyHXJK6a2svCy", "d1pos1", 400, 800, "ROLE_CLERK")
        );
        departmentRepo.save(department1);

        var department2 = new Department("Mechanical", 200000, 20000, 2000, 2222, LocalDate.of(2023, 2,22));
        department2.addEmployee(
                new Employee("Thomas", "Jefferson", "tjefferson", "$2a$10$kX2q13kFAHisJj3n7KJRButVIL/ldTaAZU8nIN5qx3ZFH9jTlyzkO",  "d2pos0", 2000,  4000, "ROLE_CHIEF"),
                new Employee("James", "Madison", "jmadison",  "$2a$10$1Z1XYSnYWgNWL/64.ihewOSVwRx4b5p/ldjffUKjFyHXJK6a2svCy", "d2pos1", 3000, 6000, "ROLE_CLERK"),
                new Employee("James", "Monroe", "jmonroe",  "$2a$10$1Z1XYSnYWgNWL/64.ihewOSVwRx4b5p/ldjffUKjFyHXJK6a2svCy", "d2pos2", 2500, 5000, "ROLE_CLERK"),
                new Employee("Kolya", "Vasyukoff", "kvasyukoff",  "$2a$10$1Z1XYSnYWgNWL/64.ihewOSVwRx4b5p/ldjffUKjFyHXJK6a2svCy", "d2pos3", 3500, 7000, "ROLE_CLERK"),
                new Employee("Vasyl", "Zhukoff", "vzhukoff",  "$2a$10$1Z1XYSnYWgNWL/64.ihewOSVwRx4b5p/ldjffUKjFyHXJK6a2svCy", "d2pos4", 2000, 6000, "ROLE_CLERK")
        );
        departmentRepo.save(department2);

        var department3 = new Department("Technological", 300000, 30000, 3000, 3333, LocalDate.of(2023, 7, 26));
        department3.addEmployee(
                new Employee("George ", "Bush", "gbush", "$2a$10$kX2q13kFAHisJj3n7KJRButVIL/ldTaAZU8nIN5qx3ZFH9jTlyzkO", "d3pos0", 3000, 15000, "ROLE_CHIEF"),
                new Employee("Ronald", "Reagan", "rreagan", "$2a$10$1Z1XYSnYWgNWL/64.ihewOSVwRx4b5p/ldjffUKjFyHXJK6a2svCy", "d3pos1", 4000, 8000, "ROLE_CLERK")
        );
        departmentRepo.save(department3);

        var department4 = new Department("Instrumental", 400000, 40000, 4000, 4444, LocalDate.of(2023, 4, 1));
        department4.addEmployee(
                new Employee("Jhon", "More", "jmore", "$2a$10$kX2q13kFAHisJj3n7KJRButVIL/ldTaAZU8nIN5qx3ZFH9jTlyzkO", "d4pos0", 2000, 20000, "ROLE_CHIEF"),
                new Employee("Lucy", "Novak", "lnovak", "$2a$10$1Z1XYSnYWgNWL/64.ihewOSVwRx4b5p/ldjffUKjFyHXJK6a2svCy", "d4pos1", 5000, 10000, "ROLE_CLERK"),
                new Employee("Steeve", "Molly", "smolly", "$2a$10$1Z1XYSnYWgNWL/64.ihewOSVwRx4b5p/ldjffUKjFyHXJK6a2svCy", "d4pos2", 500, 1500, "ROLE_CLERK")
        );
        departmentRepo.save(department4);

        var department5 = new Department("Administrative", 500000, 50000, 5000, 5555, LocalDate.of(2023, 6, 30));
        department5.addEmployee(
                new Employee("Donald", "Trump", "dtrump", "$2a$10$cU06swMkNLOiNOHj8AJANOTVkMt.AxSwDaFUTZFOBRaP/XYySc6h.", "d5pos0", 10000, 40000, "ROLE_DIRECTOR"),
                new Employee("Vasya", "Pupkin", "vpupkin", "$2a$10$xXfDUcogF3JPCf5Cta47Fe/MKze7s8eux9WuiZ.nMUtWtWng7udnu", "d5pos1", 3000, 6000, "ROLE_ADMIN"),
                new Employee("Bill", "Gates", "bgates", "$2a$10$1Z1XYSnYWgNWL/64.ihewOSVwRx4b5p/ldjffUKjFyHXJK6a2svCy", "d5pos2", 5000, 10000, "ROLE_CLERK")
        );
        departmentRepo.save(department5);
    }
}