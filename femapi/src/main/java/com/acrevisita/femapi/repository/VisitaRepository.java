package com.acrevisita.femapi.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.acrevisita.femapi.models.EStatus;
import com.acrevisita.femapi.models.Visita;

import io.lettuce.core.dynamic.annotation.Param;

@Repository
public interface VisitaRepository extends JpaRepository<Visita, Long> {
    @Query("SELECT v FROM Visita v")
    Page<Visita> busca(String termoBusca, Pageable pageable);

    @Query("SELECT v FROM Visita v WHERE v.local.idSetor = :setorId AND v.status IN :statuses ORDER BY v.dataHoraAgendamento ASC")
    Page<Visita> findBySetorIdAndStatusIn(@Param("setorId") Long setorId, @Param("statuses") List<EStatus> statuses, Pageable pageable);
}
