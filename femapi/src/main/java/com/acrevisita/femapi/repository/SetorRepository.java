package com.acrevisita.femapi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.acrevisita.femapi.models.Setor;

@Repository
public interface SetorRepository extends JpaRepository<Setor, Long> {
    @Query("SELECT s FROM Setor s")
    Page<Setor> busca(String termoBusca, Pageable pageable);
}
