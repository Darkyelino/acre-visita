package com.acrevisita.femapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import com.acrevisita.femapi.models.ReservaAuditorio;

@Repository
public interface ReservaAuditorioRepository extends JpaRepository<ReservaAuditorio, Long>, JpaSpecificationExecutor<ReservaAuditorio> {

}