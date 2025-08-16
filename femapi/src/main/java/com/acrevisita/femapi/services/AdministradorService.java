package com.acrevisita.femapi.services;

import java.util.Optional;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.acrevisita.femapi.models.Administrador;
import com.acrevisita.femapi.repository.AdministradorRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class AdministradorService implements IService<Administrador> {

    private final AdministradorRepository repo;

    public AdministradorService(AdministradorRepository repo) {
        this.repo = repo;
    }

    @Override
    @Cacheable(
        value = "Administrador",
        condition = "#termoBusca == null or #termoBusca.isBlank()"
    )
    public Page<Administrador> get(String termoBusca, Pageable page) {
        if (termoBusca == null || termoBusca.isBlank()) {
            return repo.findAll(page);
        } else {
            return repo.busca(termoBusca, page);
        }
    }

    @Override
    @Cacheable(value = "Administrador", unless = "#result == null")
    public Administrador get(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    @Caching(evict = {
        @CacheEvict(value = "administrador", key = "#objeto.idAdministrador"),
        @CacheEvict(value = "administradores", allEntries = true)
    })
    public Administrador save(Administrador objeto) {
        return repo.save(objeto);
    }

    @Override
    @Caching(evict = {
        @CacheEvict(value = "administrador", key = "#id"),
        @CacheEvict(value = "administradores", allEntries = true)
    })
    public void delete(Long id) {
        repo.deleteById(id);
    }

    public Administrador findById(Long id) {
        Optional<Administrador> administrador = repo.findById(id);

        if (administrador.isPresent()) {
            return administrador.get();
        } else {
            throw new EntityNotFoundException("Administrador com ID " + id + " não encontrado");
        }
    }
}