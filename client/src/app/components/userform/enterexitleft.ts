import {
    trigger,
    style,
    animate,
    transition,
    query,
    animateChild,
  } from '@angular/animations';
  
  export const Container = [
    trigger('container', [
      transition(':enter, :leave', [
        query('@*', animateChild(), { optional: true }),
      ]),
    ]),
  ];
  
  export const EnterExitLeft = [
    trigger('enterExitLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-200px)' }),
        animate(
          '600ms ease-in',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '100ms ease-in',
          style({ opacity: 0, transform: 'translateY(-200px)' })
        ),
      ]),
    ]),
  ];
  
  export const EnterExitRight = [
    trigger('enterExitRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-200px)' }),
        animate(
          '600ms ease-in',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '600ms ease-in',
          style({ opacity: 0, transform: 'translateY(-200px)' })
        ),
      ]),
    ]),
  ];