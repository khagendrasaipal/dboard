import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { OrganizationComponent } from './organization/organization.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor';
import { CategoryComponent } from './category/category.component';
import { IndicatorComponent } from './indicator/indicator.component';
import { IndicatorValueComponent } from './indicators_value/indicatorvalue.component';
import { AuthGuard, LoginGuard } from './auth.guard';
import { LoginService } from './login/login.service';
import { ApiService } from './api.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { UserComponent } from './user/user.component';
import { DashboardSetupComponent } from './dashboard_setup/dashboardsetup.component';
import { DomainComponent } from './domain/domain.component';
import { CompositeIndicatorComponent } from './compositeindicator/compositeindicator.component';
import { CompositeIndicatorValueComponent } from './composite-indicator-value/compositeindicatorvalue.component';
import { DboardComponent } from './dboard/dboard.component';
import { ChartjsModule } from '@coreui/angular-chartjs';


import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from 'ngx-perfect-scrollbar';

// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';

// Import containers
import {
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
} from './containers';

import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  CardTitleDirective,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
  
} from '@coreui/angular';

import { IconModule, IconSetService } from '@coreui/icons-angular';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
];


@NgModule({
  declarations: [AppComponent,OrganizationComponent,LoginComponent,CategoryComponent,IndicatorComponent,DashboardSetupComponent,UserComponent,
    IndicatorValueComponent,DomainComponent,CompositeIndicatorComponent,CompositeIndicatorValueComponent,DboardComponent, ...APP_CONTAINERS],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    PerfectScrollbarModule,
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    FormsModule,
    ReactiveFormsModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ChartjsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    HttpClientModule,
    ListGroupModule,
    CardModule,
    ToastrModule.forRoot(),
    PaginationModule.forRoot()
  ],
  
  providers: [
    ApiService,
    LoginService,
    AuthGuard,
    LoginGuard,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    IconSetService,
    Title
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
