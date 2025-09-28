package com.acrevisita.femapi.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    /**
     * Envia o e-mail de redefinição de senha.
     * @param to O e-mail do destinatário.
     * @param token O token de redefinição a ser incluído no link.
     */
    public void sendPasswordResetEmail(String to, String token) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("nao-responda@acrevisita.com");
            message.setTo(to);
            message.setSubject("Redefinição de Senha - AcreVisita");

            // O link aponta para a nova rota do front-end que vamos criar
            String resetUrl = "http://localhost:4200/reset-senha?token=" + token;

            message.setText("Olá,\n\n"
                + "Recebemos uma solicitação para redefinir a senha da sua conta no AcreVisita.\n\n"
                + "Clique no link abaixo para criar uma nova senha:\n"
                + resetUrl + "\n\n"
                + "Se você não solicitou uma redefinição de senha, por favor, ignore este e-mail.\n\n"
                + "Atenciosamente,\nEquipe AcreVisita");

            mailSender.send(message);
        } catch (Exception e) {
            // Em um ambiente de produção, seria ideal logar este erro de forma mais robusta.
            System.err.println("Falha ao enviar e-mail de redefinição: " + e.getMessage());
        }
    }
}
