package com.acrevisita.femapi.models;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Atendente implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long idAtendente;

    @Column(nullable = false)
    private String nomeAtendente;

    @Column(nullable = false)
    private String emailAtendente;

    @Column(nullable = false)
    private String senhaAtendente;

    @ManyToOne(optional = false)
    private Setor atendenteSetorResponsavel;

    // ==================================(GETS E SETS)==================================

    public Long getIdAtendente() {
        return idAtendente;
    }

    public void setIdAtendente(Long idAtendente) {
        this.idAtendente = idAtendente;
    }

    public String getNomeAtendente() {
        return nomeAtendente;
    }

    public void setNomeAtendente(String nomeAtendente) {
        this.nomeAtendente = nomeAtendente;
    }

    public String getEmailAtendente() {
        return emailAtendente;
    }

    public void setEmailAtendente(String emailAtendente) {
        this.emailAtendente = emailAtendente;
    }

    public String getSenhaAtendente() {
        return senhaAtendente;
    }

    public void setSenhaAtendente(String senhaAtendente) {
        this.senhaAtendente = senhaAtendente;
    }

    public Setor getAtendenteSetorResponsavel() {
        return atendenteSetorResponsavel;
    }

    public void setAtendenteSetorResponsavel(Setor atendenteSetorResponsavel) {
        this.atendenteSetorResponsavel = atendenteSetorResponsavel;
    }

}
