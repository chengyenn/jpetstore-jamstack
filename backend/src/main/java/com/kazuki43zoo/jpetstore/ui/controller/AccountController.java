/*
 *    Copyright 2016-2024 the original author or authors.
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */
package com.kazuki43zoo.jpetstore.ui.controller;

import com.kazuki43zoo.jpetstore.component.message.Messages;
import com.kazuki43zoo.jpetstore.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.validation.groups.Default;

/**
 * @author Kazuki Shimizu
 */
@RequestMapping("/accounts")
@Controller
@RequiredArgsConstructor
public class AccountController {

	private final AccountService accountService;

	@ModelAttribute
	public AccountForm setUpForm() {
		return new AccountForm();
	}

	@GetMapping(path = "/create", params = "form")
	public String createForm() {
		return "account/createForm";
	}

	@PostMapping("/create")
	public ResponseEntity<Messages> create(@RequestBody @Validated({Default.class, AccountForm.Create.class}) AccountForm form, BindingResult result,
										   Model model, RedirectAttributes redirectAttributes) {

		if (result.hasErrors()) {
			Messages errorMessages = new Messages();
			result.getFieldErrors().forEach(fieldError ->
					errorMessages.error(fieldError.getField() + ": " + fieldError.getDefaultMessage())
			);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessages);
		}

		accountService.createAccount(form.toAccount());

		Messages successMessages = new Messages().success("Your account has been created. Please try login !!");
		return ResponseEntity.status(HttpStatus.OK).body(successMessages);
	}

}
