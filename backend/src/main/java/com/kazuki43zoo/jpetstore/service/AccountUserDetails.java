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
package com.kazuki43zoo.jpetstore.service;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import com.kazuki43zoo.jpetstore.domain.Account;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;

/**
 * @author Kazuki Shimizu
 */
@Getter
@EqualsAndHashCode(callSuper = false)
public class AccountUserDetails extends User {

	private static final long serialVersionUID = -3065955491112229927L;
	private final Account account;

	AccountUserDetails(Account account) {
		super(account.getUsername(), account.getPassword(), AuthorityUtils.createAuthorityList("ROLE_USER"));
		this.account = account;
	}

}
