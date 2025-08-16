package com.acrevisita.femapi.controllers;

import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.acrevisita.femapi.models.Administrador;
import com.acrevisita.femapi.services.AdministradorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping(value = "/administrador", produces = MediaType.APPLICATION_JSON_VALUE)
@Tag(
    name = "Administrador",
    description = "Endpoints para gerenciar os administradores do sistema"
)
public class AdministradorController implements IController<Administrador> {

    private final AdministradorService servico;

    public AdministradorController(AdministradorService servico) {
        this.servico = servico;
    }

    @Override
    @GetMapping("/")
    @Operation(
        summary = "Obtém todos os administradores ou filtra por nome",
        description = "Obtém uma lista paginada de todos os administradores ou que contenham o termo de busca informado no nome."
    )
    public ResponseEntity<Page<Administrador>> get(
        @RequestParam(required = false) String termoBusca,
        @RequestParam(required = false, defaultValue = "false") boolean unpaged,
        @SortDefault.SortDefaults({
            @SortDefault(sort = "nomeAdministrador", direction = Sort.Direction.ASC)
        })
        @ParameterObject Pageable page) {
        
        Pageable pageable = unpaged ? Pageable.unpaged() : page;
        Page<Administrador> registros = servico.get(termoBusca, pageable);
        return ResponseEntity.ok(registros);
    }

    @Override
    @GetMapping("/{id}")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Administrador encontrado"),
        @ApiResponse(
            responseCode = "404",
            description = "Administrador não encontrado",
            content = @Content(examples = @ExampleObject(""))
        )
    })
    @Operation(
        summary = "Obtém um administrador por ID",
        description = "Obtém os dados do administrador com o ID informado."
    )
    public ResponseEntity<Administrador> get(@PathVariable("id") Long id) {
        Administrador registro = servico.get(id);
        if (registro == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(registro);
    }

    @Override
    @PostMapping("/")
    @Operation(
        summary = "Cadastrar um novo administrador",
        description = "Cadastra um novo administrador no sistema."
    )
    public ResponseEntity<Administrador> insert(@RequestBody Administrador objeto) {
        Administrador registro = servico.save(objeto);
        return ResponseEntity.status(HttpStatus.CREATED).body(registro);
    }

    @Override
    @PutMapping("/")
    @Operation(
        summary = "Atualizar um administrador existente",
        description = "Atualiza os dados de um administrador existente."
    )
    public ResponseEntity<Administrador> update(@RequestBody Administrador objeto) {
        Administrador registro = servico.save(objeto);
        return ResponseEntity.ok(registro);
    }

    @Override
    @DeleteMapping("/{id}")
    @Operation(
        summary = "Deletar um administrador",
        description = "Deleta o administrador com o ID informado."
    )
    public ResponseEntity<?> delete(@PathVariable Long id) {
        servico.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
}