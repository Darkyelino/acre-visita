package com.acrevisita.femapi.services;

import java.util.Optional;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.acrevisita.femapi.models.Feedback;
import com.acrevisita.femapi.repository.FeedbackRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class FeedbackService implements IService<Feedback> {

    private final FeedbackRepository repo;

    public FeedbackService(FeedbackRepository repo) {
        this.repo = repo;
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
    public Feedback save(Feedback objeto) {
        return repo.save(objeto);
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