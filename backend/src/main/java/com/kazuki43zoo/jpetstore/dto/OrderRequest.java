package com.kazuki43zoo.jpetstore.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderRequest {

    private String username;
    private List<ItemRequest> items;
    private boolean isInStock;

    private String cardType;
    private String creditCard;
    private String expiryDate;
    private String shipToFirstName;
    private String shipToLastName;
    private String shipAddress1;
    private String shipAddress2;
    private String shipCity;
    private String shipState;
    private String shipZip;
    private String shipCountry;
}
