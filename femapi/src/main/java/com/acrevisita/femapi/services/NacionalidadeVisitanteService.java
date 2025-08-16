package com.acrevisita.femapi.services;

import java.util.Optional;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.acrevisita.femapi.models.NacionalidadeVisitante;
import com.acrevisita.femapi.repository.NacionalidadeVisitanteRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class NacionalidadeVisitanteService implements IService<NacionalidadeVisitante> {

    private final NacionalidadeVisitanteRepository repo;

    public NacionalidadeVisitanteService(NacionalidadeVisitanteRepository repo) {
        this.repo = repo;
    }

    @Override
    @Cacheable(
        value = "NacionalidadeVisitante",
        condition = "#termoBusca == null or #termoBusca.isBlank()"
    )
    public Page<NacionalidadeVisitante> get(String termoBusca, Pageable page) {
        if (termoBusca == null || termoBusca.isBlank()) {
            return repo.findAll(page);
        } else {
            return repo.busca(termoBusca, page);
        }
    }

    @Override
    @Cacheable(value = "NacionalidadeVisitante", unless = "#result == null")
    public NacionalidadeVisitante get(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    @Caching(evict = {
        @CacheEvict(value = "nacionalidadeVisitante", key = "#objeto.idNacionalidade"),
        @CacheEvict(value = "nacionalidadesVisitantes", allEntries = true)
    })
    public NacionalidadeVisitante save(NacionalidadeVisitante objeto) {
        return repo.save(objeto);
    }

    @Override
    @Caching(evict = {
        @CacheEvict(value = "nacionalidadeVisitante", key = "#id"),
        @CacheEvict(value = "nacionalidadesVisitantes", allEntries = true)
    })
    public void delete(Long id) {
        repo.deleteById(id);
    }

    public NacionalidadeVisitante findById(Long id) {
        Optional<NacionalidadeVisitante> nacionalidade = repo.findById(id);

        if (nacionalidade.isPresent()) {
            return nacionalidade.get();
        } else {
            throw new EntityNotFoundException("Nacionalidade com ID " + id + " não encontrada");
        }
    }
}