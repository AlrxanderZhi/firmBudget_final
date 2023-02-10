package org.home.rest.service;

import lombok.RequiredArgsConstructor;
import org.home.rest.entity.Employee;
import org.home.rest.repo.EmployeeRepo;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final EmployeeRepo employeeRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Employee> autoUserOptional = employeeRepo.findUserByUsername(username);
        if(autoUserOptional.isEmpty()) throw new UsernameNotFoundException("Not found by " + username);
        Employee employee = autoUserOptional.get();
        return new User(employee.getUsername(), employee.getPassword(),
                AuthorityUtils.createAuthorityList(employee.getRole()));
    }
}
