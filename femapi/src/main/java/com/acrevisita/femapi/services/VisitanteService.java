package com.acrevisita.femapi.services;

import java.util.Optional;

import javax.security.auth.login.LoginException;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.acrevisita.femapi.models.Visitante;
import com.acrevisita.femapi.repository.DocVisitanteRepository;
import com.acrevisita.femapi.repository.VisitanteRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class VisitanteService implements IService<Visitante> {

    private final VisitanteRepository repo;
    private final DocVisitanteRepository docRepo;

    public VisitanteService(VisitanteRepository repo, DocVisitanteRepository docRepo) {
        this.repo = repo;
        this.docRepo = docRepo;
    }

    public Visitante login(String email, String senha) throws LoginException {
        // Busca o visitante pelo email
        Optional<Visitante> optVisitante = repo.findByEmailVisitante(email);

        if (optVisitante.isEmpty()) {
            throw new LoginException("Usuário não encontrado.");
        }

        Visitante visitante = optVisitante.get();

        // 🚨 AVISO DE SEGURANÇA:
        // Esta é uma comparação de senha em texto plano.
        // Em um projeto real, você DEVE usar um encoder como o BCrypt.
        // A senha no banco seria um hash e aqui você usaria:
        // if (passwordEncoder.matches(senha, visitante.getSenhaVisitante())) { ... }
        if (visitante.getSenhaVisitante().equals(senha)) {
            return visitante; // Login bem-sucedido
        } else {
            throw new LoginException("Senha inválida.");
        }
    }

    @Override
    @Cacheable(
        value = "visitante",
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
    @Cacheable(value = "visitante", unless = "#result == null")
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
        docRepo.findByVisitanteIdVisitante(id).ifPresent(docRepo::delete);
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