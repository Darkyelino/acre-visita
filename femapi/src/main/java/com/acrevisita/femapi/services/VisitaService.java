package com.acrevisita.femapi.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.acrevisita.femapi.models.EStatus;
import com.acrevisita.femapi.models.Visita;
import com.acrevisita.femapi.repository.VisitaRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class VisitaService implements IService<Visita> {

    private final VisitaRepository repo;

    public VisitaService(VisitaRepository repo) {
        this.repo = repo;
    }

    public Page<Visita> findBySetorAndStatus(Long setorId, List<EStatus> statuses, Pageable pageable) {
        return repo.findBySetorIdAndStatusIn(setorId, statuses, pageable);
    }

    public Visita atualizarStatus(Long visitaId, EStatus novoStatus) {
        Visita visita = repo.findById(visitaId)
                .orElseThrow(() -> new EntityNotFoundException("Visita com ID " + visitaId + " não encontrada."));
        
        visita.setStatus(novoStatus);

        // Se o status for CONFIRMADA, preenche a data de entrada e limpa o agendamento
        if (novoStatus == EStatus.CONFIRMADA) {
            visita.setDataHoraEntrada(LocalDateTime.now());
            visita.setDataHoraAgendamento(null); // Opcional: limpa o agendamento após a confirmação
        }

        return repo.save(visita);
    }

    @Override
    @Cacheable(
        value = "visita",
        condition = "#termoBusca == null or #termoBusca.isBlank()"
    )
    public Page<Visita> get(String termoBusca, Pageable page) {
        if (termoBusca == null || termoBusca.isBlank()) {
            return repo.findAll(page);
        } else {
            return repo.busca(termoBusca, page);
        }
    }

    @Override
    @Cacheable(value = "visita", unless = "#result == null")
    public Visita get(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    @Caching(evict = {
        @CacheEvict(value = "visita", key = "#objeto.idVisita"),
        @CacheEvict(value = "visitas", allEntries = true)
    })
    public Visita save(Visita objeto) {
        return repo.save(objeto);
    }

    @Override
    @Caching(evict = {
        @CacheEvict(value = "visita", key = "#id"),
        @CacheEvict(value = "visitas", allEntries = true)
    })
    public void delete(Long id) {
        repo.deleteById(id);
    }

    public Visita findById(Long id) {
        Optional<Visita> visita = repo.findById(id);

        if (visita.isPresent()) {
            return visita.get();
        } else {
            throw new EntityNotFoundException("Visita com ID " + id + " não encontrada");
        }
    }
}