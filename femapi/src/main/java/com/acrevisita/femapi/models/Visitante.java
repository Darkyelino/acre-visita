package com.acrevisita.femapi.models;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Visitante implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long idVisitante;

    @Column(nullable = false)
    private String nomeVisitante;

    @Column(nullable = false)
    private String emailVisitante;

    @Column(nullable = false)
    private String telefoneVisitante;

    @Column(nullable = false)
    private String senhaVisitante;

    @Column(nullable = true)
    private String numdocVisitante;
    
    @ManyToOne(optional = false)
    NacionalidadeVisitante nacionalidadeVisitante;

    // ==================================(GETS E SETS)==================================

    public Long getIdVisitante() {
        return idVisitante;
    }

    public void setIdVisitante(Long idVisitante) {
        this.idVisitante = idVisitante;
    }

    public String getNomeVisitante() {
        return nomeVisitante;
    }

    public void setNomeVisitante(String nomeVisitante) {
        this.nomeVisitante = nomeVisitante;
    }

    public String getEmailVisitante() {
        return emailVisitante;
    }

    public void setEmailVisitante(String emailVisitante) {
        this.emailVisitante = emailVisitante;
    }

    public String getTelefoneVisitante() {
        return telefoneVisitante;
    }

    public void setTelefoneVisitante(String telefoneVisitante) {
        this.telefoneVisitante = telefoneVisitante;
    }

    public String getSenhaVisitante() {
        return senhaVisitante;
    }

    public void setSenhaVisitante(String senhaVisitante) {
        this.senhaVisitante = senhaVisitante;
    }

    public String getNumdocVisitante() {
        return numdocVisitante;
    }

    public void setNumdocVisitante(String numdocVisitante) {
        this.numdocVisitante = numdocVisitante;
    }

    public NacionalidadeVisitante getNacionalidadeVisitante() {
        return nacionalidadeVisitante;
    }

    public void setNacionalidadeVisitante(NacionalidadeVisitante nacionalidadeVisitante) {
        this.nacionalidadeVisitante = nacionalidadeVisitante;
    }

}
