package com.acrevisita.femapi.controllers.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ResetSenhaRequestDTO {

    @NotBlank
    private String token;

    @NotBlank
    @Size(min = 6, message = "A nova senha deve ter pelo menos 6 caracteres.")
    private String novaSenha;

    // Getters e Setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public String getNovaSenha() { return novaSenha; }
    public void setNovaSenha(String novaSenha) { this.novaSenha = novaSenha; }
}

