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
public class EnderecoVisitante implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long idEnderecoVisitante;

    @Column(nullable = false)
    private String cepVisitante;

    @Column(nullable = false)
    private String estadoVisitante;

    @Column(nullable = false)
    private String cidadeVisitante;

    @Column(nullable = false)
    private String bairroVisitante;

    @Column(nullable = false)
    private String ruaVisitante;

    @Column(nullable = false)
    private String numeroVisitante;

    @ManyToOne(optional = false)
    @JoinColumn(name = "idVisitante", nullable = false)
    private Visitante visitante;

    // ==================================(GETS E SETS)==================================

    public Long getIdEnderecoVisitante() {
        return idEnderecoVisitante;
    }

    public void setIdEnderecoVisitante(Long idEnderecoVisitante) {
        this.idEnderecoVisitante = idEnderecoVisitante;
    }

    public String getCepVisitante() {
        return cepVisitante;
    }

    public void setCepVisitante(String cepVisitante) {
        this.cepVisitante = cepVisitante;
    }

    public String getEstadoVisitante() {
        return estadoVisitante;
    }

    public void setEstadoVisitante(String estadoVisitante) {
        this.estadoVisitante = estadoVisitante;
    }

    public String getCidadeVisitante() {
        return cidadeVisitante;
    }

    public void setCidadeVisitante(String cidadeVisitante) {
        this.cidadeVisitante = cidadeVisitante;
    }

    public String getBairroVisitante() {
        return bairroVisitante;
    }

    public void setBairroVisitante(String bairroVisitante) {
        this.bairroVisitante = bairroVisitante;
    }

    public String getRuaVisitante() {
        return ruaVisitante;
    }

    public void setRuaVisitante(String ruaVisitante) {
        this.ruaVisitante = ruaVisitante;
    }

    public String getNumeroVisitante() {
        return numeroVisitante;
    }

    public void setNumeroVisitante(String numeroVisitante) {
        this.numeroVisitante = numeroVisitante;
    }

    public Visitante getVisitante() {
        return visitante;
    }

    public void setVisitante(Visitante visitante) {
        this.visitante = visitante;
    }

}
