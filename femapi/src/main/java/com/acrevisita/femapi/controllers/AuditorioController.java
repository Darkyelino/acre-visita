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

import com.acrevisita.femapi.models.Auditorio;
import com.acrevisita.femapi.services.AuditorioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping(value = "/auditorio", produces = MediaType.APPLICATION_JSON_VALUE)
@Tag(
    name = "Auditório",
    description = "Endpoints para gerenciar os auditórios"
)
public class AuditorioController implements IController<Auditorio> {

    private final AuditorioService servico;

    public AuditorioController(AuditorioService servico) {
        this.servico = servico;
    }

    @Override
    @GetMapping("/")
    @Operation(
        summary = "Obtém todos os auditórios ou filtra por nome",
        description = "Obtém uma lista paginada de todos os auditórios cadastrados ou que contenham o termo de busca informado no nome."
    )
    public ResponseEntity<Page<Auditorio>> get(
        @RequestParam(required = false) String termoBusca,
        @RequestParam(required = false, defaultValue = "false") boolean unpaged,
        @SortDefault.SortDefaults({
            @SortDefault(sort = "nomeAuditorio", direction = Sort.Direction.ASC)
        })
        @ParameterObject Pageable page) {
        
        Pageable pageable = unpaged ? Pageable.unpaged() : page;
        Page<Auditorio> registros = servico.get(termoBusca, pageable);
        return ResponseEntity.ok(registros);
    }

    @Override
    @GetMapping("/{id}")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Auditório encontrado"),
        @ApiResponse(
            responseCode = "404",
            description = "Auditório não encontrado",
            content = @Content(examples = @ExampleObject(""))
        )
    })
    @Operation(
        summary = "Obtém um auditório por ID",
        description = "Obtém os dados do auditório com o ID informado."
    )
    public ResponseEntity<Auditorio> get(@PathVariable("id") Long id) {
        Auditorio registro = servico.get(id);
        if (registro == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(registro);
    }

    @Override
    @PostMapping("/")
    @Operation(
        summary = "Cadastrar um novo auditório",
        description = "Cadastra um novo auditório no sistema."
    )
    public ResponseEntity<Auditorio> insert(@RequestBody Auditorio objeto) {
        Auditorio registro = servico.save(objeto);
        return ResponseEntity.status(HttpStatus.CREATED).body(registro);
    }

    @Override
    @PutMapping("/{id}")
    @Operation(
        summary = "Atualizar um auditório existente",
        description = "Atualiza os dados de um auditório existente."
    )
    public ResponseEntity<Auditorio> update(@RequestBody Auditorio objeto) {
        Auditorio registro = servico.save(objeto);
        return ResponseEntity.ok(registro);
    }

    @Override
    @DeleteMapping("/{id}")
    @Operation(
        summary = "Deletar um auditório",
        description = "Deleta o auditório com o ID informado."
    )
    public ResponseEntity<?> delete(@PathVariable Long id) {
        servico.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
}