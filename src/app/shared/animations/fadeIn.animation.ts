import { trigger, state, animate, transition, style } from '@angular/animations';

export const fadeInAnimation =
    trigger('fadeInAnimation', [
        transition(':enter', [
            style({ 
                opacity: 0,
                transform: 'scale(0.9)'
            }),
            animate('1s ease-in', style({ 
                opacity: 1,
                 transform: 'scale(1)'
            }))
        ]),
    ]);