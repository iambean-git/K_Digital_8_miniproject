package com.pnu.controller;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.pnu.DTO.ChildDTO;
import com.pnu.domain.Child;
import com.pnu.domain.ChildVaccine;
import com.pnu.service.ChildService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ChildController {
	
	private final ChildService childService;
	
	@PostMapping("/registerChild")
	//public Child registerChild(@RequestBody ChildDTO child) throws IOException{
	public Child registerChild(@RequestParam("file") MultipartFile file,@RequestParam("childName") String childName,
							  @RequestParam("member") String member,@RequestParam("birth") LocalDate birth) throws IOException {
		System.out.println("ChildController registerChild");
		ChildDTO child = ChildDTO.builder()
							  .childName(childName)
							  .member(member)
							  .birth(birth)
							  .image(file)
							  .build();
		return childService.registerChild(child);
	} 
	
//	@PostMapping("/registerVaccine")
//	public ChildVaccine registerVaccine(ChildVaccine chVa) {
//		System.out.println("ChildController registerVaccine");
//		return childService.registerVaccine(chVa);
//	}
//	
	@PutMapping("/selectVaccine")
	public List<ChildVaccine> selectVaccine(Integer child_idx,@RequestParam(defaultValue = "0") String vaccine_idx) {
		System.out.println("ChildController selectVaccine");
		return childService.selectVaccine(child_idx,vaccine_idx);
	}
	
	@GetMapping("/getChild")
	public Child getChild(Integer idx) {
		System.out.println("ChildController findChid");
		return childService.getChild(idx);
	}
	
	@GetMapping("/getChildren")
	public List<Child> getChildren(String email) {
		System.out.println("ChildController findChild");
		return childService.getChildren(email);
	}
	
	@DeleteMapping("/deleteChild")
	public void deleteChild(Integer child_idx) {
		System.out.println("ChildController deleteChild");
		childService.deleteChild(child_idx);
	}
	
	@GetMapping("/checkVaccine")
	public List<Integer> checkVaccine(Integer child_idx){
		return childService.checkVaccine(child_idx);
	}
	
	@GetMapping("/scheduleVaccine")
	public List<ChildVaccine> scheduleVaccine(Integer child_idx){
		return childService.scheduleVaccine(child_idx);
	}
	
	@PutMapping("/updateChild")
	public Child updateChild(Child child) {
		return childService.updateChild(child);
	}


}
