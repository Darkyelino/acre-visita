package com.acrevisita.femapi.services;

import java.util.Optional;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.acrevisita.femapi.models.Coordenador;
import com.acrevisita.femapi.repository.CoordenadorRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class CoordenadorService implements IService<Coordenador> {

    private final CoordenadorRepository repo;

    public CoordenadorService(CoordenadorRepository repo) {
        this.repo = repo;
    }

    @Override
    @Cacheable(
        value = "Coordenador",
        condition = "#termoBusca == null or #termoBusca.isBlank()"
    )
    public Page<Coordenador> get(String termoBusca, Pageable page) {
        if (termoBusca == null || termoBusca.isBlank()) {
            return repo.findAll(page);
        } else {
            return repo.busca(termoBusca, page);
        }
    }

    @Override
    @Cacheable(value = "Coordenador", unless = "#result == null")
    public Coordenador get(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    @Caching(evict = {
        @CacheEvict(value = "coordenador", key = "#objeto.idCoordenador"),
        @CacheEvict(value = "coordenadores", allEntries = true)
    })
    public Coordenador save(Coordenador objeto) {
        return repo.save(objeto);
    }

    @Override
    @Caching(evict = {
        @CacheEvict(value = "coordenador", key = "#id"),
        @CacheEvict(value = "coordenadores", allEntries = true)
    })
    public void delete(Long id) {
        repo.deleteById(id);
    }

    public Coordenador findById(Long id) {
        Optional<Coordenador> coordenador = repo.findById(id);

        if (coordenador.isPresent()) {
            return coordenador.get();
        } else {
            throw new EntityNotFoundException("Coordenador com ID " + id + " não encontrado");
        }
    }
}