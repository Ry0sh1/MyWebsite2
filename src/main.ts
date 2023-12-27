import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {provideHttpClient} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {routes} from "./app/app.routes";
import {importProvidersFrom} from "@angular/core";
import { provideAnimations } from '@angular/platform-browser/animations';
import {NgEventBus} from "ng-event-bus";
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from "@angular/material/core";

bootstrapApplication(AppComponent, {
  providers:  [
    importProvidersFrom(RouterModule.forRoot(routes)),
    provideHttpClient(),
    provideAnimations(),
    NgEventBus,
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
]
})
  .catch((err) => console.error(err));
