package com.acrevisita.femapi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.acrevisita.femapi.models.ReservaAuditorio;

@Repository
public interface ReservaAuditorioRepository extends JpaRepository<ReservaAuditorio, Long> {
    
    @Query("SELECT r FROM ReservaAuditorio r WHERE r.nomeEvento LIKE %?1%")
    Page<ReservaAuditorio> busca(String termoBusca, Pageable page);

    Page<ReservaAuditorio> findByStatus(String status, Pageable page);
}
