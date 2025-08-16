package com.acrevisita.femapi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.acrevisita.femapi.models.Armario;

@Repository
public interface ArmarioRepository extends JpaRepository<Armario, Long> {
    @Query("SELECT a FROM Armario a")
    Page<Armario> busca(String termoBusca, Pageable pageable);
}
