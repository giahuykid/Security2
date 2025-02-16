package com.Huypro.SpringSecurity3.auth;

import com.Huypro.SpringSecurity3.config.JWTService;
import com.Huypro.SpringSecurity3.user.entity.UserEntity;
import com.Huypro.SpringSecurity3.user.repository.UserRepository;
import com.Huypro.SpringSecurity3.user.roleEnum.Role;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {
    @Autowired
    private JWTService jwtService;
    @Autowired
    private UserRepository userReprosity;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;

    public AuthResponse registerUser(RegisterRequest registerRequest) {
        if(userReprosity.existsByEmail(registerRequest.getEmail())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "The email Existed.");
        }
        String password = registerRequest.getPassword();
        if (password.length() < 8 || !Character.isUpperCase(password.charAt(0))) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password must be at least 8 characters long and start with an uppercase letter.");
        }
        UserEntity userEntity = new UserEntity();
        userEntity.setFirstName(registerRequest.getFirstName());
        userEntity.setLastName(registerRequest.getLastName());
        userEntity.setEmail(registerRequest.getEmail());
        userEntity.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        userEntity.setRole(Role.ROLE_USER);
        userReprosity.save(userEntity);
        // không trả về void cho đơn giản đúng ra phải trả về mã xác thực bên gmail để xác thực
        String jwtToken = jwtService.generateToken(userEntity);
        return new AuthResponse(jwtToken);
    }
    public AuthResponse registerAdmin(RegisterRequest registerRequest) {
        if(userReprosity.existsByEmail(registerRequest.getEmail())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "The email Existed.");
        }
        String password = registerRequest.getPassword();
        if (password.length() < 8 || !Character.isUpperCase(password.charAt(0))) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password must be at least 8 characters long and start with an uppercase letter.");
        }

        UserEntity userEntity = new UserEntity();
        userEntity.setFirstName(registerRequest.getFirstName());
        userEntity.setLastName(registerRequest.getLastName());
        userEntity.setEmail(registerRequest.getEmail());
        userEntity.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        userEntity.setRole(Role.ROLE_ADMIN);
        userReprosity.save(userEntity);
        String jwtToken = jwtService.generateToken(userEntity);
        return new AuthResponse(jwtToken);



    }
    public AuthResponse login(AuthRequest request) {
        //FirstStep
        //We need to validate our request (validate whether password & username is correct)
        //Verify whether user present in the database
        //Which AuthenticationProvider -> DaoAuthenticationProvider (Inject)
        //We need to authenticate using authenticationManager injecting this authenticationProvider
        //SecondStep
        //Verify whether userName and password is correct => UserNamePasswordAuthenticationToken
        //Verify whether user present in db
        //generateToken
        //Return the token
        Authentication authentication =  authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userReprosity.findByEmail(request.getEmail())
                .orElseThrow();
        String jwtToken = jwtService.generateToken(user);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return  new AuthResponse(jwtToken);
    }
}
