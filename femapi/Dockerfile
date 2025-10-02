# Estágio de Build: Usa uma imagem Maven para compilar o projeto
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Estágio de Execução: Usa uma imagem leve do OpenJDK para rodar a aplicação
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copia o .jar compilado do estágio anterior
COPY --from=build /app/target/femapi-0.0.1-SNAPSHOT.jar ./femapi.jar

# --- Nossas Novas Alterações ---
# 1. Copia o script de inicialização que criamos para dentro do container
COPY ./start.sh ./start.sh
# 2. Torna o script executável
RUN chmod +x ./start.sh

# Expõe a porta que a aplicação usa (8080)
EXPOSE 8080

# 3. Define o nosso script como o comando de inicialização
CMD ["./start.sh"]