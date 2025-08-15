package com.acrevisita.femapi.models;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Administrador implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long idAdministrador;

    @Column(nullable = false)
    private String nomeAdministrador;

    @Column(nullable = false)
    private String emailAdministrador;

    @Column(nullable = false)
    private String senhaAdministrador;

    @ManyToOne(optional = false)
    private Setor admSetorResponsavel;

    // @Column(nullable = false)
    // private boolean ativo = true;

    // ==================================(GETS E SETS)==================================

    public Long getIdAdministrador() {
        return idAdministrador;
    }

    public void setIdAdministrador(Long idAdministrador) {
        this.idAdministrador = idAdministrador;
    }

    public String getNomeAdministrador() {
        return nomeAdministrador;
    }

    public void setNomeAdministrador(String nomeAdministrador) {
        this.nomeAdministrador = nomeAdministrador;
    }

    public String getEmailAdministrador() {
        return emailAdministrador;
    }

    public void setEmailAdministrador(String emailAdministrador) {
        this.emailAdministrador = emailAdministrador;
    }

    public String getSenhaAdministrador() {
        return senhaAdministrador;
    }

    public void setSenhaAdministrador(String senhaAdministrador) {
        this.senhaAdministrador = senhaAdministrador;
    }

    public Setor getSetorResponsavel() {
        return admSetorResponsavel;
    }

    public void setSetorResponsavel(Setor admSetorResponsavel) {
        this.admSetorResponsavel = admSetorResponsavel;
    }

}
