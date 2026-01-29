package com.fitness.userservice.service;

import com.fitness.userservice.dto.RegisterRequest;
import com.fitness.userservice.dto.UserResponse;
import com.fitness.userservice.model.User;
import com.fitness.userservice.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@lombok.extern.slf4j.Slf4j
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserResponse register(@Valid RegisterRequest request) {
        log.info("Registering user: {}", request);

        if(userRepository.existsByEmail(request.getEmail())){
            User exisitingUser = userRepository.findByEmail(request.getEmail());
            
            // Update keycloakId if it's missing in DB but present in request
            if (exisitingUser.getKeycloakId() == null && request.getKeycloakId() != null) {
                exisitingUser.setKeycloakId(request.getKeycloakId());
                exisitingUser = userRepository.save(exisitingUser);
            }

            UserResponse userResponse = new UserResponse();
            userResponse.setId(exisitingUser.getId());
            userResponse.setPassword(exisitingUser.getPassword());
            userResponse.setEmail(exisitingUser.getEmail());
            userResponse.setKeycloakId(exisitingUser.getKeycloakId());
            userResponse.setFirstName(exisitingUser.getFirstName());
            userResponse.setLastName(exisitingUser.getLastName());
            userResponse.setCreatedAt(exisitingUser.getCreatedAt());
            userResponse.setUpdatedAt(exisitingUser.getUpdatedAt());
            return userResponse;
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setKeycloakId(request.getKeycloakId());

        User savedUser = userRepository.save(user);
        UserResponse userResponse = new UserResponse();
        userResponse.setId(savedUser.getId());
        userResponse.setPassword(savedUser.getPassword());
        userResponse.setEmail(savedUser.getEmail());
        userResponse.setKeycloakId(savedUser.getKeycloakId());
        userResponse.setFirstName(savedUser.getFirstName());
        userResponse.setLastName(savedUser.getLastName());
        userResponse.setCreatedAt(savedUser.getCreatedAt());
        userResponse.setUpdatedAt(savedUser.getUpdatedAt());
        return userResponse;

    }


    public UserResponse getUserProfile(String userId) {
        User savedUser=userRepository.findById(userId).orElseThrow(()->new RuntimeException("User Not Found"));
        UserResponse userResponse = new UserResponse();
        userResponse.setId(savedUser.getId());
        userResponse.setPassword(savedUser.getPassword());
        userResponse.setEmail(savedUser.getEmail());
        userResponse.setFirstName(savedUser.getFirstName());
        userResponse.setLastName(savedUser.getLastName());
        userResponse.setKeycloakId(savedUser.getKeycloakId());
        userResponse.setCreatedAt(savedUser.getCreatedAt());
        userResponse.setUpdatedAt(savedUser.getUpdatedAt());
        return userResponse;
    }

    public Boolean existByUserId(String userId) {
        return userRepository.existsByKeycloakId(userId);
    }
}
