docker build -t gpt-nest .

heroku login

heroku container:login

heroku container:push web -a chat-gpt-nestjs

heroku container:release web -a chat-gpt-nestjs