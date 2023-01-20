

const express = require('express');
const Sentry = require('@sentry/node');
const Tracing = require("@sentry/tracing");

const app = express();

Sentry.init({
  dsn: "https://04a030be9c434f8a903aefeab86b85ef@o4504534403514368.ingest.sentry.io/4504534520233984",
  integrations: [
   
    new Sentry.Integrations.Http({ tracing: true }),
      
    new Tracing.Integrations.Express({ app }),
  ],

  
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());

app.use(Sentry.Handlers.tracingHandler());


app.get("/", function rootHandler(req, res) {
  res.end("Hello world!");
});

app.use(Sentry.Handlers.errorHandler());


app.use(function onError(err, req, res, next) {
 
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

app.listen(3000, () => {    
    console.log("Server started on port 3000"); 
});
