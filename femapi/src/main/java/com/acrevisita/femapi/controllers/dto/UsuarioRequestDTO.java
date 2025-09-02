package com.acrevisita.femapi.controllers.dto;

import com.acrevisita.femapi.models.EPapel;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class UsuarioRequestDTO {

    @NotBlank(message = "O nome é obrigatório.")
    private String nome;

    @NotBlank(message = "O email é obrigatório.")
    @Email(message = "Email inválido.")
    private String email;

    @NotBlank(message = "A senha é obrigatória.")
    private String senha;

    @NotNull(message = "O papel do usuário é obrigatório.")
    private EPapel papel;
    
    // Campos específicos que podem vir do front-end
    private String telefone;
    private Long nacionalidadeId; // Recebemos apenas o ID
    private Long setorId;         // Recebemos apenas o ID

    // Getters e Setters para todos os campos
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
    public EPapel getPapel() { return papel; }
    public void setPapel(EPapel papel) { this.papel = papel; }
    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }
    public Long getNacionalidadeId() { return nacionalidadeId; }
    public void setNacionalidadeId(Long nacionalidadeId) { this.nacionalidadeId = nacionalidadeId; }
    public Long getSetorId() { return setorId; }
    public void setSetorId(Long setorId) { this.setorId = setorId; }
}