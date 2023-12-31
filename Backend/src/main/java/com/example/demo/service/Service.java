package com.example.demo.service;

import com.example.demo.dao.ItemRepository;
import com.example.demo.dao.OrderRepository;
import com.example.demo.dao.TasteRepository;
import com.example.demo.model.Item;
import com.example.demo.model.Order;
import com.example.demo.model.Taste;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@org.springframework.stereotype.Service
public class Service {
    private OrderRepository orderRepository;
    private ItemRepository itemRepository;
    private TasteRepository tasteRepository;

    @Autowired
    public Service(OrderRepository orderRepository, ItemRepository itemRepository, TasteRepository tasteRepository) {
        this.orderRepository = orderRepository;
        this.itemRepository = itemRepository;
        this.tasteRepository = tasteRepository;
    }

    public Optional<Order> getOrder(Long id){
        return orderRepository.findById(id);
    }

    public void addOrder(Order order){
        orderRepository.save(order);
    }
    public void removeOrder(Long id){
        orderRepository.deleteById(id);
    }
    @Transactional
    public List<Order> getAllOrders(){
        return orderRepository.findAll();
    }

    public Optional<Item> getItem(Long id) {
        return itemRepository.findById(id);
    }
    public void addItem(Item item){
        itemRepository.save(item);
    }
    public void removeItem(Long id){
        itemRepository.deleteById(id);
    }
    @Transactional
    public List<Item> getAllItems(){
        return itemRepository.findAllByOrderByIdAsc();
    }
    @Transactional
    public List<Item> getItemList(List<Long> ids){
        List<Item> ret = new ArrayList<>();
        for(Long id : ids){
            Optional<Item> temp = this.getItem(id);
            if(!temp.isEmpty()){
                ret.add(temp.get());
            }
        }
        return ret;
    }

    public Optional<Long> getTasteID(String taste){
        List<Taste> tasteId = tasteRepository.findTasteId(taste);
        Optional<Long> ret;
        if(tasteId.isEmpty()){
            ret = Optional.empty();
        }else{
            ret = Optional.of(tasteId.get(0).getId());
        }
        return ret;
    }


}
