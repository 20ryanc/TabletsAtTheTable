package com.example.demo.dao;

import com.example.demo.model.Taste;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TasteRepository extends JpaRepository<Taste, Long> {
    @Query(value = "SELECT e FROM Taste e Where e.taste = ?1")
    List<Taste> findTasteId(String taste);
}
