package com.acrevisita.femapi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.acrevisita.femapi.models.Visitante;
import com.acrevisita.femapi.services.VisitanteService;

@RestController
@RequestMapping("/api/visitante")
public class VisitanteController {

    @Autowired
    private VisitanteService visitanteService;

    @GetMapping
    public ResponseEntity<Page<Visitante>> getVisitantes(
            @RequestParam(required = false) String termoBusca,
            Pageable pageable) {
        return ResponseEntity.ok(visitanteService.get(termoBusca, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Visitante> getVisitanteById(@PathVariable Long id) {
        Visitante visitante = visitanteService.get(id);
        if (visitante == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(visitante);
    }

    @PostMapping
    public ResponseEntity<Visitante> createVisitante(@RequestBody Visitante visitante) {
        return ResponseEntity.ok(visitanteService.save(visitante));
    }

    @PutMapping
    public ResponseEntity<Visitante> updateVisitante(@RequestBody Visitante visitanteDetails) {
        Visitante visitante = visitanteService.findById(visitanteDetails.getIdVisitante());
        if (visitante == null) {
            return ResponseEntity.notFound().build();
        }
        
        visitante.setNomeVisitante(visitanteDetails.getNomeVisitante());
        visitante.setEmailVisitante(visitanteDetails.getEmailVisitante());
        visitante.setTelefoneVisitante(visitanteDetails.getTelefoneVisitante());
        visitante.setSenhaVisitante(visitanteDetails.getSenhaVisitante());
        visitante.setNumdocVisitante(visitanteDetails.getNumdocVisitante());
        visitante.setNacionalidadeVisitante(visitanteDetails.getNacionalidadeVisitante());
        
        Visitante updatedVisitante = visitanteService.save(visitante);
        return ResponseEntity.ok(updatedVisitante);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVisitante(@PathVariable Long id) {
        visitanteService.delete(id);
        return ResponseEntity.noContent().build();
    }
}