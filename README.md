# CRUD bookstore in API com frontend

## Como executar

To run this project, the API must be initialized and after frontend execute

### API

Access the api director with:

```
cd api
```

Create the `.env` based on `.env.example`;
Copy the `.env.exemple` and paste with name `.env`:
```
cp .env.example .env
```

Fill the ambiently variables using your text editor

Install NodeJS packages:
```
npm install
```

Run the API:
```
npm run serve
```

### Frontend
On front, edit the files `index.js`, in first line, putting your API endpoint. On this case, it's configured to use `http://localhost:3000/`

```javascript
const ENDPOINT = "http://localhost:3000";
```

Open the file index.html in menu folder, add user, and enjoy.