package com.acrevisita.femapi.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.acrevisita.femapi.models.ReservaAuditorio;
import com.acrevisita.femapi.repository.ReservaAuditorioRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.criteria.Predicate;

@Service
public class ReservaAuditorioService { // Não precisa mais implementar a interface genérica IService

    private final ReservaAuditorioRepository repo;

    public ReservaAuditorioService(ReservaAuditorioRepository repo) {
        this.repo = repo;
    }

    /**
     * NOVO MÉTODO DE BUSCA UNIFICADO
     * Utiliza Specifications para criar uma query dinâmica com base nos filtros fornecidos.
     * O cache é aplicado apenas quando nenhum filtro é usado, para guardar a lista principal.
     */
    @Cacheable(
        value = "reservaAuditorios",
        condition = "(#termo == null or #termo.isBlank()) and (#status == null or #status.isBlank())"
    )
    public Page<ReservaAuditorio> buscar(String termo, String status, Pageable pageable) {
        Specification<ReservaAuditorio> spec = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (termo != null && !termo.isBlank()) {
                predicates.add(criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("nomeEvento")),
                    "%" + termo.toLowerCase() + "%"
                ));
            }

            if (status != null && !status.isBlank()) {
                predicates.add(criteriaBuilder.equal(root.get("status"), status));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
        return repo.findAll(spec, pageable);
    }

    @Cacheable(value = "reservaAuditorio", key = "#id", unless = "#result == null")
    public ReservaAuditorio getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Caching(evict = {
        @CacheEvict(value = "reservaAuditorio", key = "#objeto.idReserva"),
        @CacheEvict(value = "reservaAuditorios", allEntries = true) // Limpa o cache da lista
    })
    public ReservaAuditorio save(ReservaAuditorio objeto) {
        return repo.save(objeto);
    }

    @Caching(evict = {
        @CacheEvict(value = "reservaAuditorio", key = "#id"),
        @CacheEvict(value = "reservaAuditorios", allEntries = true) // Limpa o cache da lista
    })
    public void delete(Long id) {
        repo.deleteById(id);
    }
    
    // Os métodos de negócio permanecem os mesmos
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
        return repo.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Reserva de Auditório com ID " + id + " não encontrada"));
    }
}