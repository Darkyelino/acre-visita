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
public class Armario implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long idArmario;

    @Column(nullable = false)
    private int numeracao;

    @ManyToOne(optional = true)
    private Visitante visitante;

    @ManyToOne(optional = false)
    @JoinColumn(name = "setor_id", nullable = false)
    private Setor setor;

    // ==================================(GETS E SETS)==================================

    public Long getIdArmario() {
        return idArmario;
    }

    public void setIdArmario(Long idArmario) {
        this.idArmario = idArmario;
    }

    public int getNumeracao() {
        return numeracao;
    }

    public void setNumeracao(int numeracao) {
        this.numeracao = numeracao;
    }

    public Visitante getVisitante() {
        return visitante;
    }

    public void setVisitante(Visitante visitante) {
        this.visitante = visitante;
    }

    public Setor getSetor() {
        return setor;
    }

    public void setSetor(Setor setor) {
        this.setor = setor;
    }

}
