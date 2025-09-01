package com.acrevisita.femapi.services;

import java.util.Optional;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.acrevisita.femapi.models.Filmoteca;
import com.acrevisita.femapi.repository.FilmotecaRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class FilmotecaService implements IService<Filmoteca> {

    private final FilmotecaRepository repo;

    public FilmotecaService(FilmotecaRepository repo) {
        this.repo = repo;
    }

    @Override
    @Cacheable(
        value = "filmoteca",
        condition = "#termoBusca == null or #termoBusca.isBlank()"
    )
    public Page<Filmoteca> get(String termoBusca, Pageable page) {
        if (termoBusca == null || termoBusca.isBlank()) {
            return repo.findAll(page);
        } else {
            return repo.busca(termoBusca, page);
        }
    }

    @Override
    @Cacheable(value = "filmoteca", unless = "#result == null")
    public Filmoteca get(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    @Caching(evict = {
        @CacheEvict(value = "filmoteca", key = "#objeto.idFilmoteca"),
        @CacheEvict(value = "filmotecas", allEntries = true)
    })
    public Filmoteca save(Filmoteca objeto) {
        return repo.save(objeto);
    }

    @Override
    @Caching(evict = {
        @CacheEvict(value = "filmoteca", key = "#id"),
        @CacheEvict(value = "filmotecas", allEntries = true)
    })
    public void delete(Long id) {
        repo.deleteById(id);
    }

    public Filmoteca findById(Long id) {
        Optional<Filmoteca> filmoteca = repo.findById(id);

        if (filmoteca.isPresent()) {
            return filmoteca.get();
        } else {
            throw new EntityNotFoundException("Filmoteca com ID " + id + " não encontrada");
        }
    }
}