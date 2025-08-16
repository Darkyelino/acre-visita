package com.acrevisita.femapi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.acrevisita.femapi.models.Atendente;

@Repository
public interface AtendenteRepository extends JpaRepository<Atendente, Long> {
    @Query("SELECT at FROM Atendente at WHERE at.nomeAtendente LIKE %?1%")
    Page<Atendente> busca(String termoBusca, Pageable page);
}
