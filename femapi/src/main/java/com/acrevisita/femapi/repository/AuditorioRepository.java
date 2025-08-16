package com.acrevisita.femapi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.acrevisita.femapi.models.Auditorio;

@Repository
public interface AuditorioRepository extends JpaRepository<Auditorio, Long> {
    @Query("SELECT au FROM Auditorio au WHERE au.nomeAuditorio LIKE %?1%")
    Page<Auditorio> busca(String termoBusca, Pageable page);
}
