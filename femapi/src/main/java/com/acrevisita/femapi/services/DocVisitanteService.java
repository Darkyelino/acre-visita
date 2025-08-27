package com.acrevisita.femapi.services;

import java.util.Optional;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.acrevisita.femapi.models.DocVisitante;
import com.acrevisita.femapi.repository.DocVisitanteRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class DocVisitanteService implements IService<DocVisitante> {

    private final DocVisitanteRepository repo;

    public DocVisitanteService(DocVisitanteRepository repo) {
        this.repo = repo;
    }

    @Override
    @Cacheable(
        value = "DocVisitante",
        condition = "#termoBusca == null or #termoBusca.isBlank()"
    )
    public Page<DocVisitante> get(String termoBusca, Pageable page) {
        if (termoBusca == null || termoBusca.isBlank()) {
            return repo.findAll(page);
        } else {
            return repo.busca(termoBusca, page);
        }
    }

    @Override
    @Cacheable(value = "DocVisitante", unless = "#result == null")
    public DocVisitante get(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    @Caching(evict = {
        @CacheEvict(value = "docVisitante", key = "#objeto.idDocumento"),
        @CacheEvict(value = "docVisitantes", allEntries = true)
    })
    public DocVisitante save(DocVisitante objeto) {
        return repo.save(objeto);
    }

    @Override
    @Caching(evict = {
        @CacheEvict(value = "docVisitante", key = "#id"),
        @CacheEvict(value = "docVisitantes", allEntries = true)
    })
    public void delete(Long id) {
        repo.deleteById(id);
    }

    public DocVisitante findById(Long id) {
        Optional<DocVisitante> docVisitante = repo.findById(id);

        if (docVisitante.isPresent()) {
            return docVisitante.get();
        } else {
            throw new EntityNotFoundException("DocVisitante com ID " + id + " não encontrado");
        }
    }
}