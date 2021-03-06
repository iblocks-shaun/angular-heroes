import {XHRBackend, HTTP_PROVIDERS} from "@angular/http";
import {InMemoryBackendService, SEED_DATA} from "angular2-in-memory-web-api";
import {InMemoryDataService} from "./app/in-memory-data.service";
import {bootstrap} from "@angular/platform-browser-dynamic";
import {enableProdMode} from "@angular/core";
import {AppComponent, environment} from "./app/";
import {appRouterProviders} from "./app/app.routes";

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  appRouterProviders,
  HTTP_PROVIDERS,
  {provide: XHRBackend, useClass: InMemoryBackendService}, // in-mem server
  {provide: SEED_DATA, useClass: InMemoryDataService}      // in-mem server data
]);
