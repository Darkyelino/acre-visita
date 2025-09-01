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

import com.acrevisita.femapi.models.ReservaAuditorio;
import com.acrevisita.femapi.services.ReservaAuditorioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping(value = "/reservas-auditorio", produces = MediaType.APPLICATION_JSON_VALUE)
@Tag(
    name = "Reserva de Auditório",
    description = "Endpoints para gerenciar as solicitações de reserva de auditórios"
)
public class ReservaAuditorioController { // Não precisa mais da interface IController

    private final ReservaAuditorioService servico;

    public ReservaAuditorioController(ReservaAuditorioService servico) {
        this.servico = servico;
    }

    /**
     * ENDPOINT DE BUSCA UNIFICADO E AVANÇADO
     * Mapeado para /filtrar para corresponder ao service do Angular.
     */
    @GetMapping("/filtrar")
    @Operation(
        summary = "Busca e filtra reservas por múltiplos critérios",
        description = "Obtém uma lista paginada de reservas, podendo filtrar por nome do evento e/ou status."
    )
    public ResponseEntity<Page<ReservaAuditorio>> buscar(
        @RequestParam(required = false) String termo,
        @RequestParam(required = false) String status,
        @RequestParam(required = false, defaultValue = "false") boolean unpaged,
        @SortDefault.SortDefaults({
            @SortDefault(sort = "data", direction = Sort.Direction.ASC)
        })
        @ParameterObject Pageable page
    ) {
        Pageable pageable = unpaged ? Pageable.unpaged() : page;
        Page<ReservaAuditorio> registros = servico.buscar(termo, status, pageable);
        return ResponseEntity.ok(registros);
    }
    
    // Os endpoints GET / e GET /filtrar-por-status foram removidos.

    @GetMapping("/{id}")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Reserva encontrada"),
        @ApiResponse(responseCode = "404", description = "Reserva não encontrada", content = @Content)
    })
    @Operation(summary = "Obtém uma reserva por ID")
    public ResponseEntity<ReservaAuditorio> getById(@PathVariable("id") Long id) {
        ReservaAuditorio registro = servico.getById(id);
        return (registro != null) ? ResponseEntity.ok(registro) : ResponseEntity.notFound().build();
    }

    @PostMapping("/")
    @Operation(summary = "Cadastrar uma nova solicitação de reserva")
    public ResponseEntity<ReservaAuditorio> insert(@RequestBody ReservaAuditorio objeto) {
        ReservaAuditorio registro = servico.save(objeto);
        return ResponseEntity.status(HttpStatus.CREATED).body(registro);
    }

    @PutMapping("/")
    @Operation(summary = "Atualizar uma reserva existente")
    public ResponseEntity<ReservaAuditorio> update(@RequestBody ReservaAuditorio objeto) {
        ReservaAuditorio registro = servico.save(objeto);
        return ResponseEntity.ok(registro);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar uma reserva")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        servico.delete(id);
        return ResponseEntity.noContent().build(); // Retorna 204 No Content, uma prática comum para DELETE.
    }

    @PatchMapping("/{id}/aprovar")
    @Operation(summary = "Aprovar uma solicitação de reserva")
    public ResponseEntity<ReservaAuditorio> aprovar(@PathVariable Long id) {
        ReservaAuditorio registro = servico.aprovar(id);
        return ResponseEntity.ok(registro);
    }

    @PatchMapping("/{id}/recusar")
    @Operation(summary = "Recusar uma solicitação de reserva")
    public ResponseEntity<ReservaAuditorio> recusar(@PathVariable Long id) {
        ReservaAuditorio registro = servico.recusar(id);
        return ResponseEntity.ok(registro);
    }
}