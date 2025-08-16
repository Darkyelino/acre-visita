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

import com.acrevisita.femapi.models.Coordenador;
import com.acrevisita.femapi.services.CoordenadorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping(value = "/coordenador", produces = MediaType.APPLICATION_JSON_VALUE)
@Tag(
    name = "Coordenador",
    description = "Endpoints para gerenciar os coordenadores"
)
public class CoordenadorController implements IController<Coordenador> {

    private final CoordenadorService servico;

    public CoordenadorController(CoordenadorService servico) {
        this.servico = servico;
    }

    @Override
    @GetMapping("/")
    @Operation(
        summary = "Obtém todos os coordenadores ou filtra por nome",
        description = "Obtém uma lista paginada de todos os coordenadores cadastrados ou que contenham o termo de busca informado no nome."
    )
    public ResponseEntity<Page<Coordenador>> get(
        @RequestParam(required = false) String termoBusca,
        @RequestParam(required = false, defaultValue = "false") boolean unpaged,
        @SortDefault.SortDefaults({
            @SortDefault(sort = "nomeCoordenador", direction = Sort.Direction.ASC)
        })
        @ParameterObject Pageable page) {
        
        Pageable pageable = unpaged ? Pageable.unpaged() : page;
        Page<Coordenador> registros = servico.get(termoBusca, pageable);
        return ResponseEntity.ok(registros);
    }

    @Override
    @GetMapping("/{id}")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Coordenador encontrado"),
        @ApiResponse(
            responseCode = "404",
            description = "Coordenador não encontrado",
            content = @Content(examples = @ExampleObject(""))
        )
    })
    @Operation(
        summary = "Obtém um coordenador por ID",
        description = "Obtém os dados do coordenador com o ID informado."
    )
    public ResponseEntity<Coordenador> get(@PathVariable("id") Long id) {
        Coordenador registro = servico.get(id);
        if (registro == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(registro);
    }

    @Override
    @PostMapping("/")
    @Operation(
        summary = "Cadastrar um novo coordenador",
        description = "Cadastra um novo coordenador no sistema."
    )
    public ResponseEntity<Coordenador> insert(@RequestBody Coordenador objeto) {
        Coordenador registro = servico.save(objeto);
        return ResponseEntity.status(HttpStatus.CREATED).body(registro);
    }

    @Override
    @PutMapping("/")
    @Operation(
        summary = "Atualizar um coordenador existente",
        description = "Atualiza os dados de um coordenador existente."
    )
    public ResponseEntity<Coordenador> update(@RequestBody Coordenador objeto) {
        Coordenador registro = servico.save(objeto);
        return ResponseEntity.ok(registro);
    }

    @Override
    @DeleteMapping("/{id}")
    @Operation(
        summary = "Deletar um coordenador",
        description = "Deleta o coordenador com o ID informado."
    )
    public ResponseEntity<?> delete(@PathVariable Long id) {
        servico.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
}