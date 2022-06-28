import {NgModule, OnInit} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [

  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./views/landing/landing.module').then(m => m.LandingModule)
      },
      {
        path: ':lang',
        loadChildren: () => import('./views/landing/landing.module').then(m => m.LandingModule)
      },
      {
        path: 'active-users',
        loadChildren: () => import('./views/main/main.module').then(m => m.MainModule)
      },
      {
        path: ':lang/active-users',
        loadChildren: () => import('./views/main/main.module').then(m => m.MainModule)
      },
      {
        path: 'sign-up',
        loadChildren: () => import('./views/sign-up/sign-up.module').then(m => m.SignUpModule)
      },
      {
        path: ':lang/sign-up',
        loadChildren: () => import('./views/sign-up/sign-up.module').then(m => m.SignUpModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./views/login/login.module').then(m => m.LoginModule)
      },
      {
        path: ':lang/login',
        loadChildren: () => import('./views/login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'reset-password',
        loadChildren: () => import('./views/reset-password/reset-password.module').then(m => m.ResetPasswordModule)
      },
      {
        path: ':lang/reset-password',
        loadChildren: () => import('./views/reset-password/reset-password.module').then(m => m.ResetPasswordModule)
      },
      {
        path: 'reset-password/:token',
        loadChildren: () => import('./views/reset-password/reset-password.module').then(m => m.ResetPasswordModule)
      },
      {
        path: ':lang/reset-password/:token',
        loadChildren: () => import('./views/reset-password/reset-password.module').then(m => m.ResetPasswordModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./views/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: ':lang/profile',
        loadChildren: () => import('./views/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'user-profile-detail',
        loadChildren: () => import('./views/user-profile-detail/user-profile-detail.module').then(m => m.UserProfileDetailModule)
      },
      {
        path: ':lang/user-profile-detail',
        loadChildren: () => import('./views/user-profile-detail/user-profile-detail.module').then(m => m.UserProfileDetailModule)
      },
      {
        path: 'user-profile-detail/:userName',
        loadChildren: () => import('./views/user-profile-detail/user-profile-detail.module').then(m => m.UserProfileDetailModule)
      },
      {
        path: ':lang/user-profile-detail/:userName',
        loadChildren: () => import('./views/user-profile-detail/user-profile-detail.module').then(m => m.UserProfileDetailModule)
      },
      {
        path: ':lang/user-profile-detail/:userName',
        loadChildren: () => import('./views/user-profile-detail/user-profile-detail.module').then(m => m.UserProfileDetailModule)
      },
      {
        path: 'message-inbox',
        loadChildren: () => import('./views/message-inbox/message-inbox.module').then(m => m.MessageInboxModule)
      },
      {
        path: ':lang/message-inbox',
        loadChildren: () => import('./views/message-inbox/message-inbox.module').then(m => m.MessageInboxModule)
      },
      {
        path: 'terms',
        loadChildren: () => import('./views/terms/terms.module').then(m => m.TermsModule)
      },
      {
        path: ':lang/terms',
        loadChildren: () => import('./views/terms/terms.module').then(m => m.TermsModule)
      },
      {
        path: 'privacy-policy',
        loadChildren: () => import('./views/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule)
      },
      {
        path: ':lang/privacy-policy',
        loadChildren: () => import('./views/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule)
      },
      {
        path: 'blog/:blogUrl',
        loadChildren: () => import('./views/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule)
      },
      {
        path: ':lang/blog/:blogUrl',
        loadChildren: () => import('./views/blog/blog-detail/blog-detail.module').then(m => m.BlogDetailModule)
      },
      {path: '**', redirectTo: '/'}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule implements OnInit{
  ngOnInit(): void {

  }
}
