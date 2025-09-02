package com.acrevisita.femapi.controllers.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class LoginRequestDTO {

    @NotBlank(message = "O email não pode ser vazio.")
    @Email(message = "O email deve ser válido.")
    private String email;

    @NotBlank(message = "A senha não pode ser vazia.")
    private String senha;

    // Getters e Setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
}