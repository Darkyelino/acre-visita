package com.acrevisita.femapi.services;

import java.util.Optional;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.acrevisita.femapi.models.Visitante;
import com.acrevisita.femapi.repository.VisitanteRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class VisitanteService implements IService<Visitante> {

    private final VisitanteRepository repo;

    public VisitanteService(VisitanteRepository repo) {
        this.repo = repo;
    }

    @Override
    @Cacheable(
        value = "Visitante",
        condition = "#termoBusca == null or #termoBusca.isBlank()"
    )
    public Page<Visitante> get(String termoBusca, Pageable page) {
        if (termoBusca == null || termoBusca.isBlank()) {
            return repo.findAll(page);
        } else {
            return repo.busca(termoBusca, page);
        }
    }

    @Override
    @Cacheable(value = "Visitante", unless = "#result == null")
    public Visitante get(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    @Caching(evict = {
        @CacheEvict(value = "visitante", key = "#objeto.idVisitante"),
        @CacheEvict(value = "visitantes", allEntries = true)
    })
    public Visitante save(Visitante objeto) {
        return repo.save(objeto);
    }

    @Override
    @Caching(evict = {
        @CacheEvict(value = "visitante", key = "#id"),
        @CacheEvict(value = "visitantes", allEntries = true)
    })
    public void delete(Long id) {
        repo.deleteById(id);
    }

    public Visitante findById(Long id) {
        Optional<Visitante> visitante = repo.findById(id);

        if (visitante.isPresent()) {
            return visitante.get();
        } else {
            throw new EntityNotFoundException("Visitante com ID " + id + " não encontrado");
        }
    }
}