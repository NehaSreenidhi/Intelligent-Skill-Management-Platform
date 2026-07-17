import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingComponent } from './components/landing/landing.component';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { MentorDashboardComponent } from './components/mentor-dashboard/mentor-dashboard.component';
import { InternProfileComponent } from './components/intern-profile/intern-profile.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SearchInternsComponent } from './components/search-interns/search-interns.component';

export const routes: Routes = [
    {path:'', component: LandingComponent},
    {path:'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path:'profile-settings', component: ProfileSettingsComponent},
    {path:'mentor-dashboard', component: MentorDashboardComponent},
    {path:'intern-profile/:email', component: InternProfileComponent},
    {path:'reset-password', component: ResetPasswordComponent},
    {path: 'search-interns', component: SearchInternsComponent}
];
