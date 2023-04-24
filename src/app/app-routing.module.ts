import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { SignInComponent } from './sign-in/sign-in/sign-in.component';
import { CreateComponent } from './question/create/create.component';
import { VoteComponent } from './question/vote/vote.component';
import { ResultsComponent } from './question/results/results.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full',
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomepageComponent,
    pathMatch: 'full',
  },
  {
    path: 'create',
    component: CreateComponent,
    pathMatch: 'full',
  },
  {
    path: 'results',
    component: ResultsComponent,
    pathMatch: 'full',
  },
  {
    path: 'vote',
    component: VoteComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
