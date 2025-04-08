<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationFailureEvent;
use Symfony\Component\HttpFoundation\JsonResponse;

class JWTAuthenticationFailureListener
{
    public function onAuthenticationFailure(AuthenticationFailureEvent $event): void
    {
        $exception = $event->getException();

        // Customize message based on exception message
        $message = $exception->getMessageKey(); // default message

        if ($message === 'You must confirm your email before logging in.') {
            $event->setResponse(new JsonResponse([
                'error' => 'Please confirm your email before logging in.'
            ], 401));
            return;
        }

        // Fallback: generic error message
        $event->setResponse(new JsonResponse([
            'error' => 'Invalid credentials.'
        ], 401));
    }
}
