import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

export const zoomInAnimation =
    trigger('zoomInAnimation', [
        transition(':enter', [

            query(':self', style({ 
                opacity: 0,
                transform: 'scale3d(.3, .3, .3)',
           

            }), {optional: true}),

            query(':self', stagger('400ms', [
                animate('1000ms cubic-bezier(0.5, 0, 0.25, 1)', keyframes([
                    style({opacity: 0, transform: 'scale3d(.8, .8, .8)', offset: 0}),
                    style({opacity: 1,  offset: 0.5}),
                    style({opacity: 1, transform: 'scale3d(1, 1, .1)',     offset: 1.0}),
                ]))]), {optional: true})

            ]),
        
    ])