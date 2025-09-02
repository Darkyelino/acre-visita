package com.acrevisita.femapi.models;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Usuario implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // --- Campos Comuns a Todos ---
    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String senha;

    @Enumerated(EnumType.STRING) // Salva o nome do Enum (ex: "VISITANTE") no banco, o que é mais legível
    @Column(nullable = false)
    private EPapel papel;


    // --- Campos Específicos (agora anuláveis) ---

    // Campo específico para VISITANTE
    @Column(nullable = true)
    private String telefone;

    // Relacionamento específico para VISITANTE
    @ManyToOne(optional = true) // 'optional = true' significa que a FK pode ser nula
    @JoinColumn(name = "nacionalidade_id")
    private NacionalidadeVisitante nacionalidade;

    // Relacionamento específico para ADM, COORDENADOR, ATENDENTE
    @ManyToOne(optional = true)
    @JoinColumn(name = "setor_id")
    private Setor setor;

    
    // --- Getters e Setters ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public EPapel getPapel() {
        return papel;
    }

    public void setPapel(EPapel papel) {
        this.papel = papel;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public NacionalidadeVisitante getNacionalidade() {
        return nacionalidade;
    }

    public void setNacionalidade(NacionalidadeVisitante nacionalidade) {
        this.nacionalidade = nacionalidade;
    }

    public Setor getSetor() {
        return setor;
    }

    public void setSetor(Setor setor) {
        this.setor = setor;
    }
}