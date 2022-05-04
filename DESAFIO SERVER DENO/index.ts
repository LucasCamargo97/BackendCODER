import { Application } from "https://deno.land/x/oak@v10.5.1/mod.ts"
import router from './routes/index.router.ts'
const app = new Application();
console.log('Server running on on port 8080');

app.use(router.routes());
app.use(router.allowedMethods());
app.listen({port:8080});





