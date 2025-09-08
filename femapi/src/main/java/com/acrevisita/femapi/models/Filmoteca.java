package com.acrevisita.femapi.models;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Filmoteca implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long idFilmoteca;

    @Column(nullable = false)
    private String sugestao;

    @ManyToOne(optional = false)
    private Setor setor;

    @ManyToOne(optional = false)
    private Usuario usuario;

    // ==================================(GETS E SETS)==================================

    public Long getIdFilmoteca() {
        return idFilmoteca;
    }

    public void setIdFilmoteca(Long idFilmoteca) {
        this.idFilmoteca = idFilmoteca;
    }

    public String getSugestao() {
        return sugestao;
    }

    public void setSugestao(String sugestao) {
        this.sugestao = sugestao;
    }

    public Setor getSetor() {
        return setor;
    }

    public void setSetor(Setor setor) {
        this.setor = setor;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

}
