package com.fitness.activityservice;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.core.MongoTemplate;

@SpringBootApplication
public class ActivityserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ActivityserviceApplication.class, args);
	}

	@Autowired
	private MongoTemplate mongoTemplate;

	@PostConstruct
	public void printActualDb() {
		System.out.println("Spring is connected to DB: "
				+ mongoTemplate.getDb().getName());
	}

}
