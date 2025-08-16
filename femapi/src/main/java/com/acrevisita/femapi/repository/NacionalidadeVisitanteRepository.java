package com.acrevisita.femapi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.acrevisita.femapi.models.NacionalidadeVisitante;

@Repository
public interface NacionalidadeVisitanteRepository extends JpaRepository<NacionalidadeVisitante, Long> {
    @Query("SELECT n FROM NacionalidadeVisitante n")
    Page<NacionalidadeVisitante> busca(String termoBusca, Pageable pageable);
}
