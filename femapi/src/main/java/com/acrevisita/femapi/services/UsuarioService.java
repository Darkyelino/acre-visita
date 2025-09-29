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
import java.time.LocalDateTime;
import java.util.UUID;

import java.util.Optional;

import javax.security.auth.login.LoginException;

@Service
public class UsuarioService implements IService<Usuario> {

    private final UsuarioRepository usuarioRepo;
    private final DocVisitanteRepository docRepo;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public UsuarioService(
        UsuarioRepository usuarioRepo, 
        DocVisitanteRepository docRepo, 
        PasswordEncoder passwordEncoder,
        EmailService emailService
    ) {
        this.usuarioRepo = usuarioRepo;
        this.docRepo = docRepo;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
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
        // Busca o usuário pelo e-mail
        Optional<Usuario> usuarioOpt = usuarioRepo.findByEmail(email);

        // SÓ executa a lógica se o usuário existir
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            
            // Gera um token único e seguro
            String token = UUID.randomUUID().toString();
            
            // Define um tempo de expiração de 1 hora
            usuario.setResetToken(token);
            usuario.setResetTokenExpiry(LocalDateTime.now().plusHours(1));
            
            // Salva o usuário com o novo token
            usuarioRepo.save(usuario);
            
            // Envia o e-mail
            emailService.sendPasswordResetEmail(usuario.getEmail(), token);
        } else {
            // Se o e-mail não existe, apenas registramos no log do servidor por segurança.
            // Não fazemos nada que o usuário possa perceber.
            System.out.println("Tentativa de redefinição de senha para um e-mail não cadastrado: " + email);
        }
    }

    @Transactional
    public boolean resetarSenha(String token, String novaSenha) {
        // Busca o usuário pelo token
        Optional<Usuario> usuarioOpt = usuarioRepo.findByResetToken(token);

        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            
            // Verifica se o token não expirou
            if (usuario.getResetTokenExpiry().isAfter(LocalDateTime.now())) {
                // Criptografa a nova senha
                usuario.setSenha(passwordEncoder.encode(novaSenha));
                // Limpa o token para que não possa ser reutilizado
                usuario.setResetToken(null);
                usuario.setResetTokenExpiry(null);
                usuarioRepo.save(usuario);
                return true; // Sucesso
            }
        }
        
        return false; // Falha (token inválido ou expirado)
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