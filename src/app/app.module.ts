import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in/sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomepageComponent } from './homepage/homepage.component';
import { CreateComponent } from './question/create/create.component';
import { VoteComponent } from './question/vote/vote.component';
import { ResultsComponent } from './question/results/results.component';

@NgModule({
  declarations: [AppComponent, SignInComponent, HomepageComponent, CreateComponent, VoteComponent, ResultsComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
