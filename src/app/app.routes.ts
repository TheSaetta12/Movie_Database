import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Home } from './views/home/home';
import { Profile } from './views/profile/profile';
import { MovieDetail } from './views/movie-detail/movie-detail';
import { movieResolver } from './core/resolvers/movie-resolver';
import { Login } from './views/login/login';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {
        path: "",
        component: Home

    },
    {
        path: "profile",
        component: Profile,
        canActivate: [authGuard]
    },
    {
        path: "login",
        component: Login
    },
    {
        path: "movie/:id",
        component: MovieDetail,
        resolve: { movie: movieResolver }
    }
];
