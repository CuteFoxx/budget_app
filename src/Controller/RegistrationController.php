<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Response;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Gesdinet\JWTRefreshTokenBundle\Generator\RefreshTokenGeneratorInterface;
use Gesdinet\JWTRefreshTokenBundle\Model\RefreshTokenManagerInterface;
use Symfony\Component\Mailer\MailerInterface;
use SymfonyCasts\Bundle\VerifyEmail\VerifyEmailHelperInterface;
use Symfony\Component\Mime\Email;
use Symfony\Contracts\Translation\TranslatorInterface;
use SymfonyCasts\Bundle\VerifyEmail\Exception\VerifyEmailExceptionInterface;
use App\Security\EmailVerifier;
use Psr\Log\LoggerInterface;

final class RegistrationController extends AbstractController
{
    const TTL = 2592000; //1month
    private UserRepository $userRepository;

    private MailerInterface $mailer;

    private VerifyEmailHelperInterface $verifyEmailHelper;

    private EmailVerifier $emailVerifier;
    public function __construct(UserRepository $userRepository, EmailVerifier $emailVerifier, VerifyEmailHelperInterface $verifyEmailHelper, MailerInterface $mailer)
    {
        $this->userRepository = $userRepository;
        $this->verifyEmailHelper = $verifyEmailHelper;
        $this->mailer = $mailer;
        $this->emailVerifier = $emailVerifier;
    }

    #[Route('api/register', name: 'app_registration', methods: ['POST'])]
    public function index(Request $request, LoggerInterface $logger): JsonResponse
    {
        $jsonData = json_decode($request->getContent(), true);
        $userExists = $this->userRepository->findOneBy(['email' => $jsonData['email']]);

        if ($userExists !== null) {
            return new JsonResponse('Email already in use', 409);
        }

        $user = $this->userRepository->create($jsonData);


        $signatureComponents = $this->verifyEmailHelper->generateSignature(
            'app_verify_email',
            $user->getId(),
            $user->getEmail(),
            ['id' => $user->getId()]
        );

        $email = (new Email())
            ->from('alicepolishchuk1@gmail.com')
            ->to($jsonData['email'])
            ->subject('Please Confirm your Email')
            ->html('<p>Confirm your email by clicking <a href="' . $signatureComponents->getSignedUrl() . '">here</a></p>');

        $this->mailer->send($email);
        return new JsonResponse('You need to verify your email to continue.', 403);
    }

    #[Route('/verify/email', name: 'app_verify_email')]
    public function verifyUserEmail(
        Request $request,
        UserRepository $userRepository
    ): Response {

        $id = $request->query->get('id');

        if (null === $id) {
            // return $this->redirectToRoute('app_home');
        }

        $user = $userRepository->find($id);

        if (null === $user) {
            //   return $this->redirectToRoute('app_home');
        }

        // validate email confirmation link, sets User::isVerified=true and persists
        try {
            $this->emailVerifier->handleEmailConfirmation($request, $user);
        } catch (VerifyEmailExceptionInterface $exception) {
            $this->addFlash('verify_email_error', 'Please verify your email');

            // return $this->redirectToRoute('app_register');
        }

        // @TODO Change the redirect on success and handle or remove the flash message in your templates
        $this->addFlash('success', 'Your email address has been verified.');

        // return $this->redirectToRoute('app_register');

        return new JsonResponse('EMAIL CONFIRMED');
    }
}
