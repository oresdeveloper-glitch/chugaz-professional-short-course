<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('registrations.{id}', function ($user, $id) {
    return $user->id === (int) $id || $user->hasRole('admin');
});

Broadcast::channel('payments.{id}', function ($user, $id) {
    return $user->id === (int) $id || $user->hasRole('admin');
});
