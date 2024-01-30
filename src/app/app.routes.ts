import {Routes} from '@angular/router';
import {HomePageComponent} from "./pages/home/home-page/home-page.component";
import {LoginPageComponent} from "./pages/auth/login-page/login-page.component";
import {SignupPageComponent} from "./pages/auth/signup-page/signup-page.component";
import {ProfilePageComponent} from "./pages/profile/profile-page/profile-page.component";
import {EditorPageComponent} from "./pages/new-article/editor-page/editor-page.component";
import {SettingsPageComponent} from "./pages/settings/settings-page/settings-page.component";
import {LoginGuard} from "./auth/guards/login.guard";
import {AuthGuard} from "./auth/guards/auth.guard";
import {ArticleDetailsPageComponent} from "./pages/article-details/article-details-page/article-details-page.component";

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'register',
    component: SignupPageComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'profile',
    children: [
      {
        path: ':userName',
        component: ProfilePageComponent
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'editor',
    component: EditorPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    component: SettingsPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'article',
    children: [
      {
        path: ':articleSlug',
        component: ArticleDetailsPageComponent
      }
    ]
  }
];
