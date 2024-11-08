# pweb-express-mongodb-P16-2024

## Prerequisites

1. Clone repo ini

2. Buat file `.env` untuk setup variabel environment connection string mongodb atlas, port dan token:

```conf
MONGODB_URI=mongodb+srv://ludwigd:Batusangkar24!@pemweb.yosli.mongodb.net/p16?retryWrites=true&w=majority&appName=[]
PORT=5000
JWT_SECRET="ghcchcghg"
```

Kalau tidak connect ke database, coba ganti `ludwigd` dengan username akun mongodb kalian.

3. `npm run start:dev`