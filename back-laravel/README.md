#Passo a passo LARAVEL

#####1-Copiar `.env.example` para `.env`
#####2-Criar banco `nutri`
#####3-Rodar composer 
 `$ composer install`

#####4-Gerar chave laravel
`$ php artisan key:generate`


#####5-Gerar tabelas
`$ php artisan migrate:refresh --seed`

#####6-Rodar server
 php artisan serve