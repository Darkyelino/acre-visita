package com.acrevisita.femapi.models;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Auditorio implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long idAuditorio;

    @Column(nullable = false)
    private String nomeAuditorio;

    @Column(nullable = false)
    private boolean disponibilidade = true;

    @ManyToOne(optional = false)
    @JoinColumn(name = "idSetor")
    private Setor setor;

    // ==================================(GETS E SETS)==================================

    public Long getIdAuditorio() {
        return idAuditorio;
    }

    public void setIdAuditorio(Long idAuditorio) {
        this.idAuditorio = idAuditorio;
    }

    public String getNomeAuditorio() {
        return nomeAuditorio;
    }

    public void setNomeAuditorio(String nomeAuditorio) {
        this.nomeAuditorio = nomeAuditorio;
    }

    public boolean getDisponibilidade() {
        return disponibilidade;
    }

    public void setDisponibilidade(boolean disponibilidade) {
        this.disponibilidade = disponibilidade;
    }

    public Setor getSetor() {
        return setor;
    }

    public void setSetor(Setor setor) {
        this.setor = setor;
    }

}
