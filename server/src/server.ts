import Koa from 'koa';
import BodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import serve from 'koa-static';
import cors from 'koa-cors';
import mount from 'koa-mount';
import session from 'koa-session';
import { ApolloServer } from 'apollo-server-koa';
import { typeDefs, resolvers } from './graphql';

const isLocal = process.env.NODE_ENV !== 'production';

const app = new Koa();
app.keys = ['lol'];
const CONFIG = {
  secure: !isLocal,
};

app.use(session(CONFIG, app));

const static_pages = new Koa();
static_pages.use(serve(__dirname + '/build'));
app.use(mount('/', static_pages));
app.use(BodyParser());
app.use(cors({ credentials: true }));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ ctx }: { ctx: Koa.Context }) => ctx,
});

server.applyMiddleware({ app });

const router = new Router();

router.get('/health', async (ctx, next) => {
  ctx.status = 200;
  ctx.body = 'ok';
  await next();
});

app.use(router.routes()).use(router.allowedMethods());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🏰🏰🏰 Citadels listening on port: ${PORT} 🏰🏰🏰`);
});
