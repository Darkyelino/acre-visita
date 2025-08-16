package com.acrevisita.femapi.services;

import java.util.Optional;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.acrevisita.femapi.models.Setor;
import com.acrevisita.femapi.repository.SetorRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class SetorService implements IService<Setor> {

    private final SetorRepository repo;

    public SetorService(SetorRepository repo) {
        this.repo = repo;
    }

    @Override
    @Cacheable(
        value = "Setor",
        condition = "#termoBusca == null or #termoBusca.isBlank()"
    )
    public Page<Setor> get(String termoBusca, Pageable page) {
        if (termoBusca == null || termoBusca.isBlank()) {
            return repo.findAll(page);
        } else {
            return repo.busca(termoBusca, page);
        }
    }

    @Override
    @Cacheable(value = "Setor", unless = "#result == null")
    public Setor get(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    @Caching(evict = {
        @CacheEvict(value = "setor", key = "#objeto.idSetor"),
        @CacheEvict(value = "setores", allEntries = true)
    })
    public Setor save(Setor objeto) {
        return repo.save(objeto);
    }

    @Override
    @Caching(evict = {
        @CacheEvict(value = "setor", key = "#id"),
        @CacheEvict(value = "setores", allEntries = true)
    })
    public void delete(Long id) {
        repo.deleteById(id);
    }

    public Setor findById(Long id) {
        Optional<Setor> setor = repo.findById(id);

        if (setor.isPresent()) {
            return setor.get();
        } else {
            throw new EntityNotFoundException("Setor com ID " + id + " não encontrado");
        }
    }
}