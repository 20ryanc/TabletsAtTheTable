package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "taste")
public class Taste {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private Long id;
    @JsonProperty("taste")
    @NotBlank
    private String taste;

    public Taste() {
    }

    public Taste(String taste) {
        this.taste = taste;
    }

    public Long getId() {
        return id;
    }

    public String getTaste() {
        return taste;
    }
}
