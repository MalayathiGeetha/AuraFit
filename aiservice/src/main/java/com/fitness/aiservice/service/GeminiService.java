package com.fitness.aiservice.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
@Slf4j
public class GeminiService {

    public final WebClient webClient;

    @Value("${gemini.api.url}")
    private String geminiApiUrl;
    @Value("${gemini.api.key}")
    private String geminiApiKey;

    public GeminiService(WebClient.Builder webClient) {
        this.webClient = webClient.build();
    }

    public String getAnswer(String question){
        log.info("Sending request to Gemini API...");
        Map<String,Object> requestBody=Map.of(
                "contents",new Object[]{
                        Map.of("parts", new Object[]{
                                Map.of("text", question)
                        })
                }
        );
        try {
            String response = webClient.post().uri(geminiApiUrl + geminiApiKey)
                    .header("Content-Type", "application/json")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .timeout(java.time.Duration.ofSeconds(60))
                    .block();
            log.info("Received response from Gemini API.");
            return response;
        } catch (Exception e) {
            log.error("Error calling Gemini API: {}", e.getMessage());
            throw e;
        }
    }
}
