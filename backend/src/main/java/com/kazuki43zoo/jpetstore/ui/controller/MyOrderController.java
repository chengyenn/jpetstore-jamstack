/*
 *    Copyright 2016-2021 the original author or authors.
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
import com.kazuki43zoo.jpetstore.domain.Account;
import com.kazuki43zoo.jpetstore.domain.Order;
import com.kazuki43zoo.jpetstore.service.AccountService;
import com.kazuki43zoo.jpetstore.service.OrderService;
import com.kazuki43zoo.jpetstore.ui.Cart;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

/**
 * @author Kazuki Shimizu
 */
//@SessionAttributes("orderForm")
@RequestMapping("/my/orders")
@Controller
@RequiredArgsConstructor
public class MyOrderController {

  private final OrderService orderService;
  private final AccountService accountService;
  private final Cart cart;

  @ModelAttribute("orderForm")
  public OrderForm setUpForm() {
    return new OrderForm();
  }

//  @GetMapping(path = "/create", params = "form")
//  public String createForm(OrderForm form, @RequestParam("username") String username) {
//    Account account = accountService.findByUsername(username);
//
//    if (cart.isEmpty()) {
//      return "redirect:/cart";
//    }
//    form.initialize(account);
//    return "order/orderBasicForm";
//  }

  @GetMapping(path = "/create", params = "form")
  public ResponseEntity<AccountForm> createForm(@RequestParam("username") String username) {
    Account account = accountService.findByUsername(username);
    if (account == null) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
    AccountForm form = new AccountForm();
    BeanUtils.copyProperties(account, form, "password");
    return ResponseEntity.ok(form);
  }

  @PostMapping(path = "/create", params = "continue")
  public String createContinue(@RequestBody @Validated OrderForm form, BindingResult result, Model model) {
    if (result.hasErrors()) {
      model.addAttribute(newValidationErrorMessages());
      return "order/orderBasicForm";
    }
    if (form.isShippingAddressRequired()) {
      return "order/orderShippingForm";
    } else {
      return "order/orderConfirm";
    }
  }

  @PostMapping(path = "/create", params = "confirm")
  public String createConfirm(@Validated OrderForm form, BindingResult result, Model model) {
    if (result.hasErrors()) {
      model.addAttribute(newValidationErrorMessages());
      return "order/orderShippingForm";
    }
    return "order/orderConfirm";
  }


  // cart 傳進來的地方
  @PostMapping("/create")
  public String create(@Validated @ModelAttribute(binding = false) OrderForm form,
//                       BindingResult result,
                       @RequestBody String username,
                       RedirectAttributes redirectAttributes, SessionStatus sessionStatus) {
//    if (cart.isEmpty()) {
//      return "redirect:/cart";
//    }

//    if (result.hasErrors()) {
//      redirectAttributes.addFlashAttribute(newValidationErrorMessages());
//      return "redirect:/my/orders/create?from";
//    }

    // @RequestBody 要傳一個 itemIds Array 近來，接下來做 for 去執行下面兩個動作
    // Item item = catalogService.getItem(itemId);
    // cart.addItem(item, isInStock);
    Account account = accountService.findByUsername(username);
    Order order = form.toOrder(cart);
    orderService.createOrder(order, account);

    redirectAttributes.addFlashAttribute(
        new Messages().success("Thank you, your order has been submitted."));

    redirectAttributes.addAttribute("orderId", order.getOrderId());

    cart.clear();
    sessionStatus.setComplete();

    return "redirect:/my/orders/{orderId}";
  }


  @GetMapping
  public String viewOrders(@AuthenticationPrincipal(expression = "account") Account account, Model model) {
    List<Order> orderList = orderService.getOrdersByUsername(account.getUsername());
    model.addAttribute(orderList);
    return "order/orders";
  }

  @GetMapping("/{orderId}")
  public String viewOrder(@AuthenticationPrincipal(expression = "account") Account account, @PathVariable int orderId, Model model) {
    Order order = orderService.getOrder(account.getUsername(), orderId);
    model.addAttribute(order);
    return "order/order";
  }

  private Messages newValidationErrorMessages() {
    return new Messages().error("Input values are invalid. Please confirm error messages.");
  }

}
