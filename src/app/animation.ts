import { animate, animateChild, group, query, style, transition, trigger } from "@angular/animations";

export const fadeAnimation = trigger('fadeAnimation', [
    transition('* => *', [
        query(':enter, :leave', [style({ opacity: 0, position: 'absolute', left: 0, width: '100%' })], {
            optional: true,
        }),
        query(
            ':leave',
            [
                style({ opacity: 1 }),
                animate('0.3s', style({ opacity: 0, position: 'absolute' })),
            ],
            { optional: true }
        ),
        query(
            ':enter',
            [
                style({ opacity: 0 }),
                animate('0.3s', style({ opacity: 1, position: 'relative' })),
            ],
            { optional: true }
        ),
    ]),
]);