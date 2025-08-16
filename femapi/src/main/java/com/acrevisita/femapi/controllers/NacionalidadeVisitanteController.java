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

import com.acrevisita.femapi.models.NacionalidadeVisitante;
import com.acrevisita.femapi.services.NacionalidadeVisitanteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping(value = "/nacionalidade-visitante", produces = MediaType.APPLICATION_JSON_VALUE)
@Tag(
    name = "Nacionalidade do Visitante",
    description = "Endpoints para gerenciar as nacionalidades"
)
public class NacionalidadeVisitanteController implements IController<NacionalidadeVisitante> {

    private final NacionalidadeVisitanteService servico;

    public NacionalidadeVisitanteController(NacionalidadeVisitanteService servico) {
        this.servico = servico;
    }

    @Override
    @GetMapping("/")
    @Operation(
        summary = "Obtém todas as nacionalidades",
        description = "Obtém uma lista paginada de todas as nacionalidades cadastradas."
    )
    public ResponseEntity<Page<NacionalidadeVisitante>> get(
        @RequestParam(required = false) String termoBusca,
        @RequestParam(required = false, defaultValue = "false") boolean unpaged,
        @SortDefault.SortDefaults({
            @SortDefault(sort = "nacionalidade", direction = Sort.Direction.ASC)
        })
        @ParameterObject Pageable page) {
        
        Pageable pageable = unpaged ? Pageable.unpaged() : page;
        Page<NacionalidadeVisitante> registros = servico.get(termoBusca, pageable);
        return ResponseEntity.ok(registros);
    }

    @Override
    @GetMapping("/{id}")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Nacionalidade encontrada"),
        @ApiResponse(
            responseCode = "404",
            description = "Nacionalidade não encontrada",
            content = @Content(examples = @ExampleObject(""))
        )
    })
    @Operation(
        summary = "Obtém uma nacionalidade por ID",
        description = "Obtém os dados da nacionalidade com o ID informado."
    )
    public ResponseEntity<NacionalidadeVisitante> get(@PathVariable("id") Long id) {
        NacionalidadeVisitante registro = servico.get(id);
        if (registro == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(registro);
    }

    @Override
    @PostMapping("/")
    @Operation(
        summary = "Cadastrar uma nova nacionalidade",
        description = "Cadastra uma nova nacionalidade no sistema."
    )
    public ResponseEntity<NacionalidadeVisitante> insert(@RequestBody NacionalidadeVisitante objeto) {
        NacionalidadeVisitante registro = servico.save(objeto);
        return ResponseEntity.status(HttpStatus.CREATED).body(registro);
    }

    @Override
    @PutMapping("/")
    @Operation(
        summary = "Atualizar uma nacionalidade existente",
        description = "Atualiza os dados de uma nacionalidade existente."
    )
    public ResponseEntity<NacionalidadeVisitante> update(@RequestBody NacionalidadeVisitante objeto) {
        NacionalidadeVisitante registro = servico.save(objeto);
        return ResponseEntity.ok(registro);
    }

    @Override
    @DeleteMapping("/{id}")
    @Operation(
        summary = "Deletar uma nacionalidade",
        description = "Deleta a nacionalidade com o ID informado."
    )
    public ResponseEntity<?> delete(@PathVariable Long id) {
        servico.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
}