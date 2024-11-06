package com.example.Projeto_Final;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@SpringBootApplication
public class ProjetoFinalApplication implements ProjetoFinalConnection {
	public static void main(String[] args) {
		SpringApplication.run(ProjetoFinalApplication.class, args);

	}

	@Override
		public void addCorsMappings(CorsRegistry registry) {
			registry.addMapping("/**")
					.allowedOrigins("*")
					.allowedMethods("GET", "POST", "PUT", "DELETE")
					.allowedHeaders("*");
		}
}
