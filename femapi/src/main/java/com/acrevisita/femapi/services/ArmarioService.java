package com.acrevisita.femapi.services;

import java.util.Optional;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.acrevisita.femapi.models.Armario;
import com.acrevisita.femapi.repository.ArmarioRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ArmarioService implements IService<Armario> {

    private final ArmarioRepository repo;

    public ArmarioService(ArmarioRepository repo) {
        this.repo = repo;
    }

    @Override
    @Cacheable(
        value = "Armario",
        condition = "#termoBusca == null or #termoBusca.isBlank()"
    )
    public Page<Armario> get(String termoBusca, Pageable page) {
        if (termoBusca == null || termoBusca.isBlank()) {
            return repo.findAll(page);
        } else {
            return repo.busca(termoBusca, page);
        }
    }

    @Override
    @Cacheable(value = "Armario", unless = "#result == null")
    public Armario get(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    @Caching(evict = {
        @CacheEvict(value = "armario", key = "#objeto.idArmario"),
        @CacheEvict(value = "armarios", allEntries = true)
    })
    public Armario save(Armario objeto) {
        return repo.save(objeto);
    }

    @Override
    @Caching(evict = {
        @CacheEvict(value = "armario", key = "#id"),
        @CacheEvict(value = "armarios", allEntries = true)
    })
    public void delete(Long id) {
        repo.deleteById(id);
    }

    public Armario findById(Long id) {
        Optional<Armario> armario = repo.findById(id);

        if (armario.isPresent()) {
            return armario.get();
        } else {
            throw new EntityNotFoundException("Armário com ID " + id + " não encontrado");
        }
    }
}