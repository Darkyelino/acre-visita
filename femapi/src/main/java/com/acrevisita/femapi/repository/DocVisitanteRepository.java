package com.acrevisita.femapi.repository;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.acrevisita.femapi.models.DocVisitante;

@Repository
public interface DocVisitanteRepository extends JpaRepository<DocVisitante, Long> {
    
    @Query("SELECT d FROM DocVisitante d WHERE d.numero LIKE %?1%")
    Page<DocVisitante> busca(String termoBusca, Pageable page);

    Optional<DocVisitante> findByUsuarioId(Long usuarioId);
}