package com.fitness.gateway.user;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientException;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;
import com.fitness.gateway.user.RegisterRequest;
import com.fitness.gateway.user.UserResponse;
import lombok.extern.slf4j.Slf4j;



@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final WebClient userServiceWebClient;

    public Mono<Boolean> validateUser(String userId){
      
            return userServiceWebClient.get()
                    .uri("/api/users/{userId}/validate",userId)
                    .retrieve()
                    .bodyToMono(Boolean.class)
                    .onErrorResume(WebClientResponseException.class, e->{
                        if(e.getStatusCode() == HttpStatus.NOT_FOUND)
                            return Mono.error(new RuntimeException("User Not Found: "+userId));
                        else if(e.getStatusCode() ==HttpStatus.BAD_REQUEST)
                            return Mono.error(new RuntimeException("Invalid request: "+userId));
                        return Mono.error(new RuntimeException("Unexcepted error: "+e.getMessage()));
                    });

    }

    public Mono<UserResponse> registerUser(RegisterRequest registerRequest){
        log.info("Calling user Register API for userId: {}",registerRequest.getEmail());
        return userServiceWebClient.post()
                    .uri("/api/users/register")
                    .bodyValue(registerRequest)
                    .retrieve()
                    .bodyToMono(UserResponse.class)
                    .onErrorResume(WebClientResponseException.class, e->{
                        if(e.getStatusCode() == HttpStatus.BAD_REQUEST)
                            return Mono.error(new RuntimeException("Bad Request"));
                        else if(e.getStatusCode() ==HttpStatus.INTERNAL_SERVER_ERROR)
                            return Mono.error(new RuntimeException("Internal Server Error"));
                        return Mono.error(new RuntimeException("Unexcepted error: "+e.getMessage()));
                    });
    }
}
