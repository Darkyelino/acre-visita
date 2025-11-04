package com.acrevisita.femapi;

import java.util.TimeZone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import jakarta.annotation.PostConstruct;

@SpringBootApplication
public class FemapiApplication {

	public static void main(String[] args) {
		SpringApplication.run(FemapiApplication.class, args);
		System.out.println("Hello World");
	}

	@PostConstruct
	public void init() {
		TimeZone.setDefault(TimeZone.getTimeZone("America/Rio_Branco"));
	}

}
