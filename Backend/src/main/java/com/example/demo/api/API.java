package com.example.demo.api;
import com.example.demo.model.Item;
import com.example.demo.model.Order;
import com.example.demo.model.OrderTmp;
import com.example.demo.service.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1")
public class API {
    private final Service service;

    @Autowired
    public API(Service service) {
        this.service = service;
    }

    @PostMapping("/InsertOrder")
    public void insertOrder(@RequestBody Map<String, String> body){
        Integer group_size = Integer.parseInt(body.get("group_size"));
        Integer female = Integer.parseInt(body.get("female"));
        Integer male = Integer.parseInt(body.get("male"));
        Integer babies = Integer.parseInt(body.get("babies"));
        Integer children = Integer.parseInt(body.get("children"));
        Integer young_adults = Integer.parseInt(body.get("young_adults"));
        Integer middle_age_adults = Integer.parseInt(body.get("middle_age_adults"));
        Integer old_adults = Integer.parseInt(body.get("old_adults"));
        List<Long> order_items = new ArrayList<>();
        for(String str: body.get("items").split(",")){
            order_items.add(Long.parseLong(str));
        }
        Order order = new Order(group_size,female,male,babies,children,young_adults,middle_age_adults,old_adults,order_items);
        service.addOrder(order);
    }

    @PostMapping("/InsertItem")
    public void insertEntry(@RequestBody Map<String, String> body){
        String name = body.get("name");
        String category = body.get("category");
        Double price = Double.parseDouble(body.get("price"));
        Item item = new Item(name, category, price);
        service.addItem(item);
    }

    @GetMapping("/getAllOrders")
    public List<OrderTmp> getAllOrders(){
        List<Order> currOrders = service.getAllOrders();
        List<OrderTmp> ret = new ArrayList<>();
        for(Order curr : currOrders){
            OrderTmp temp = new OrderTmp(curr.getId(), curr.getGroup_size(), curr.getFemale(),
                    curr.getMale(), curr.getBabies(), curr.getChildren(), curr.getYoung_adults(),
                    curr.getMiddle_age_adults(), curr.getOld_adults(), service.getItemList(curr.getOrder_items()));
            ret.add(temp);
        }
        return ret;
    }

    @GetMapping("/getAllItems")
    public List<Item> getAllItems(){
        return service.getAllItems();
    }

}
