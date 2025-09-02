package com.acrevisita.femapi.controllers;

import com.acrevisita.femapi.controllers.dto.LoginRequestDTO;
import com.acrevisita.femapi.controllers.dto.UsuarioRequestDTO;
import com.acrevisita.femapi.controllers.dto.UsuarioResponseDTO;
import com.acrevisita.femapi.models.NacionalidadeVisitante;
import com.acrevisita.femapi.models.Setor;
import com.acrevisita.femapi.models.Usuario;
import com.acrevisita.femapi.repository.NacionalidadeVisitanteRepository;
import com.acrevisita.femapi.repository.SetorRepository;
import com.acrevisita.femapi.services.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.login.LoginException;

@RestController
@RequestMapping(value = "/usuario", produces = MediaType.APPLICATION_JSON_VALUE)
@Tag(name = "Usuário", description = "Endpoints unificados para gerenciar todos os usuários do sistema")
public class UsuarioController {

    private final UsuarioService usuarioService;
    private final NacionalidadeVisitanteRepository nacionalidadeRepo;
    private final SetorRepository setorRepo;

    public UsuarioController(UsuarioService usuarioService, NacionalidadeVisitanteRepository nacionalidadeRepo, SetorRepository setorRepo) {
        this.usuarioService = usuarioService;
        this.nacionalidadeRepo = nacionalidadeRepo;
        this.setorRepo = setorRepo;
    }

    @PostMapping("/login")
    @Operation(summary = "Autentica um usuário e retorna seus dados")
    public ResponseEntity<?> login(@RequestBody @Valid LoginRequestDTO loginRequest) {
        try {
            Usuario usuario = usuarioService.login(loginRequest.getEmail(), loginRequest.getSenha());
            return ResponseEntity.ok(new UsuarioResponseDTO(usuario));
        } catch (LoginException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @GetMapping
    @Operation(summary = "Lista todos os usuários com paginação e filtro por nome")
    public ResponseEntity<Page<UsuarioResponseDTO>> get(
            @RequestParam(required = false) String termoBusca,
            @ParameterObject Pageable pageable) {
        Page<Usuario> paginaDeUsuarios = usuarioService.get(termoBusca, pageable);
        Page<UsuarioResponseDTO> paginaDeDTOs = paginaDeUsuarios.map(UsuarioResponseDTO::new);
        return ResponseEntity.ok(paginaDeDTOs);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Busca um usuário por ID")
    public ResponseEntity<UsuarioResponseDTO> getById(@PathVariable Long id) {
        // ✅ ALTERAÇÃO: Chamando o método correto 'get(id)'
        Usuario usuario = usuarioService.get(id); 
        
        // ✅ ALTERAÇÃO: Tratando o retorno nulo para enviar 404 Not Found
        if (usuario == null) {
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(new UsuarioResponseDTO(usuario));
    }

    @PostMapping
    @Operation(summary = "Cria um novo usuário (visitante, atendente, etc.)")
    public ResponseEntity<UsuarioResponseDTO> insert(@RequestBody @Valid UsuarioRequestDTO dto) {
        Usuario novoUsuario = toEntity(dto);
        Usuario usuarioSalvo = usuarioService.save(novoUsuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(new UsuarioResponseDTO(usuarioSalvo));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza um usuário existente")
    public ResponseEntity<UsuarioResponseDTO> update(@PathVariable Long id, @RequestBody @Valid UsuarioRequestDTO dto) {
        // ✅ ALTERAÇÃO: Chamando o método 'get(id)' e tratando o 404
        Usuario usuarioExistente = usuarioService.get(id); 
        if (usuarioExistente == null) {
            return ResponseEntity.notFound().build();
        }

        updateEntityFromDto(usuarioExistente, dto);
        Usuario usuarioSalvo = usuarioService.save(usuarioExistente);
        return ResponseEntity.ok(new UsuarioResponseDTO(usuarioSalvo));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deleta um usuário")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        try {
            usuarioService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            // Se o delete falhar porque o usuário não existe, retorna 404.
            return ResponseEntity.notFound().build();
        }
    }

    // --- MÉTODOS AUXILIARES PRIVADOS PARA CONVERSÃO (MAPPER) ---
    // (Nenhuma alteração aqui)
    private Usuario toEntity(UsuarioRequestDTO dto) {
        Usuario usuario = new Usuario();
        usuario.setNome(dto.getNome());
        usuario.setEmail(dto.getEmail());
        usuario.setSenha(dto.getSenha());
        usuario.setPapel(dto.getPapel());
        usuario.setTelefone(dto.getTelefone());

        if (dto.getNacionalidadeId() != null) {
            NacionalidadeVisitante nacionalidade = nacionalidadeRepo.findById(dto.getNacionalidadeId())
                .orElseThrow(() -> new EntityNotFoundException("Nacionalidade com ID " + dto.getNacionalidadeId() + " não encontrada."));
            usuario.setNacionalidade(nacionalidade);
        }
        if (dto.getSetorId() != null) {
            Setor setor = setorRepo.findById(dto.getSetorId())
                .orElseThrow(() -> new EntityNotFoundException("Setor com ID " + dto.getSetorId() + " não encontrado."));
            usuario.setSetor(setor);
        }
        return usuario;
    }

    private void updateEntityFromDto(Usuario usuario, UsuarioRequestDTO dto) {
        usuario.setNome(dto.getNome());
        usuario.setEmail(dto.getEmail());
        usuario.setPapel(dto.getPapel());
        usuario.setTelefone(dto.getTelefone());
        if (dto.getSenha() != null && !dto.getSenha().isBlank()) {
            usuario.setSenha(dto.getSenha());
        }

        if (dto.getNacionalidadeId() != null) {
            NacionalidadeVisitante nacionalidade = nacionalidadeRepo.findById(dto.getNacionalidadeId())
                .orElseThrow(() -> new EntityNotFoundException("Nacionalidade com ID " + dto.getNacionalidadeId() + " não encontrada."));
            usuario.setNacionalidade(nacionalidade);
        } else {
            usuario.setNacionalidade(null);
        }
        if (dto.getSetorId() != null) {
            Setor setor = setorRepo.findById(dto.getSetorId())
                .orElseThrow(() -> new EntityNotFoundException("Setor com ID " + dto.getSetorId() + " não encontrado."));
            usuario.setSetor(setor);
        } else {
            usuario.setSetor(null);
        }
    }
}