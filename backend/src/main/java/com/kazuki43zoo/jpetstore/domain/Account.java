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
package com.kazuki43zoo.jpetstore.domain;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

/**
 * @author Kazuki Shimizu
 */
@Getter
@Setter
public class Account implements Serializable {

	private static final long serialVersionUID = 8751282105532159742L;

	private String username;
	private String password;
	private String email;
	private String firstName;
	private String lastName;
	private String status;
	private String address1;
	private String address2;
	private String city;
	private String state;
	private String zip;
	private String country;
	private String phone;
	private String favouriteCategoryId;
	private String languagePreference;
	private boolean listOption;
	private boolean bannerOption;
	private String bannerName;

}
