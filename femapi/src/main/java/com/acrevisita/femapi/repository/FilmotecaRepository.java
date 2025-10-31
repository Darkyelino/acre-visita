package com.acrevisita.femapi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.acrevisita.femapi.models.Filmoteca;

@Repository
public interface FilmotecaRepository extends JpaRepository<Filmoteca, Long> {
    @Query("SELECT fi FROM Filmoteca fi WHERE fi.sugestao LIKE %?1%")
    Page<Filmoteca> busca(String termoBusca, Pageable pageable);
}
