package com.acrevisita.femapi.services;

import java.util.Optional;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.acrevisita.femapi.models.EnderecoVisitante;
import com.acrevisita.femapi.repository.EnderecoVisitanteRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class EnderecoVisitanteService implements IService<EnderecoVisitante> {

    private final EnderecoVisitanteRepository repo;

    public EnderecoVisitanteService(EnderecoVisitanteRepository repo) {
        this.repo = repo;
    }

    @Override
    @Cacheable(
        value = "EnderecoVisitante",
        condition = "#termoBusca == null or #termoBusca.isBlank()"
    )
    public Page<EnderecoVisitante> get(String termoBusca, Pageable page) {
        if (termoBusca == null || termoBusca.isBlank()) {
            return repo.findAll(page);
        } else {
            return repo.busca(termoBusca, page);
        }
    }

    @Override
    @Cacheable(value = "EnderecoVisitante", unless = "#result == null")
    public EnderecoVisitante get(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    @Caching(evict = {
        @CacheEvict(value = "enderecoVisitante", key = "#objeto.idEnderecoVisitante"),
        @CacheEvict(value = "enderecosVisitantes", allEntries = true)
    })
    public EnderecoVisitante save(EnderecoVisitante objeto) {
        return repo.save(objeto);
    }

    @Override
    @Caching(evict = {
        @CacheEvict(value = "enderecoVisitante", key = "#id"),
        @CacheEvict(value = "enderecosVisitantes", allEntries = true)
    })
    public void delete(Long id) {
        repo.deleteById(id);
    }

    public EnderecoVisitante findById(Long id) {
        Optional<EnderecoVisitante> endereco = repo.findById(id);

        if (endereco.isPresent()) {
            return endereco.get();
        } else {
            throw new EntityNotFoundException("Endereço de visitante com ID " + id + " não encontrado");
        }
    }
}
