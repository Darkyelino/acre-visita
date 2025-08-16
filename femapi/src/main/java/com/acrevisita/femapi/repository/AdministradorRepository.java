package com.acrevisita.femapi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.acrevisita.femapi.models.Administrador;

@Repository
public interface AdministradorRepository extends JpaRepository<Administrador, Long> {
    @Query("SELECT adm FROM Administrador adm WHERE adm.nomeAdministrador LIKE %?1%")
    Page<Administrador> busca(String termoBusca, Pageable page);
}
