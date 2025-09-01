package com.acrevisita.femapi.controllers;

import javax.security.auth.login.LoginException;

import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.acrevisita.femapi.models.Visitante;
import com.acrevisita.femapi.services.VisitanteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping(value = "/visitante", produces = MediaType.APPLICATION_JSON_VALUE)
@Tag(
    name = "Visitante",
    description = "Endpoints para gerenciar os visitantes"
)
public class VisitanteController implements IController<Visitante> {

    private final VisitanteService servico;

    public VisitanteController(VisitanteService servico) {
        this.servico = servico;
    }

    /**
     * DTO (Data Transfer Object) simples para receber as credenciais de login.
     * É uma boa prática criar uma classe interna ou externa para isso.
     */
    public static class LoginRequest {
        private String email;
        private String senha;
        // getters e setters
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getSenha() { return senha; }
        public void setSenha(String senha) { this.senha = senha; }
    }

    /**
     * NOVO ENDPOINT: Realiza o login.
     * Mapeado para POST /visitante/login
     */
    @PostMapping("/login")
    @Operation(summary = "Autentica um visitante e retorna seus dados")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            Visitante visitante = servico.login(loginRequest.getEmail(), loginRequest.getSenha());
            return ResponseEntity.ok(visitante);
        } catch (LoginException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @Override
    @GetMapping("/")
    @Operation(
        summary = "Obtém todos os visitantes ou filtra por termo de busca",
        description = "Obtém uma lista paginada de todos os visitantes cadastrados ou que contenham o termo de busca informado no nome."
    )
    public ResponseEntity<Page<Visitante>> get(
        @RequestParam(required = false) String termoBusca,
        @RequestParam(required = false, defaultValue = "false") boolean unpaged,
        @SortDefault.SortDefaults({
            @SortDefault(sort = "nomeVisitante", direction = Sort.Direction.ASC)
        })
        @ParameterObject Pageable page) {
        
        Pageable pageable = unpaged ? Pageable.unpaged() : page;
        Page<Visitante> registros = servico.get(termoBusca, pageable);
        return ResponseEntity.ok(registros);
    }

    @Override
    @GetMapping("/{id}")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Visitante encontrado"),
        @ApiResponse(
            responseCode = "404",
            description = "Visitante não encontrado",
            content = @Content(
                examples = @ExampleObject("")
            )
        )
    })
    @Operation(
        summary = "Obtém um visitante por ID",
        description = "Obtém os dados do visitante com o ID informado."
    )
    public ResponseEntity<Visitante> get(@PathVariable("id") Long id) {
        Visitante registro = servico.get(id);
        if (registro == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(registro);
    }

    @Override
    @PostMapping("/")
    @Operation(
        summary = "Cadastrar um novo visitante",
        description = "Cadastra um novo visitante no sistema."
    )
    public ResponseEntity<Visitante> insert(@RequestBody Visitante objeto) {
        Visitante registro = servico.save(objeto);
        return ResponseEntity.status(HttpStatus.CREATED).body(registro);
    }

    @Override
    @PutMapping("/")
    @Operation(
        summary = "Atualizar um visitante existente",
        description = "Atualiza os dados de um visitante existente."
    )
    public ResponseEntity<Visitante> update(@RequestBody Visitante objeto) {
        Visitante registro = servico.save(objeto);
        return ResponseEntity.ok(registro);
    }

    @Override
    @DeleteMapping("/{id}")
    @Operation(
        summary = "Deletar um visitante",
        description = "Deleta o visitante com o ID informado."
    )
    public ResponseEntity<?> delete(@PathVariable Long id) {
        servico.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
}