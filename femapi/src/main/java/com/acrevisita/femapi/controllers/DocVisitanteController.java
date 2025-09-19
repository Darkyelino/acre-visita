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

import com.acrevisita.femapi.models.DocVisitante;
import com.acrevisita.femapi.services.DocVisitanteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping(value = "/doc-visitante", produces = MediaType.APPLICATION_JSON_VALUE)
@Tag(
    name = "Documento do Visitante",
    description = "Endpoints para gerenciar os documentos dos visitantes"
)
public class DocVisitanteController implements IController<DocVisitante> {

    private final DocVisitanteService servico;

    public DocVisitanteController(DocVisitanteService servico) {
        this.servico = servico;
    }

    @Override
    @GetMapping("/")
    @Operation(
        summary = "Obtém todos os documentos ou filtra por número",
        description = "Obtém uma lista paginada de todos os documentos cadastrados ou que contenham o termo de busca informado no número."
    )
    public ResponseEntity<Page<DocVisitante>> get(
        @RequestParam(required = false) String termoBusca,
        @RequestParam(required = false, defaultValue = "false") boolean unpaged,
        @SortDefault.SortDefaults({
            @SortDefault(sort = "numero", direction = Sort.Direction.ASC)
        })
        @ParameterObject Pageable page) {
        
        Pageable pageable = unpaged ? Pageable.unpaged() : page;
        Page<DocVisitante> registros = servico.get(termoBusca, pageable);
        return ResponseEntity.ok(registros);
    }

    @Override
    @GetMapping("/{id}")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Documento encontrado"),
        @ApiResponse(
            responseCode = "404",
            description = "Documento não encontrado",
            content = @Content(examples = @ExampleObject(""))
        )
    })
    @Operation(
        summary = "Obtém um documento por ID",
        description = "Obtém os dados do documento com o ID informado."
    )
    public ResponseEntity<DocVisitante> get(@PathVariable("id") Long id) {
        DocVisitante registro = servico.get(id);
        if (registro == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(registro);
    }

    @Override
    @PostMapping("/")
    @Operation(
        summary = "Cadastrar um novo documento",
        description = "Cadastra um novo documento de visitante no sistema."
    )
    public ResponseEntity<DocVisitante> insert(@RequestBody DocVisitante objeto) {
        DocVisitante registro = servico.save(objeto);
        return ResponseEntity.status(HttpStatus.CREATED).body(registro);
    }

    @Override
    @PutMapping("/{id}")
    @Operation(
        summary = "Atualizar um documento existente",
        description = "Atualiza os dados de um documento existente."
    )
    public ResponseEntity<DocVisitante> update(@RequestBody DocVisitante objeto) {
        DocVisitante registro = servico.save(objeto);
        return ResponseEntity.ok(registro);
    }

    @Override
    @DeleteMapping("/{id}")
    @Operation(
        summary = "Deletar um documento",
        description = "Deleta o documento com o ID informado."
    )
    public ResponseEntity<?> delete(@PathVariable Long id) {
        servico.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
}