package com.acrevisita.femapi.services;

import java.util.Optional;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.acrevisita.femapi.models.Atendente;
import com.acrevisita.femapi.repository.AtendenteRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class AtendenteService implements IService<Atendente> {

    private final AtendenteRepository repo;

    public AtendenteService(AtendenteRepository repo) {
        this.repo = repo;
    }

    @Override
    @Cacheable(
        value = "atendente",
        condition = "#termoBusca == null or #termoBusca.isBlank()"
    )
    public Page<Atendente> get(String termoBusca, Pageable page) {
        if (termoBusca == null || termoBusca.isBlank()) {
            return repo.findAll(page);
        } else {
            return repo.busca(termoBusca, page);
        }
    }

    @Override
    @Cacheable(value = "atendente", unless = "#result == null")
    public Atendente get(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    @Caching(evict = {
        @CacheEvict(value = "atendente", key = "#objeto.idAtendente"),
        @CacheEvict(value = "atendentes", allEntries = true)
    })
    public Atendente save(Atendente objeto) {
        return repo.save(objeto);
    }

    @Override
    @Caching(evict = {
        @CacheEvict(value = "atendente", key = "#id"),
        @CacheEvict(value = "atendentes", allEntries = true)
    })
    public void delete(Long id) {
        repo.deleteById(id);
    }

    public Atendente findById(Long id) {
        Optional<Atendente> atendente = repo.findById(id);

        if (atendente.isPresent()) {
            return atendente.get();
        } else {
            throw new EntityNotFoundException("Atendente com ID " + id + " não encontrado");
        }
    }
}