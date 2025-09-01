package com.acrevisita.femapi.services;

import java.util.Optional;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.acrevisita.femapi.models.ReservaAuditorio;
import com.acrevisita.femapi.repository.ReservaAuditorioRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ReservaAuditorioService implements IService<ReservaAuditorio> {

    private final ReservaAuditorioRepository repo;

    public ReservaAuditorioService(ReservaAuditorioRepository repo) {
        this.repo = repo;
    }

    @Override
    @Cacheable(
        value = "reservaAuditorio",
        condition = "#termoBusca == null or #termoBusca.isBlank()"
    )
    public Page<ReservaAuditorio> get(String termoBusca, Pageable page) {
        if (termoBusca == null || termoBusca.isBlank()) {
            return repo.findAll(page);
        } else {
            return repo.busca(termoBusca, page);
        }
    }
    
    public Page<ReservaAuditorio> getByStatus(String status, Pageable page) {
        return repo.findByStatus(status, page);
    }

    @Override
    @Cacheable(value = "reservaAuditorio", unless = "#result == null")
    public ReservaAuditorio get(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    @Caching(evict = {
        @CacheEvict(value = "reservaAuditorio", key = "#objeto.idReserva"),
        @CacheEvict(value = "reservaAuditorios", allEntries = true)
    })
    public ReservaAuditorio save(ReservaAuditorio objeto) {
        return repo.save(objeto);
    }

    @Override
    @Caching(evict = {
        @CacheEvict(value = "reservaAuditorio", key = "#id"),
        @CacheEvict(value = "reservaAuditorios", allEntries = true)
    })
    public void delete(Long id) {
        repo.deleteById(id);
    }
    
    public ReservaAuditorio aprovar(Long id) {
        ReservaAuditorio reserva = findById(id);
        reserva.setStatus("APROVADA");
        return save(reserva);
    }

    public ReservaAuditorio recusar(Long id) {
        ReservaAuditorio reserva = findById(id);
        reserva.setStatus("RECUSADA");
        return save(reserva);
    }

    public ReservaAuditorio findById(Long id) {
        Optional<ReservaAuditorio> reserva = repo.findById(id);

        if (reserva.isPresent()) {
            return reserva.get();
        } else {
            throw new EntityNotFoundException("Reserva de Auditório com ID " + id + " não encontrada");
        }
    }
}
