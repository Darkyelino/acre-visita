package com.acrevisita.femapi.services;

import java.util.Optional;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.acrevisita.femapi.models.Feedback;
import com.acrevisita.femapi.models.Usuario;
import com.acrevisita.femapi.models.Visita;
import com.acrevisita.femapi.repository.FeedbackRepository;
import com.acrevisita.femapi.repository.UsuarioRepository;
import com.acrevisita.femapi.repository.VisitaRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class FeedbackService implements IService<Feedback> {

    private final FeedbackRepository repo;
    private final UsuarioRepository usuarioRepo;
    private final VisitaRepository visitaRepo;

    public FeedbackService(FeedbackRepository repo, UsuarioRepository usuarioRepo, VisitaRepository visitaRepo) {
        this.repo = repo;
        this.usuarioRepo = usuarioRepo;
        this.visitaRepo = visitaRepo;
    }

    @Override
    @Cacheable(
        value = "feedback",
        condition = "#termoBusca == null or #termoBusca.isBlank()"
    )
    public Page<Feedback> get(String termoBusca, Pageable page) {
        if (termoBusca == null || termoBusca.isBlank()) {
            return repo.findAll(page);
        } else {
            return repo.busca(termoBusca, page);
        }
    }

    @Override
    @Cacheable(value = "feedback", unless = "#result == null")
    public Feedback get(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    @Caching(evict = {
        @CacheEvict(value = "feedback", key = "#objeto.idFeedback"),
        @CacheEvict(value = "feedbacks", allEntries = true)
    })
    public Feedback save(Feedback feedback) {
        // Valida e busca o Usuário
        Long usuarioId = feedback.getUsuario().getId();
        Usuario usuarioManaged = usuarioRepo.findById(usuarioId)
                .orElseThrow(() -> new EntityNotFoundException("Usuário com ID " + usuarioId + " não encontrado."));
        
        // Valida e busca a Visita
        Long visitaId = feedback.getVisita().getIdVisita();
        Visita visitaManaged = visitaRepo.findById(visitaId)
                .orElseThrow(() -> new EntityNotFoundException("Visita com ID " + visitaId + " não encontrada."));
                
        feedback.setUsuario(usuarioManaged);
        feedback.setVisita(visitaManaged);

        return repo.save(feedback);
    }

    @Override
    @Caching(evict = {
        @CacheEvict(value = "feedback", key = "#id"),
        @CacheEvict(value = "feedbacks", allEntries = true)
    })
    public void delete(Long id) {
        repo.deleteById(id);
    }

    public Feedback findById(Long id) {
        Optional<Feedback> feedback = repo.findById(id);

        if (feedback.isPresent()) {
            return feedback.get();
        } else {
            throw new EntityNotFoundException("Feedback com ID " + id + " não encontrado");
        }
    }
}