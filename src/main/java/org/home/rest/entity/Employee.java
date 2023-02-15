package org.home.rest.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @NonNull
    String firstName;

    @NonNull
    String lastName;

    @NonNull
    String username;

    @NonNull
    @JsonIgnore
    String password;

    @NonNull
    String personalId;

    @NonNull
    Integer onePayLimit;

    @NonNull
    Integer dayLimit;

    @NonNull
    Integer balance;

    @NonNull
    String role;

    @NonNull
    LocalDate date;

    @ManyToOne
    Department department;

    @Version
    int version;
}
