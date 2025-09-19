package com.acrevisita.femapi.controllers;

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

import com.acrevisita.femapi.models.EnderecoVisitante;
import com.acrevisita.femapi.services.EnderecoVisitanteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping(value = "/enderecoVisitante", produces = MediaType.APPLICATION_JSON_VALUE)
@Tag(
    name = "Endereço de Visitante",
    description = "Endpoints para gerenciar os endereços de visitante"
)
public class EnderecoVisitanteController implements IController<EnderecoVisitante> {

    private final EnderecoVisitanteService servico;

    public EnderecoVisitanteController(EnderecoVisitanteService servico) {
        this.servico = servico;
    }

    @Override
    @GetMapping("/")
    @Operation(
        summary = "Obtém todos os endereços de visitante ou filtrado por termo de busca",
        description = "Obtém uma lista paginada de todos os endereços dos visitantes cadastrados ou que contenham o termo de busca informado"
    )
    public ResponseEntity<Page<EnderecoVisitante>> get(
        @RequestParam(required = false) String termoBusca,
        @RequestParam(required = false, defaultValue = "false") boolean unpaged,
        @SortDefault.SortDefaults({
            @SortDefault(sort = "ruaVisitante", direction = Sort.Direction.ASC)
        })
        @ParameterObject Pageable page) {
        Pageable pageable = unpaged ? Pageable.unpaged() : page;
        Page<EnderecoVisitante> registros = servico.get(termoBusca, pageable);
        return ResponseEntity.ok(registros);
    }

    @Override
    @GetMapping("/{id}")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Endereço do visitante encontrado"),
        @ApiResponse(
            responseCode = "404",
            description = "Endereço do visitante não encontrado",
            content = @Content(
                examples = @ExampleObject("")
            )
        )
    })
    @Operation(
        summary = "Obtém o endereço do visitante por ID",
        description = "Obtém o endereço com o ID informado"
    )
    public ResponseEntity<EnderecoVisitante> get(@PathVariable("id") Long id) {
        EnderecoVisitante registro = servico.get(id);
        if (registro == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(registro);
    }

    @Override
    @PostMapping("/")
    @Operation(
        summary = "Cadastrar um endereço para o visitante",
        description = "Cadastra um novo endereço para o visitante"
    )
    public ResponseEntity<EnderecoVisitante> insert(@RequestBody EnderecoVisitante objeto) {
        EnderecoVisitante registro = servico.save(objeto);
        return ResponseEntity.status(HttpStatus.CREATED).body(registro);
    }

    @Override
    @PutMapping("/{id}")
    @Operation(
        summary = "Atualizar um endereço do visitante",
        description = "Atualiza um endereço existente do visitante"
    )
    public ResponseEntity<EnderecoVisitante> update(@RequestBody EnderecoVisitante objeto) {
        EnderecoVisitante registro = servico.save(objeto);
        return ResponseEntity.ok(registro);
    }

    @Override
    @DeleteMapping("/{id}")
    @Operation(
        summary = "Deletar endereço do visitante",
        description = "Deleta o endereço do visitante com o ID informado"
    )
    public ResponseEntity<?> delete(@PathVariable Long id) {
        servico.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

}
