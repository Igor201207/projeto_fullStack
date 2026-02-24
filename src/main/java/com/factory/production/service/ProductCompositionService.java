package com.factory.production.service;

import com.factory.production.entity.ProductComposition;
import com.factory.production.repository.ProductCompositionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductCompositionService {

    private final ProductCompositionRepository repository;

    public ProductCompositionService(ProductCompositionRepository repository) {
        this.repository = repository;
    }

    public List<ProductComposition> findAll() {
        return repository.findAll();
    }

    public ProductComposition save(ProductComposition composition) {
        return repository.save(composition);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}