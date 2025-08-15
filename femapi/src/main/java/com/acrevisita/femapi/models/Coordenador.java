package com.acrevisita.femapi.models;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Coordenador implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long idCoordenador;

    @Column(nullable = false)
    private String nomeCoordenador;

    @Column(nullable = false)
    private String emailCoordenador;

    @Column(nullable = false)
    private String senhaCoordenador;

    @ManyToOne(optional = false)
    private Setor coordSetorResponsavel;

    // ==================================(GETS E SETS)==================================

    public Long getIdCoordenador() {
        return idCoordenador;
    }

    public void setIdCoordenador(Long idCoordenador) {
        this.idCoordenador = idCoordenador;
    }

    public String getNomeCoordenador() {
        return nomeCoordenador;
    }

    public void setNomeCoordenador(String nomeCoordenador) {
        this.nomeCoordenador = nomeCoordenador;
    }

    public String getEmailCoordenador() {
        return emailCoordenador;
    }

    public void setEmailCoordenador(String emailCoordenador) {
        this.emailCoordenador = emailCoordenador;
    }

    public String getSenhaCoordenador() {
        return senhaCoordenador;
    }

    public void setSenhaCoordenador(String senhaCoordenador) {
        this.senhaCoordenador = senhaCoordenador;
    }

    public Setor getCoordSetorResponsavel() {
        return coordSetorResponsavel;
    }

    public void setCoordSetorResponsavel(Setor coordSetorResponsavel) {
        this.coordSetorResponsavel = coordSetorResponsavel;
    }

}
