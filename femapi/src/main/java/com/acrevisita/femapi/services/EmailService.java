package com.acrevisita.femapi.services;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendPasswordResetEmail(String to, String token) {
        String subject = "Redefinição de Senha - AcreVisita";
        // A URL aponta para a rota do seu front-end Angular
        String resetUrl = "http://localhost:4200/reset-senha/" + token;
        String message = "Você solicitou a redefinição de sua senha para o sistema AcreVisita.\n\n"
                     + "Clique no link abaixo para criar uma nova senha:\n"
                     + resetUrl + "\n\n"
                     + "Este link é válido por 1 hora.\n"
                     + "Se você não solicitou esta alteração, por favor, ignore este e-mail.";

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(to);
        email.setSubject(subject);
        email.setText(message);
        mailSender.send(email);
    }
}

