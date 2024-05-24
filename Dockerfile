# Estágio de build
FROM node:16 as build

# Defina o diretório de trabalho dentro do contêiner para o estágio de build
WORKDIR /app

# Copie apenas os arquivos relacionados ao gerenciamento de dependências
COPY package*.json ./

# Instale as dependências do projeto, incluindo as de desenvolvimento
RUN npm install

# Copie o restante do código-fonte para o contêiner
COPY . .

# Execute o comando de build do NestJS
RUN npm run build

# Estágio de produção
FROM node:16

# Defina o diretório de trabalho dentro do contêiner para o estágio de produção
WORKDIR /app

# Copie apenas os arquivos necessários do estágio de build
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

# Exponha a porta em que a aplicação NestJS estará em execução
EXPOSE 8080

# Comando para iniciar a aplicação NestJS quando o contêiner for iniciado
CMD ["node", "dist/main.js"]
