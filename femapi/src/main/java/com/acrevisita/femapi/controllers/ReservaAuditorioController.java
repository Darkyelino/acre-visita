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
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping(value = "/reservas-auditorio", produces = MediaType.APPLICATION_JSON_VALUE)
@Tag(
    name = "Reserva de Auditório",
    description = "Endpoints para gerenciar as solicitações de reserva de auditórios"
)
public class ReservaAuditorioController implements IController<ReservaAuditorio> {

    private final ReservaAuditorioService servico;

    public ReservaAuditorioController(ReservaAuditorioService servico) {
        this.servico = servico;
    }

    @Override
    @GetMapping("/")
    @Operation(
        summary = "Obtém todas as reservas ou filtra por nome do evento",
        description = "Obtém uma lista paginada de todas as reservas. Pode ser filtrada pelo nome do evento."
    )
    public ResponseEntity<Page<ReservaAuditorio>> get(
        @RequestParam(required = false) String termoBusca,
        @RequestParam(required = false, defaultValue = "false") boolean unpaged,
        @SortDefault.SortDefaults({
            @SortDefault(sort = "data", direction = Sort.Direction.ASC)
        })
        @ParameterObject Pageable page) {
        
        Pageable pageable = unpaged ? Pageable.unpaged() : page;
        Page<ReservaAuditorio> registros = servico.get(termoBusca, pageable);
        return ResponseEntity.ok(registros);
    }
    
    @GetMapping("/filtrar-por-status")
    @Operation(
        summary = "Obtém todas as reservas filtrando por status",
        description = "Obtém uma lista paginada de todas as reservas com um status específico (ex: PENDENTE, APROVADA)."
    )
    public ResponseEntity<Page<ReservaAuditorio>> getByStatus(
        @RequestParam String status,
        @RequestParam(required = false, defaultValue = "false") boolean unpaged,
        @SortDefault.SortDefaults({
            @SortDefault(sort = "data", direction = Sort.Direction.ASC)
        })
        @ParameterObject Pageable page) {
        
        Pageable pageable = unpaged ? Pageable.unpaged() : page;
        Page<ReservaAuditorio> registros = servico.getByStatus(status, pageable);
        return ResponseEntity.ok(registros);
    }

    @Override
    @GetMapping("/{id}")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Reserva encontrada"),
        @ApiResponse(
            responseCode = "404",
            description = "Reserva não encontrada",
            content = @Content(examples = @ExampleObject(""))
        )
    })
    @Operation(
        summary = "Obtém uma reserva por ID",
        description = "Obtém os dados da reserva com o ID informado."
    )
    public ResponseEntity<ReservaAuditorio> get(@PathVariable("id") Long id) {
        ReservaAuditorio registro = servico.get(id);
        if (registro == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(registro);
    }

    @Override
    @PostMapping("/")
    @Operation(
        summary = "Cadastrar uma nova solicitação de reserva",
        description = "Cadastra uma nova reserva no sistema, geralmente com o status 'PENDENTE'."
    )
    public ResponseEntity<ReservaAuditorio> insert(@RequestBody ReservaAuditorio objeto) {
        ReservaAuditorio registro = servico.save(objeto);
        return ResponseEntity.status(HttpStatus.CREATED).body(registro);
    }

    @Override
    @PutMapping("/")
    @Operation(
        summary = "Atualizar uma reserva existente",
        description = "Atualiza os dados de uma reserva existente."
    )
    public ResponseEntity<ReservaAuditorio> update(@RequestBody ReservaAuditorio objeto) {
        ReservaAuditorio registro = servico.save(objeto);
        return ResponseEntity.ok(registro);
    }

    @Override
    @DeleteMapping("/{id}")
    @Operation(
        summary = "Deletar uma reserva",
        description = "Deleta a reserva com o ID informado."
    )
    public ResponseEntity<?> delete(@PathVariable Long id) {
        servico.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @PatchMapping("/{id}/aprovar")
    @Operation(
        summary = "Aprovar uma solicitação de reserva",
        description = "Muda o status da reserva com o ID informado para 'APROVADA'."
    )
    public ResponseEntity<ReservaAuditorio> aprovar(@PathVariable Long id) {
        ReservaAuditorio registro = servico.aprovar(id);
        return ResponseEntity.ok(registro);
    }

    @PatchMapping("/{id}/recusar")
    @Operation(
        summary = "Recusar uma solicitação de reserva",
        description = "Muda o status da reserva com o ID informado para 'RECUSADA'."
    )
    public ResponseEntity<ReservaAuditorio> recusar(@PathVariable Long id) {
        ReservaAuditorio registro = servico.recusar(id);
        return ResponseEntity.ok(registro);
    }
}

