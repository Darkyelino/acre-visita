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

import com.acrevisita.femapi.models.Feedback;
import com.acrevisita.femapi.services.FeedbackService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping(value = "/feedback", produces = MediaType.APPLICATION_JSON_VALUE)
@Tag(
    name = "Feedback",
    description = "Endpoints para gerenciar os feedbacks dos visitantes"
)
public class FeedbackController implements IController<Feedback> {

    private final FeedbackService servico;

    public FeedbackController(FeedbackService servico) {
        this.servico = servico;
    }

    @Override
    @GetMapping("/")
    @Operation(
        summary = "Obtém todos os feedbacks",
        description = "Obtém uma lista paginada de todos os feedbacks enviados."
    )
    public ResponseEntity<Page<Feedback>> get(
        @RequestParam(required = false) String termoBusca,
        @RequestParam(required = false, defaultValue = "false") boolean unpaged,
        @SortDefault.SortDefaults({
            @SortDefault(sort = "dataEnvio", direction = Sort.Direction.DESC)
        })
        @ParameterObject Pageable page) {
        
        Pageable pageable = unpaged ? Pageable.unpaged() : page;
        Page<Feedback> registros = servico.get(termoBusca, pageable);
        return ResponseEntity.ok(registros);
    }

    @Override
    @GetMapping("/{id}")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Feedback encontrado"),
        @ApiResponse(
            responseCode = "404",
            description = "Feedback não encontrado",
            content = @Content(examples = @ExampleObject(""))
        )
    })
    @Operation(
        summary = "Obtém um feedback por ID",
        description = "Obtém os dados do feedback com o ID informado."
    )
    public ResponseEntity<Feedback> get(@PathVariable("id") Long id) {
        Feedback registro = servico.get(id);
        if (registro == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(registro);
    }

    @Override
    @PostMapping("/")
    @Operation(
        summary = "Cadastrar um novo feedback",
        description = "Cadastra um novo feedback de um visitante."
    )
    public ResponseEntity<Feedback> insert(@RequestBody Feedback objeto) {
        Feedback registro = servico.save(objeto);
        return ResponseEntity.status(HttpStatus.CREATED).body(registro);
    }

    @Override
    @PutMapping("/")
    @Operation(
        summary = "Atualizar um feedback existente",
        description = "Atualiza os dados de um feedback existente."
    )
    public ResponseEntity<Feedback> update(@RequestBody Feedback objeto) {
        Feedback registro = servico.save(objeto);
        return ResponseEntity.ok(registro);
    }

    @Override
    @DeleteMapping("/{id}")
    @Operation(
        summary = "Deletar um feedback",
        description = "Deleta o feedback com o ID informado."
    )
    public ResponseEntity<?> delete(@PathVariable Long id) {
        servico.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
}