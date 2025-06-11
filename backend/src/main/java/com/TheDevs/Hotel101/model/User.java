package com.TheDevs.Hotel101.model;

import com.TheDevs.Hotel101.enums.Role;
import com.TheDevs.Hotel101.exceptions.EmailNotValidException;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User implements UserDetails { // 1. implement the UserDetails interface
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter
    @Setter
    @Column(nullable = false)
    private String firstName;

    @Getter
    @Setter
    @Column(nullable = false)
    private String lastName;

    @Getter
    @Column(unique = true, nullable = false)
    private String email;

    @Getter
    @Setter
    @Column(nullable = false)
    private String password;

    @Getter
    @Setter
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() { // 2. Override the getPassword method
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }
//    public String getEmail() {
//        return email;
//    }
//
//    public String getPassword() {
//        return password;
//    }

//    public String getRole() {
//        return role.toString();
//    }

    public void setEmail(String email) {
        if (isValidEmail(email)) {
            this.email = email;
        } else {
            throw new EmailNotValidException();
        }
    }

    private boolean isValidEmail(String email) {
        String regex = "^((?!\\.)[\\w\\-_.]+[^.])@([\\w\\-]+(\\.[a-zA-Z]{2,})+)$";
        Pattern p = Pattern.compile(regex);
        if (email == null) {
            return false;
        }
        Matcher m = p.matcher(email);
        return m.matches();
    }

    public static boolean isValidPassword(String password) {
        String regex = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{6,20}$";
        Pattern p = Pattern.compile(regex);
        if (password == null) {
            return false;
        }
        Matcher m = p.matcher(password);
        return m.matches();
    }

    public String getFullName(String firstName, String lastName) {
        return firstName + " " + lastName;
    }
}
