package net.javaguides.springBoot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import net.javaguides.springBoot.entity.Employee;
import net.javaguides.springBoot.repository.EmployeeRepository;

@SpringBootApplication
public class SpringBootBackendApplication implements CommandLineRunner{

	public static void main(String[] args) {
		SpringApplication.run(SpringBootBackendApplication.class, args);
	}

	@Autowired
	private EmployeeRepository employeeRepository;

	@Override
	public void run(String... args) throws Exception {
		Employee employee1 = Employee.builder()
		.firstName("Ramesh")
		.lastName("Fadatare")
		.email("ramesh@gmail.com")
		.build();

		Employee employee2 = Employee.builder()
		.firstName("Tony")
		.lastName("Stark")
		.email("tony@gmail.com")
		.build();

		Employee employee3 = Employee.builder()
		.firstName("John")
		.lastName("Cena")
		.email("John@gmail.com")
		.build();

		employeeRepository.save(employee1);
		employeeRepository.save(employee2);
		employeeRepository.save(employee3);
	}

}
