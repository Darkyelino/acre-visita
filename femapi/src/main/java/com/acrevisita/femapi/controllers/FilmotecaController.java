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

import com.acrevisita.femapi.models.Filmoteca;
import com.acrevisita.femapi.services.FilmotecaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping(value = "/filmoteca", produces = MediaType.APPLICATION_JSON_VALUE)
@Tag(
    name = "Filmoteca",
    description = "Endpoints para gerenciar as sugestões da filmoteca"
)
public class FilmotecaController implements IController<Filmoteca> {

    private final FilmotecaService servico;

    public FilmotecaController(FilmotecaService servico) {
        this.servico = servico;
    }

    @Override
    @GetMapping("/")
    @Operation(
        summary = "Obtém todas as sugestões para a filmoteca",
        description = "Obtém uma lista paginada de todas as sugestões enviadas."
    )
    public ResponseEntity<Page<Filmoteca>> get(
        @RequestParam(required = false) String termoBusca,
        @RequestParam(required = false, defaultValue = "false") boolean unpaged,
        @SortDefault.SortDefaults({
            @SortDefault(sort = "sugestao", direction = Sort.Direction.ASC)
        })
        @ParameterObject Pageable page) {
        
        Pageable pageable = unpaged ? Pageable.unpaged() : page;
        Page<Filmoteca> registros = servico.get(termoBusca, pageable);
        return ResponseEntity.ok(registros);
    }

    @Override
    @GetMapping("/{id}")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Sugestão encontrada"),
        @ApiResponse(
            responseCode = "404",
            description = "Sugestão não encontrada",
            content = @Content(examples = @ExampleObject(""))
        )
    })
    @Operation(
        summary = "Obtém uma sugestão por ID",
        description = "Obtém os dados da sugestão com o ID informado."
    )
    public ResponseEntity<Filmoteca> get(@PathVariable("id") Long id) {
        Filmoteca registro = servico.get(id);
        if (registro == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(registro);
    }

    @Override
    @PostMapping("/")
    @Operation(
        summary = "Cadastrar uma nova sugestão",
        description = "Cadastra uma nova sugestão para a filmoteca."
    )
    public ResponseEntity<Filmoteca> insert(@RequestBody Filmoteca objeto) {
        Filmoteca registro = servico.save(objeto);
        return ResponseEntity.status(HttpStatus.CREATED).body(registro);
    }

    @Override
    @PutMapping("/{id}")
    @Operation(
        summary = "Atualizar uma sugestão existente",
        description = "Atualiza os dados de uma sugestão existente."
    )
    public ResponseEntity<Filmoteca> update(@RequestBody Filmoteca objeto) {
        Filmoteca registro = servico.save(objeto);
        return ResponseEntity.ok(registro);
    }

    @Override
    @DeleteMapping("/{id}")
    @Operation(
        summary = "Deletar uma sugestão",
        description = "Deleta a sugestão com o ID informado."
    )
    public ResponseEntity<?> delete(@PathVariable Long id) {
        servico.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
}