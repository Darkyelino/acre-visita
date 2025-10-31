# Estágio 1: Build (Construção)
# Imagem do Maven com a JDK 17, conforme definido no seu pom.xml
FROM maven:3.9.6-eclipse-temurin-17-alpine AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de build primeiro para aproveitar o cache do Docker
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .
COPY mvnw.cmd .

# Baixa as dependências (opcional, mas acelera builds futuras)
# RUN ./mvnw dependency:go-offline

# Copia o código-fonte
COPY src src

# Compila a aplicação e gera o .jar
# Usamos -DskipTests para não rodar os testes durante o build da imagem
RUN ./mvnw package -DskipTests

# Estágio 2: Run (Execução)
# Usamos uma imagem JRE (Java Runtime) leve, pois não precisamos mais do Maven
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copia o .jar que foi gerado no estágio anterior
# O nome do .jar vem do <artifactId> e <version> no seu pom.xml
COPY --from=build /app/target/femapi-0.0.1-SNAPSHOT.jar app.jar

# Expõe a porta 8080, que está definida no seu application.properties
EXPOSE 8080

# Comando para executar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]