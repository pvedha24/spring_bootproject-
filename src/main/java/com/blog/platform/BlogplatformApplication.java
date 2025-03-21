package com.blog.platform;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
//@ComponentScan(basePackages = "com.blog.platform") // 👈 Ensure all components are scanned
public class BlogplatformApplication {
	public static void main(String[] args) {
		SpringApplication.run(BlogplatformApplication.class, args);
	}
}




