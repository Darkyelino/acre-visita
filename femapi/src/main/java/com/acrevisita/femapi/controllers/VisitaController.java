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

import com.acrevisita.femapi.models.Visita;
import com.acrevisita.femapi.services.VisitaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping(value = "/visita", produces = MediaType.APPLICATION_JSON_VALUE)
@Tag(
    name = "Visita",
    description = "Endpoints para gerenciar as visitas e agendamentos"
)
public class VisitaController implements IController<Visita> {

    private final VisitaService servico;

    public VisitaController(VisitaService servico) {
        this.servico = servico;
    }

    @Override
    @GetMapping("/")
    @Operation(
        summary = "Obtém todas as visitas",
        description = "Obtém uma lista paginada de todas as visitas e agendamentos."
    )
    public ResponseEntity<Page<Visita>> get(
        @RequestParam(required = false) String termoBusca,
        @RequestParam(required = false, defaultValue = "false") boolean unpaged,
        @SortDefault.SortDefaults({
            @SortDefault(sort = "dataHoraEntrada", direction = Sort.Direction.DESC)
        })
        @ParameterObject Pageable page) {
        
        Pageable pageable = unpaged ? Pageable.unpaged() : page;
        Page<Visita> registros = servico.get(termoBusca, pageable);
        return ResponseEntity.ok(registros);
    }

    @Override
    @GetMapping("/{id}")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Visita encontrada"),
        @ApiResponse(
            responseCode = "404",
            description = "Visita não encontrada",
            content = @Content(examples = @ExampleObject(""))
        )
    })
    @Operation(
        summary = "Obtém uma visita por ID",
        description = "Obtém os dados da visita com o ID informado."
    )
    public ResponseEntity<Visita> get(@PathVariable("id") Long id) {
        Visita registro = servico.get(id);
        if (registro == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(registro);
    }

    @Override
    @PostMapping("/")
    @Operation(
        summary = "Cadastrar uma nova visita",
        description = "Cadastra uma nova visita ou agendamento no sistema."
    )
    public ResponseEntity<Visita> insert(@RequestBody Visita objeto) {
        Visita registro = servico.save(objeto);
        return ResponseEntity.status(HttpStatus.CREATED).body(registro);
    }

    @Override
    @PutMapping("/")
    @Operation(
        summary = "Atualizar uma visita existente",
        description = "Atualiza os dados de uma visita ou agendamento existente."
    )
    public ResponseEntity<Visita> update(@RequestBody Visita objeto) {
        Visita registro = servico.save(objeto);
        return ResponseEntity.ok(registro);
    }

    @Override
    @DeleteMapping("/{id}")
    @Operation(
        summary = "Deletar uma visita",
        description = "Deleta a visita com o ID informado."
    )
    public ResponseEntity<?> delete(@PathVariable Long id) {
        servico.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
}