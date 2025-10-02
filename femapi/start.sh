#!/bin/sh
# Adiciona o prefixo "jdbc:" à URL do banco de dados fornecida pelo Render
export SPRING_DATASOURCE_URL="jdbc:${SPRING_DATASOURCE_URL}"

# Inicia a aplicação Java
java -jar ./femapi.jar