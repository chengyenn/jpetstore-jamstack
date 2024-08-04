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
import com.kazuki43zoo.jpetstore.domain.Item;
import com.kazuki43zoo.jpetstore.domain.Order;
import com.kazuki43zoo.jpetstore.dto.ItemRequest;
import com.kazuki43zoo.jpetstore.dto.OrderRequest;
import com.kazuki43zoo.jpetstore.service.AccountService;
import com.kazuki43zoo.jpetstore.service.CatalogService;
import com.kazuki43zoo.jpetstore.service.OrderService;
import com.kazuki43zoo.jpetstore.ui.Cart;
import com.kazuki43zoo.jpetstore.ui.CartItem;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
  private final CatalogService catalogService;
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

//  @PostMapping(path = "/create", params = "continue")
//  public String createContinue(@RequestBody @Validated OrderForm form, BindingResult result, Model model) {
//    if (result.hasErrors()) {
//      model.addAttribute(newValidationErrorMessages());
//      return "order/orderBasicForm";
//    }
//    if (form.isShippingAddressRequired()) {
//      return "order/orderShippingForm";
//    } else {
//      return "order/orderConfirm";
//    }
//  }

//  @PostMapping(path = "/create", params = "confirm")
//  public String createConfirm(@Validated OrderForm form, BindingResult result, Model model) {
//    if (result.hasErrors()) {
//      model.addAttribute(newValidationErrorMessages());
//      return "order/orderShippingForm";
//    }
//    return "order/orderConfirm";
//  }


  // cart 傳進來的地方
  @PostMapping("/create")
  public ResponseEntity<Map<String, Object>> create(
          @RequestBody OrderRequest orderRequest,
          SessionStatus sessionStatus) {

    // 處理 items
    for (ItemRequest itemRequest : orderRequest.getItems()) {
      Item item = catalogService.getItem(itemRequest.getItemId());
      if (!cart.containsByItemId(item.getItemId())) {
        cart.addItem(item, orderRequest.isInStock());
      }
      cart.setQuantityByItemId(item.getItemId(), itemRequest.getQty());
    }

    Account account = accountService.findByUsername(orderRequest.getUsername());

    // 創建 Order 對象
    Order order = new Order();
    order.setUsername(account.getUsername());
    order.setOrderDate(LocalDateTime.now());
    order.setCourier("UPS");
    order.setLocale("CA");
    order.setStatus("P");

    // 設置地址字段和其他必需字段
    order.setShipAddress1(orderRequest.getShipAddress1());
    order.setShipAddress2(orderRequest.getShipAddress2());
    order.setShipCity(orderRequest.getShipCity());
    order.setShipState(orderRequest.getShipState());
    order.setShipZip(orderRequest.getShipZip());
    order.setShipCountry(orderRequest.getShipCountry());

    order.setBillAddress1(account.getAddress1());
    order.setBillAddress2(account.getAddress2());
    order.setBillCity(account.getCity());
    order.setBillState(account.getState());
    order.setBillZip(account.getZip());
    order.setBillCountry(account.getCountry());

    order.setBillToFirstName(account.getFirstName());
    order.setBillToLastName(account.getLastName());
    order.setShipToFirstName(orderRequest.getShipToFirstName());
    order.setShipToLastName(orderRequest.getShipToLastName());

    order.setCreditCard(orderRequest.getCreditCard());
    order.setExpiryDate(orderRequest.getExpiryDate());
    order.setCardType(orderRequest.getCardType());

    // 設置訂單行
    order.setLines(cart.getCartItems().stream().map(CartItem::toOrderLine).collect(Collectors.toList()));

    // 使用 Cart 的 getSubTotal 方法計算總價並設置
    order.setTotalPrice(cart.getSubTotal());

    orderService.createOrder(order, account);

    // 清空購物車
    cart.clear();
    sessionStatus.setComplete();

    // 準備返回的 body
    Map<String, Object> responseBody = new HashMap<>();
    responseBody.put("orderId", order.getOrderId());

    return ResponseEntity.status(HttpStatus.OK).body(responseBody);
  }


  @GetMapping
  @ResponseBody
  public List<Order> viewOrders(@RequestParam("username") String username) {
    Account account = accountService.findByUsername(username);
    List<Order> orderList = orderService.getOrdersByUsername(account.getUsername());
    return orderList;
  }

  @GetMapping("/{orderId}")
  public ResponseEntity<Order> viewOrder(@RequestParam String username, @PathVariable int orderId) {
    Order order = orderService.getOrder(username, orderId);
    return ResponseEntity.ok(order);
  }

  private Messages newValidationErrorMessages() {
    return new Messages().error("Input values are invalid. Please confirm error messages.");
  }

}
