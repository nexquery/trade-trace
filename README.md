# Trade Trace
Trader kişilerin alım ve satım işlemlerini kaydedip analiz etmesini sağlar.

## Kurulum
`.env` adında bir dosya oluşturun ve içine aşağıdaki bilgileri girin
```
MONGODB_URI=mongodb://USER:PASSWORD@HOST:27017/?authSource=admin
MONGODB_DB=trade
PORT=3000
```

Daha sonra aşağıdaki komutları çalıştırın.
```
npm install
npm run build
npm run start:production
```

## Kullanım
Projeyi çalıştırdığınızda aşağıdaki adrese bağlanıp kullanabilirsiniz.
```
http://localhost:3000/
```

## Not
Veritabanı olarak `MongoDB` gereklidir.

## Görseller
<img src="images/trade-trace-1.png" />
<img src="images/trade-trace-2.png" />
<img src="images/trade-trace-3.png" />
<img src="images/trade-trace-4.png" />
