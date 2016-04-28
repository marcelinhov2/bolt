#New Angular Kickoff
Sugestão de "kickoff" para camada frontend de novos microservices.

##Missão
- Aumentar a produtividade dos desenvolvedores frontend
- Simplificar a inserção de novos pacotes
- Gerar uma distribution simples, que pode ser usada em qualquer ambiente
- Diminuir a quantidade de requests necessários para a aplicação rodar
- Migrar para um task runner mais performático
- Simplificar ao máximo o início do desenvolvimento de interfaces 
para novos projetos
- IDE's free

##Instalação
- Clonar repositório

```
git clone git@github.com:DomPhysis/new-angular-kickoff.git
```

- Instalando dependências 

```npm install``` ou ```make setup```

Ao finalizar, ele roda também o comando ```bower install``` para dependências do browser

- Erguer server de desenvolvimento

```make server``` ou ```gulp up```

##Build desenvolvimento ( não minificada ) 
- Gerar www

```gulp build``` ou ```make build```

##Build Liberação ( minificada ) 
- Gerar distribution

```gulp build --compress``` ou ```make dist```
