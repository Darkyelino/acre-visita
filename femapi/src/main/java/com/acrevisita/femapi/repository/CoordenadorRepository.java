package com.acrevisita.femapi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.acrevisita.femapi.models.Coordenador;

@Repository
public interface CoordenadorRepository extends JpaRepository<Coordenador, Long> {
    @Query("SELECT c FROM Coordenador c WHERE c.nomeCoordenador LIKE %?1%")
    Page<Coordenador> busca(String termoBusca, Pageable page);
}
