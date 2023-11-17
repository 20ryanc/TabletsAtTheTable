package com.example.demo.api;
import com.example.demo.model.Item;
import com.example.demo.model.Order;
import com.example.demo.model.OrderTmp;
import com.example.demo.service.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
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
    public void insertOrder(@RequestBody Map<String, String> body) {
        Integer group_size = Integer.parseInt(body.get("group_size"));
        Integer female = Integer.parseInt(body.get("female"));
        Integer male = Integer.parseInt(body.get("male"));
        Integer babies = Integer.parseInt(body.get("babies"));
        Integer children = Integer.parseInt(body.get("children"));
        Integer young_adults = Integer.parseInt(body.get("young_adults"));
        Integer middle_age_adults = Integer.parseInt(body.get("middle_age_adults"));
        Integer old_adults = Integer.parseInt(body.get("old_adults"));
        List<Long> order_items = new ArrayList<>();
        for (String str : body.get("items").split(",")) {
            order_items.add(Long.parseLong(str));
        }
        Order order = new Order(group_size, female, male, babies, children, young_adults, middle_age_adults, old_adults, order_items);
        service.addOrder(order);
    }

    @PostMapping("/InsertItem")
    public void insertEntry(@RequestBody Map<String, String> body) {
        String name = body.get("name");
        String category = body.get("category");
        String tastes = body.get("tastes");
        List<Long> tasteIds = new ArrayList<>();
        for (String taste : tastes.split(",")) {
            taste = taste.toLowerCase().strip();
            Optional<Long> ID = service.getTasteID(taste);
            if (!ID.isEmpty()) {
                tasteIds.add(ID.get());
            }
        }
        Item item = new Item(name, category, tasteIds);
        service.addItem(item);
    }

    @GetMapping("/getAllOrders")
    public List<OrderTmp> getAllOrders() {
        List<Order> currOrders = service.getAllOrders();
        List<OrderTmp> ret = new ArrayList<>();
        for (Order curr : currOrders) {
            OrderTmp temp = new OrderTmp(curr.getId(), curr.getGroup_size(), curr.getFemale(),
                    curr.getMale(), curr.getBabies(), curr.getChildren(), curr.getYoung_adults(),
                    curr.getMiddle_age_adults(), curr.getOld_adults(), service.getItemList(curr.getOrder_items()));
            ret.add(temp);
        }
        return ret;
    }

    @GetMapping("/getAllItems")
    public List<Item> getAllItems() {
        return service.getAllItems();
    }

    @PostMapping("/getRecommendation")
    public List<Item> getRecommendation(@RequestBody Map<String, String> body) {
        Integer group_size = Integer.parseInt(body.get("group_size"));
        Integer female = Integer.parseInt(body.get("female"));
        Integer male = Integer.parseInt(body.get("male"));
        Integer babies = Integer.parseInt(body.get("babies"));
        Integer children = Integer.parseInt(body.get("children"));
        Integer young_adults = Integer.parseInt(body.get("young_adults"));
        Integer middle_age_adults = Integer.parseInt(body.get("middle_age_adults"));
        Integer old_adults = Integer.parseInt(body.get("old_adults"));
        List<Item> order_items = new ArrayList<>();
        for (String str : body.get("items").split(",")) {
            Optional<Item> temp = service.getItem(Long.parseLong(str));
            if (!temp.isEmpty()) {
                order_items.add(temp.get());
            }
        }
        HashMap<Long, Integer> map = new HashMap<>();
        for (Item tmp : order_items) {
            for (Long id : tmp.getTastes()) {
                map.put(id, map.getOrDefault(id, 0) + 1);
            }
        }
        List<Item> all_items = service.getAllItems();
        all_items.removeAll(order_items);
        List<AbstractMap.SimpleEntry<Item, Integer>> score_list = new ArrayList<>();
        for (Item item : all_items) {
            Integer score = 0;
            for (Long id : item.getTastes()) {
                score += map.getOrDefault(id, 0);
            }
            score_list.add(new AbstractMap.SimpleEntry<>(item, score));
        }
        Collections.sort(score_list, (a, b)-> Integer.compare(b.getValue(), a.getValue()));
        List<Item> ret = new ArrayList<>();
        for(int i = 0; i < 5; i++){
            ret.add(score_list.get(i).getKey());
        }
        return ret;
    }
}
