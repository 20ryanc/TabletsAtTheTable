package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Table(name = "order_element")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private Long id;
    @NotNull
    @JsonProperty("group_size")
    private Integer group_size;
    @JsonProperty("female")
    private Integer female;
    @JsonProperty("male")
    private Integer male;
    @JsonProperty("babies")
    private Integer babies;
    @JsonProperty("children")
    private Integer children;
    @JsonProperty("young_adults")
    private Integer young_adults;
    @JsonProperty("middle_age_adults")
    private Integer middle_age_adults;
    @JsonProperty("old_adults")
    private Integer old_adults;
    @JsonProperty("order_items")
    @ElementCollection
    private List<Long> order_items;

    public Order() {
    }

    public Order(Integer group_size, Integer female, Integer male, Integer babies, Integer children, Integer young_adults, Integer middle_age_adults, Integer old_adults, List<Long> order_items) {
        this.group_size = group_size;
        this.female = female;
        this.male = male;
        this.babies = babies;
        this.children = children;
        this.young_adults = young_adults;
        this.middle_age_adults = middle_age_adults;
        this.old_adults = old_adults;
        this.order_items = order_items;
    }

    public Long getId() {
        return id;
    }

    public Integer getGroup_size() {
        return group_size;
    }

    public Integer getFemale() {
        return female;
    }

    public Integer getMale() {
        return male;
    }

    public Integer getBabies() {
        return babies;
    }

    public Integer getChildren() {
        return children;
    }

    public Integer getYoung_adults() {
        return young_adults;
    }

    public Integer getMiddle_age_adults() {
        return middle_age_adults;
    }

    public Integer getOld_adults() {
        return old_adults;
    }

    public List<Long> getOrder_items() {
        return order_items;
    }
}
