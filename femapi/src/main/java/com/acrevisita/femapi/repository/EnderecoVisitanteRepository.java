package com.acrevisita.femapi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.acrevisita.femapi.models.EnderecoVisitante;

@Repository
public interface EnderecoVisitanteRepository extends JpaRepository<EnderecoVisitante, Long> {
    @Query("SELECT e FROM EnderecoVisitante e WHERE e.ruaVisitante LIKE %?1%")
    Page<EnderecoVisitante> busca(String termoBusca, Pageable page);
}