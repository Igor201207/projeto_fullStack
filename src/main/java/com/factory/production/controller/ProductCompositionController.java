package com.factory.production.controller;

import com.factory.production.entity.ProductComposition;
import com.factory.production.service.ProductCompositionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/compositions")
public class ProductCompositionController {

    private final ProductCompositionService service;

    public ProductCompositionController(ProductCompositionService service) {
        this.service = service;
    }

    @GetMapping
    public List<ProductComposition> findAll() {
        return service.findAll();
    }

    @PostMapping
    public ProductComposition create(@RequestBody ProductComposition composition) {
        return service.save(composition);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}