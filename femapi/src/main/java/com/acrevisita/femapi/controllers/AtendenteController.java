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

import com.acrevisita.femapi.models.Atendente;
import com.acrevisita.femapi.services.AtendenteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping(value = "/atendente", produces = MediaType.APPLICATION_JSON_VALUE)
@Tag(
    name = "Atendente",
    description = "Endpoints para gerenciar os atendentes"
)
public class AtendenteController implements IController<Atendente> {

    private final AtendenteService servico;

    public AtendenteController(AtendenteService servico) {
        this.servico = servico;
    }

    @Override
    @GetMapping("/")
    @Operation(
        summary = "Obtém todos os atendentes ou filtra por nome",
        description = "Obtém uma lista paginada de todos os atendentes cadastrados ou que contenham o termo de busca informado no nome."
    )
    public ResponseEntity<Page<Atendente>> get(
        @RequestParam(required = false) String termoBusca,
        @RequestParam(required = false, defaultValue = "false") boolean unpaged,
        @SortDefault.SortDefaults({
            @SortDefault(sort = "nomeAtendente", direction = Sort.Direction.ASC)
        })
        @ParameterObject Pageable page) {
        
        Pageable pageable = unpaged ? Pageable.unpaged() : page;
        Page<Atendente> registros = servico.get(termoBusca, pageable);
        return ResponseEntity.ok(registros);
    }

    @Override
    @GetMapping("/{id}")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Atendente encontrado"),
        @ApiResponse(
            responseCode = "404",
            description = "Atendente não encontrado",
            content = @Content(examples = @ExampleObject(""))
        )
    })
    @Operation(
        summary = "Obtém um atendente por ID",
        description = "Obtém os dados do atendente com o ID informado."
    )
    public ResponseEntity<Atendente> get(@PathVariable("id") Long id) {
        Atendente registro = servico.get(id);
        if (registro == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(registro);
    }

    @Override
    @PostMapping("/")
    @Operation(
        summary = "Cadastrar um novo atendente",
        description = "Cadastra um novo atendente no sistema."
    )
    public ResponseEntity<Atendente> insert(@RequestBody Atendente objeto) {
        Atendente registro = servico.save(objeto);
        return ResponseEntity.status(HttpStatus.CREATED).body(registro);
    }

    @Override
    @PutMapping("/")
    @Operation(
        summary = "Atualizar um atendente existente",
        description = "Atualiza os dados de um atendente existente."
    )
    public ResponseEntity<Atendente> update(@RequestBody Atendente objeto) {
        Atendente registro = servico.save(objeto);
        return ResponseEntity.ok(registro);
    }

    @Override
    @DeleteMapping("/{id}")
    @Operation(
        summary = "Deletar um atendente",
        description = "Deleta o atendente com o ID informado."
    )
    public ResponseEntity<?> delete(@PathVariable Long id) {
        servico.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
}