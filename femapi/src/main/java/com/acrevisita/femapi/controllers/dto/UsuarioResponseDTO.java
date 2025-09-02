package com.acrevisita.femapi.controllers.dto;

import com.acrevisita.femapi.models.EPapel;
import com.acrevisita.femapi.models.Usuario;

public class UsuarioResponseDTO {

    private Long id;
    private String nome;
    private String email;
    private EPapel papel;
    private String telefone;
    private Long nacionalidadeId;
    private String nacionalidadeNome;
    private Long setorId;
    private String setorNome;

    // Construtor que converte a entidade Usuario para o DTO de resposta
    public UsuarioResponseDTO(Usuario usuario) {
        this.id = usuario.getId();
        this.nome = usuario.getNome();
        this.email = usuario.getEmail();
        this.papel = usuario.getPapel();
        this.telefone = usuario.getTelefone();
        if (usuario.getNacionalidade() != null) {
            this.nacionalidadeId = usuario.getNacionalidade().getIdNacionalidade();
            this.nacionalidadeNome = usuario.getNacionalidade().getNacionalidade();
        }
        if (usuario.getSetor() != null) {
            this.setorId = usuario.getSetor().getIdSetor();
            this.setorNome = usuario.getSetor().getNomeSetor();
        }
    }

    // Getters para todos os campos
    public Long getId() { return id; }
    public String getNome() { return nome; }
    public String getEmail() { return email; }
    public EPapel getPapel() { return papel; }
    public String getTelefone() { return telefone; }
    public Long getNacionalidadeId() { return nacionalidadeId; }
    public String getNacionalidadeNome() { return nacionalidadeNome; }
    public Long getSetorId() { return setorId; }
    public String getSetorNome() { return setorNome; }
}