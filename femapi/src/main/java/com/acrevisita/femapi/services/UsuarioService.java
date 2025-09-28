package com.acrevisita.femapi.services;

import com.acrevisita.femapi.models.EPapel;
import com.acrevisita.femapi.models.Usuario;
import com.acrevisita.femapi.repository.DocVisitanteRepository;
import com.acrevisita.femapi.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import javax.security.auth.login.LoginException;

@Service
public class UsuarioService implements IService<Usuario> { // ✅ Implementa a interface

    private final UsuarioRepository usuarioRepo;
    private final DocVisitanteRepository docRepo;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(
        UsuarioRepository usuarioRepo, 
        DocVisitanteRepository docRepo, 
        PasswordEncoder passwordEncoder
    ) {
        this.usuarioRepo = usuarioRepo;
        this.docRepo = docRepo;
        this.passwordEncoder = passwordEncoder;
    }

    // --- MÉTODOS DA INTERFACE ISERVICE ---

    @Override
    public Page<Usuario> get(String termoBusca, Pageable pageable) {
        if (termoBusca == null || termoBusca.isBlank()) {
            return usuarioRepo.findAll(pageable);
        } else {
            return usuarioRepo.findByNomeContainingIgnoreCase(termoBusca, pageable);
        }
    }

    @Override
    public Usuario get(Long id) {
        // Retorna o usuário ou 'null', como definido pela interface
        return usuarioRepo.findById(id).orElse(null);
    }

    @Override
    @Transactional
    public Usuario save(Usuario usuario) {
        // Criptografa a senha se for nova ou se foi alterada
        if (usuario.getSenha() != null && !usuario.getSenha().startsWith("$2a$")) {
            usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        }
        return usuarioRepo.save(usuario);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Usuario usuario = findById(id); // Usa o método auxiliar que lança exceção

        if (usuario.getPapel() == EPapel.VISITANTE) {
            // Se for um visitante, busca e deleta o documento associado usando o novo método
            docRepo.findByUsuarioId(id).ifPresent(docRepo::delete);
        }

        usuarioRepo.deleteById(id);
    }

    // --- MÉTODOS ESPECÍFICOS DO USUARIOSERVICE ---

    public Usuario login(String email, String senha) throws LoginException {
        Usuario usuario = usuarioRepo.findByEmail(email)
            .orElseThrow(() -> new LoginException("Credenciais inválidas."));

        if (passwordEncoder.matches(senha, usuario.getSenha())) {
            return usuario;
        } else {
            throw new LoginException("Credenciais inválidas.");
        }
    }

    @Transactional
    public void solicitarResetSenha(String email) {
        // A lógica de negócio real enviaria um e-mail com um token.
        // Como não podemos fazer isso, vamos apenas simular a ação.
        Optional<Usuario> usuarioOpt = usuarioRepo.findByEmail(email);

        if (usuarioOpt.isPresent()) {
            // Em um projeto real:
            // 1. Gerar um token de reset (ex: UUID.randomUUID().toString())
            // 2. Salvar o token e uma data de expiração no registro do usuário
            // 3. Enviar um e-mail para o usuário com um link contendo o token
            System.out.println("SIMULAÇÃO: E-mail de redefinição de senha enviado para: " + email);
        } else {
            // Por segurança, não informamos que o e-mail não foi encontrado.
            // Apenas logamos a tentativa no servidor.
            System.out.println("SIMULAÇÃO: Tentativa de redefinição de senha para um e-mail não cadastrado: " + email);
        }
        // O método não retorna nada e não lança exceção para o controller,
        // garantindo que a resposta para o front-end seja sempre a mesma.
    }

    /**
     * Método auxiliar que busca por ID mas lança exceção se não encontrar.
     * Útil para validações internas nos métodos 'delete' e 'update'.
     */
    private Usuario findById(Long id) {
        return usuarioRepo.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Usuário com ID " + id + " não encontrado."));
    }
}