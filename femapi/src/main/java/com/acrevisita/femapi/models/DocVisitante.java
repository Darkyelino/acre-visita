package com.acrevisita.femapi.models;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
public class DocVisitante implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDocumento;

    @Column(nullable = true)
    private String tipo; // Ex: "RG", "CPF", "Passaporte"

    @Column(nullable = true, unique = true)
    private String numero;

    @OneToOne(optional = false)
    @JoinColumn(name = "idVisitante", nullable = false)
    private Visitante visitante;

}
