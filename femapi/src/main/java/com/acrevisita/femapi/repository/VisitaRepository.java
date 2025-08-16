package com.acrevisita.femapi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.acrevisita.femapi.models.Visita;

@Repository
public interface VisitaRepository extends JpaRepository<Visita, Long> {
    @Query("SELECT v FROM Visita v")
    Page<Visita> busca(String termoBusca, Pageable pageable);
}
