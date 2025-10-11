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
import com.acrevisita.femapi.models.Usuario;
import com.acrevisita.femapi.models.Visita;
import com.acrevisita.femapi.repository.UsuarioRepository;
import com.acrevisita.femapi.repository.VisitaRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class VisitaService implements IService<Visita> {

    private final VisitaRepository repo;
    private final UsuarioRepository usuarioRepo;

    public VisitaService(VisitaRepository repo, UsuarioRepository usuarioRepo) {
        this.repo = repo;
        this.usuarioRepo = usuarioRepo;
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
        // Valida se o usuário está ativo antes de salvar
        Usuario usuario = usuarioRepo.findById(objeto.getUsuario().getId())
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado."));

        if (!usuario.isAtivo()) {
            throw new IllegalStateException("Usuário inativo não pode realizar ou agendar visitas.");
        }

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