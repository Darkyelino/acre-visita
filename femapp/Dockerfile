# Estágio 1: Build (Construção)
# Imagem Node para compilar o Angular
FROM node:20-alpine AS build

WORKDIR /app

# Copia os arquivos de dependência e instala
COPY package.json package-lock.json ./
RUN npm install

# Copia o restante do código-fonte do Angular
COPY . .

# Executa o build de produção (definido no seu package.json)
RUN npm run build

# Estágio 2: Serve (Servidor)
# Usamos uma imagem Nginx leve para servir os arquivos estáticos
FROM nginx:1.25-alpine

# Remove a configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia nosso arquivo de configuração personalizado
COPY nginx.conf /etc/nginx/conf.d/default.conf

# O seu angular.json define o "outputPath": "dist/femapp"
# O builder padrão do Angular 20 salva em uma subpasta "browser"
COPY --from=build /app/dist/femapp/browser /usr/share/nginx/html

# Expõe a porta 80 (padrão do Nginx)
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]