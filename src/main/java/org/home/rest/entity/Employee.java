package org.home.rest.entity;

import lombok.*;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;

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
    String password;

    @NonNull
    String personalId;

    @NonNull
    Integer onePayLimit;

    @NonNull
    Integer dayLimit;

    @NonNull
    String role;

    @ManyToOne
    Department department;
}