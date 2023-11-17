package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Entity
@Table(name = "item")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private Long id;
    @JsonProperty("name")
    private String name;
    @JsonProperty("category")
    @NotBlank
    private String category;
    @JsonProperty("tastes")
    @ElementCollection
    private List<Long> tastes;

    public Item() {
    }

    public Item(String name, String category, List<Long> tastes) {
        this.name = name;
        this.category = category;
        this.tastes = tastes;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public java.lang.String getCategory() {
        return category;
    }

    public List<Long> getTastes() {
        return tastes;
    }
}
