package com.acrevisita.femapi.repository;

import com.acrevisita.femapi.models.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    /**
     * Busca um usuário pelo seu endereço de email.
     * Essencial para a funcionalidade de login unificado.
     * O Spring Data JPA cria a query automaticamente a partir do nome do método.
     *
     * @param email O email a ser buscado.
     * @return Um Optional contendo o usuário, se encontrado.
     */
    Optional<Usuario> findByEmail(String email);

    /**
     * Busca usuários cujo nome contenha o termo de busca, ignorando maiúsculas/minúsculas.
     * Este único método substitui todas as antigas queries "busca".
     *
     * @param nome O termo a ser buscado no nome do usuário.
     * @param pageable As informações de paginação.
     * @return Uma página de usuários que correspondem ao critério.
     */
    Page<Usuario> findByNomeContainingIgnoreCase(String nome, Pageable pageable);

}