import Koa from 'koa';
import BodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import serve from 'koa-static';
import cors from 'koa-cors';
import mount from 'koa-mount';
import { ApolloServer, gql } from 'apollo-server-koa';
import { typeDefs, resolvers } from './graphql';

const app = new Koa();
const static_pages = new Koa();

const PORT = process.env.PORT || 3000;
static_pages.use(serve(__dirname + '/build'));
app.use(mount('/', static_pages));
app.use(BodyParser());
app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

const router = new Router();

router.get('/health', async (ctx, next) => {
  ctx.status = 200;
  ctx.body = 'ok';
  await next();
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`🏰🏰🏰 Citadels listening on port: ${PORT} 🏰🏰🏰`);
});
