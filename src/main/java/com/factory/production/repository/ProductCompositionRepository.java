package com.factory.production.repository;

import com.factory.production.entity.ProductComposition;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductCompositionRepository extends JpaRepository<ProductComposition, Long> {
}