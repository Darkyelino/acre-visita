package com.acrevisita.femapi.models;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Auditorio implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long idAuditorio;

    @Column(nullable = false)
    private boolean disponibilidade = true;

    @ManyToOne(optional = false)
    private Setor localAuditorio;

    // ==================================(GETS E SETS)==================================

    public Long getIdAuditorio() {
        return idAuditorio;
    }

    public void setIdAuditorio(Long idAuditorio) {
        this.idAuditorio = idAuditorio;
    }

    public boolean getDisponibilidade() {
        return disponibilidade;
    }

    public void setDisponibilidade(boolean disponibilidade) {
        this.disponibilidade = disponibilidade;
    }

    public Setor getLocalAuditorio() {
        return localAuditorio;
    }

    public void setLocalAuditorio(Setor localAuditorio) {
        this.localAuditorio = localAuditorio;
    }

}
