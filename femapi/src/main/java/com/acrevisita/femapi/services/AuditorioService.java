package com.acrevisita.femapi.services;

import java.util.Optional;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.acrevisita.femapi.models.Auditorio;
import com.acrevisita.femapi.repository.AuditorioRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class AuditorioService implements IService<Auditorio> {

    private final AuditorioRepository repo;

    public AuditorioService(AuditorioRepository repo) {
        this.repo = repo;
    }

    @Override
    @Cacheable(
        value = "auditorio",
        condition = "#termoBusca == null or #termoBusca.isBlank()"
    )
    public Page<Auditorio> get(String termoBusca, Pageable page) {
        if (termoBusca == null || termoBusca.isBlank()) {
            return repo.findAll(page);
        } else {
            return repo.busca(termoBusca, page);
        }
    }

    @Override
    @Cacheable(value = "auditorio", unless = "#result == null")
    public Auditorio get(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    @Caching(evict = {
        @CacheEvict(value = "auditorio", key = "#objeto.idAuditorio"),
        @CacheEvict(value = "auditorios", allEntries = true)
    })
    public Auditorio save(Auditorio objeto) {
        return repo.save(objeto);
    }

    @Override
    @Caching(evict = {
        @CacheEvict(value = "auditorio", key = "#id"),
        @CacheEvict(value = "auditorios", allEntries = true)
    })
    public void delete(Long id) {
        repo.deleteById(id);
    }

    public Auditorio findById(Long id) {
        Optional<Auditorio> auditorio = repo.findById(id);

        if (auditorio.isPresent()) {
            return auditorio.get();
        } else {
            throw new EntityNotFoundException("Auditório com ID " + id + " não encontrado");
        }
    }
}