package com.acrevisita.femapi.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.acrevisita.femapi.models.Visitante;

@Repository
public interface VisitanteRepository extends JpaRepository<Visitante, Long> {
    @Query("SELECT v FROM Visitante v WHERE v.nomeVisitante LIKE %?1%")
    Page<Visitante> busca(String termoBusca, Pageable page);
}
