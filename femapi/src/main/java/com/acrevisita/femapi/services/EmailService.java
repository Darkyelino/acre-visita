package com.acrevisita.femapi.services;

import org.springframework.beans.factory.annotation.Value; // 1. Adicione esta importação
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

import java.io.UnsupportedEncodingException;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    // 2. Adicione esta linha para injetar o e-mail do application.properties
    @Value("${spring.mail.username}")
    private String from;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendPasswordResetEmail(String to, String token) {
        try {
            MimeMessage message = mailSender.createMimeMessage();

            // 3. Agora a variável 'from' existe e será usada corretamente
            message.setFrom(new InternetAddress(from, "Equipe Acre Visita"));

            message.setRecipients(MimeMessage.RecipientType.TO, to);
            message.setSubject("Redefinição de Senha - Acre Visita");

            String resetUrl = "http://localhost:4200/reset-senha?token=" + token;
            String emailContent = "<html><body>"
                                + "<p>Olá,</p>"
                                + "<p>Você solicitou a redefinição da sua senha. Clique no link abaixo para criar uma nova senha:</p>"
                                + "<a href=\"" + resetUrl + "\">Redefinir Senha</a>"
                                + "<p>Se você não solicitou esta alteração, por favor, ignore este e-mail.</p>"
                                + "<br>"
                                + "<p>Atenciosamente,</p>"
                                + "<p>Equipe Acre Visita</p>"
                                + "</body></html>";

            message.setContent(emailContent, "text/html; charset=utf-8");

            mailSender.send(message);
        
        } catch (MessagingException | UnsupportedEncodingException e) {
            e.printStackTrace();
            throw new RuntimeException("Falha ao enviar o e-mail de redefinição de senha", e);
        }
    }
}