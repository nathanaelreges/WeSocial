_['img/myIcos'] = (function init_myIcos () {
    
    const newEle = _['tools/myLib'].newEle

    const color = '#6b42f4'

    let myIcos =
    {
        color: color,
        like: `<svg version="1.1" viewBox="0.0 0.0 400.0 400.0" fill="none" stroke="none" stroke-linecap="square" stroke-miterlimit="10"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g>
                <path stroke="grey" stroke-width="34.0" stroke-linejoin="round" stroke-linecap="butt" d="m12.278612 155.83734l142.4944 -1.2426147l45.158752 -141.90706l45.158737 141.90706l142.4944 1.2426147l-114.58475 88.945984l42.907623 142.67505l-115.97601 -86.935425l-115.97603 86.935425l42.90764 -142.67505z"
                    fill-rule="evenodd"></path>
            </g>
        </svg>`,

        likePurple: `<svg version="1.1" viewBox="0.0 0.0 400.0 400.0" fill="none" stroke="none" stroke-linecap="square" stroke-miterlimit="10"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g >
                <path stroke="${color}" fill="${color}" stroke-width="34.0" stroke-linejoin="round" stroke-linecap="butt" d="m12.278612 155.83734l142.4944 -1.2426147l45.158752 -141.90706l45.158737 141.90706l142.4944 1.2426147l-114.58475 88.945984l42.907623 142.67505l-115.97601 -86.935425l-115.97603 86.935425l42.90764 -142.67505z"
                    fill-rule="evenodd"></path>
            </g>
        </svg>`,

        comment: `<svg version="1.1" viewBox="0.0 0.0 400.0 400.0" fill="none" stroke="none" stroke-linecap="square" stroke-miterlimit="10"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g >
                <path fill="${color}" fill-opacity="0.0" d="m12.824147 64.89239l0 0c0 -29.058006 23.556168 -52.614174 52.614178 -52.614174l165.91075 0l0 0l93.65355 0l9.821533 0c13.954132 0 27.336761 5.5432625 37.203827 15.410334c9.867065 9.867073 15.410339 23.249695 15.410339 37.20384l0 131.53543l0 0l0 78.921265l0 0c0 29.057983 -23.556183 52.614166 -52.614166 52.614166l-9.821533 0l-0.18481445 59.759186l-93.468735 -59.759186l-165.91075 0c-29.05801 0 -52.614178 -23.556183 -52.614178 -52.614166l0 0l0 -78.921265l0 0z"
                    fill-rule="evenodd"></path>
                <path stroke="grey" stroke-width="34.0" stroke-linejoin="round" stroke-linecap="butt" d="m12.824147 64.89239l0 0c0 -29.058006 23.556168 -52.614174 52.614178 -52.614174l165.91075 0l0 0l93.65355 0l9.821533 0c13.954132 0 27.336761 5.5432625 37.203827 15.410334c9.867065 9.867073 15.410339 23.249695 15.410339 37.20384l0 131.53543l0 0l0 78.921265l0 0c0 29.057983 -23.556183 52.614166 -52.614166 52.614166l-9.821533 0l-0.18481445 59.759186l-93.468735 -59.759186l-165.91075 0c-29.05801 0 -52.614178 -23.556183 -52.614178 -52.614166l0 0l0 -78.921265l0 0z"
                    fill-rule="evenodd"></path>
            </g>
        </svg>`,

        lupa: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 512 512" xml:space="preserve">
            <g>
                <path fill="#ffffff" d="M384,192C384,85.969,298.031,0,192,0S0,85.969,0,192s85.969,192,192,192S384,298.031,384,192z M192,336
                    c-79.406,0-144-64.594-144-144S112.594,48,192,48s144,64.594,144,144S271.406,336,192,336z"/>
                <path fill="#ffffff" d="M497.938,430.063L380.469,312.594c-17.5,27.219-40.656,50.375-67.875,67.875l117.469,117.469
                    c18.75,18.75,49.156,18.75,67.875,0C516.688,479.219,516.688,448.813,497.938,430.063z"/>
            </g>
        </svg>`,
        
        lupaBlack: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 512 512" xml:space="preserve">
            <g>
                <path fill="#000000" d="M384,192C384,85.969,298.031,0,192,0S0,85.969,0,192s85.969,192,192,192S384,298.031,384,192z M192,336
                    c-79.406,0-144-64.594-144-144S112.594,48,192,48s144,64.594,144,144S271.406,336,192,336z"/>
                <path fill="#000000" d="M497.938,430.063L380.469,312.594c-17.5,27.219-40.656,50.375-67.875,67.875l117.469,117.469
                    c18.75,18.75,49.156,18.75,67.875,0C516.688,479.219,516.688,448.813,497.938,430.063z"/>
            </g>
        </svg>`,

        calendar: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
            x="0px" y="0px" viewBox="0 0 1000 1000"enable-background="new 0 0 1000 1000" xml:space="preserve">
            <g>
                <path stroke="#ffffff" fill="#ffffff" d="M908.3,101.9H775.6V40.6c0-16.9-13.7-30.6-30.6-30.6c-16.9,0-30.6,13.7-30.6,30.6v61.3H530.6V40.6c0-16.9-13.7-30.6-30.6-30.6c-16.9,0-30.6,13.7-30.6,30.6v61.3H285.6V40.6c0-16.9-13.7-30.6-30.6-30.6s-30.6,13.7-30.6,30.6v61.3H91.7c-45.1,0-81.7,36.5-81.7,81.6v724.8c0,45.1,36.6,81.7,81.7,81.7h816.7c45.1,0,81.7-36.6,81.7-81.7V183.5C990,138.4,953.4,101.9,908.3,101.9z M928.8,908.3c0,11.3-9.2,20.4-20.4,20.4H91.7c-11.3,0-20.4-9.2-20.4-20.4V183.5c0-11.2,9.2-20.4,20.4-20.4h132.7v61.3c0,16.9,13.7,30.6,30.6,30.6s30.6-13.7,30.6-30.6v-61.3h183.8v61.3c0,16.9,13.7,30.6,30.6,30.6c16.9,0,30.6-13.7,30.6-30.6v-61.3h183.8v61.3c0,16.9,13.7,30.6,30.6,30.6c16.9,0,30.6-13.7,30.6-30.6v-61.3h132.7c11.3,0,20.4,9.1,20.4,20.4V908.3z M224.4,469.4h122.5v-91.9H224.4V469.4z M224.4,622.5h122.5v-91.9H224.4V622.5z M224.4,775.6h122.5v-91.9H224.4V775.6z M438.8,775.6h122.5v-91.9H438.8V775.6z M438.8,622.5h122.5v-91.9H438.8V622.5z M438.8,469.4h122.5v-91.9H438.8V469.4z M653.1,775.6h122.5v-91.9H653.1V775.6z M653.1,622.5h122.5v-91.9H653.1V622.5z M653.1,469.4h122.5v-91.9H653.1V469.4z"
                />
            </g>
        </svg>`,

        settings: `<svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0.0 0.0 500.0 500.0"
            fill="none" stroke="none" stroke-linecap="square" stroke-miterlimit="10">
            <clipPath id="g3a1af8ccfa_0_12.0">
                <path d="m0 0l500.0 0l0 500.0l-500.0 0l0 -500.0z" clip-rule="nonzero" />
            </clipPath>
            <g clip-path="url(#g3a1af8ccfa_0_12.0)">
                <path stroke="#ffffff" stroke-width="24.0" stroke-linejoin="round" stroke-linecap="butt" d="m55.43307 106.08399l0 0c0 -0.32180786 0.2608719 -0.58267975 0.58267593 -0.58267975l387.9685 0c0.15454102 0 0.30273438 0.06138611 0.41201782 0.17066193c0.10928345 0.10927582 0.1706543 0.2574768 0.1706543 0.41201782l0 0l0 0c0 0.32180023 -0.26086426 0.5826721 -0.5826721 0.5826721l-387.9685 0c-0.32180405 0 -0.58267593 -0.2608719 -0.58267593 -0.5826721z"
                    fill-rule="evenodd" />
                <path stroke="#ffffff" stroke-width="24.0" stroke-linejoin="round" stroke-linecap="butt" d="m50.38845 250.0l0 0c0 -0.32180786 0.2608757 -0.5826721 0.58267975 -0.5826721l387.9685 0c0.15454102 0 0.30273438 0.06138611 0.41201782 0.1706543c0.10925293 0.10928345 0.1706543 0.2574768 0.1706543 0.41201782l0 0l0 0c0 0.32180786 -0.26086426 0.5826721 -0.5826721 0.5826721l-387.9685 0c-0.32180405 0 -0.58267975 -0.26086426 -0.58267975 -0.5826721z"
                    fill-rule="evenodd" />
                <path stroke="#ffffff" stroke-width="24.0" stroke-linejoin="round" stroke-linecap="butt" d="m55.43307 393.91602l0 0c0 -0.32180786 0.2608719 -0.5826721 0.58267593 -0.5826721l387.9685 0c0.15454102 0 0.30273438 0.06137085 0.41201782 0.1706543c0.10928345 0.10928345 0.1706543 0.2574768 0.1706543 0.41201782l0 0l0 0c0 0.32180786 -0.26086426 0.5826721 -0.5826721 0.5826721l-387.9685 0c-0.32180405 0 -0.58267593 -0.26086426 -0.58267593 -0.5826721z"
                    fill-rule="evenodd" />
            </g>
        </svg>`,
        
        settingsBlue: `<svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0.0 0.0 500.0 500.0"
            fill="none" stroke="none" stroke-linecap="square" stroke-miterlimit="10">
            <clipPath id="g3a1af8ccfa_0_12.0">
                <path d="m0 0l500.0 0l0 500.0l-500.0 0l0 -500.0z" clip-rule="nonzero" />
            </clipPath>
            <g clip-path="url(#g3a1af8ccfa_0_12.0)">
                <path stroke="${color}" stroke-width="24.0" stroke-linejoin="round" stroke-linecap="butt" d="m55.43307 106.08399l0 0c0 -0.32180786 0.2608719 -0.58267975 0.58267593 -0.58267975l387.9685 0c0.15454102 0 0.30273438 0.06138611 0.41201782 0.17066193c0.10928345 0.10927582 0.1706543 0.2574768 0.1706543 0.41201782l0 0l0 0c0 0.32180023 -0.26086426 0.5826721 -0.5826721 0.5826721l-387.9685 0c-0.32180405 0 -0.58267593 -0.2608719 -0.58267593 -0.5826721z"
                    fill-rule="evenodd" />
                <path stroke="${color}" stroke-width="24.0" stroke-linejoin="round" stroke-linecap="butt" d="m50.38845 250.0l0 0c0 -0.32180786 0.2608757 -0.5826721 0.58267975 -0.5826721l387.9685 0c0.15454102 0 0.30273438 0.06138611 0.41201782 0.1706543c0.10925293 0.10928345 0.1706543 0.2574768 0.1706543 0.41201782l0 0l0 0c0 0.32180786 -0.26086426 0.5826721 -0.5826721 0.5826721l-387.9685 0c-0.32180405 0 -0.58267975 -0.26086426 -0.58267975 -0.5826721z"
                    fill-rule="evenodd" />
                <path stroke="${color}" stroke-width="24.0" stroke-linejoin="round" stroke-linecap="butt" d="m55.43307 393.91602l0 0c0 -0.32180786 0.2608719 -0.5826721 0.58267593 -0.5826721l387.9685 0c0.15454102 0 0.30273438 0.06137085 0.41201782 0.1706543c0.10928345 0.10928345 0.1706543 0.2574768 0.1706543 0.41201782l0 0l0 0c0 0.32180786 -0.26086426 0.5826721 -0.5826721 0.5826721l-387.9685 0c-0.32180405 0 -0.58267593 -0.26086426 -0.58267593 -0.5826721z"
                    fill-rule="evenodd" />
            </g>
        </svg>`,

        blackBoard: `<svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0.0 0.0 500.0 500.0"
            fill="none" stroke="none" stroke-linecap="square" stroke-miterlimit="10">
            <clipPath id="g3a1af8ccfa_0_6.0">
                <path d="m0 0l500.0 0l0 500.0l-500.0 0l0 -500.0z" clip-rule="nonzero" />
            </clipPath>
            <g clip-path="url(#g3a1af8ccfa_0_6.0)">
                <path fill="#000000" fill-opacity="0.0" d="m0 -60.3937l528.8819 0l0 269.44882l-528.8819 0z" fill-rule="evenodd" />
                <path fill="#ffffff" d="m272.96875 149.75504q22.453125 0 22.453125 14.28125q0 4.890625 -3.265625 13.453125q-33.046875 77.109375 -62.421875 124.4375q-14.6875 23.265625 -26.53125 31.84375q-11.828125 8.5625 -26.921875 8.5625q-16.328125 0 -24.28125 -12.640625q-7.953125 -12.65625 -9.984375 -41.625q-0.828125 -10.609375 -1.640625 -31.828125q-12.640625 35.09375 -23.046875 53.65625q-10.40625 18.5625 -20.40625 25.5q-10.0 6.9375 -23.859375 6.9375q-16.734375 0 -26.328125 -13.0625q-9.578125 -13.0625 -12.03125 -41.203125q-4.890625 -57.125 -4.890625 -99.96875l0 -14.28125q0.40625 -13.875 6.921875 -18.96875q6.53125 -5.09375 21.21875 -5.09375q10.609375 0 15.703125 4.6875q5.109375 4.6875 5.109375 15.703125q0 46.921875 5.71875 122.0q13.453125 -28.5625 24.875 -54.671875q11.4375 -26.109375 26.53125 -66.921875q4.484375 -12.234375 10.8125 -16.515625q6.328125 -4.28125 14.890625 -4.28125q11.421875 0 17.125 4.6875q5.71875 4.6875 5.71875 15.703125l0 63.25q0 40.796875 0.40625 58.75q18.765625 -32.640625 30.796875 -56.703125q12.046875 -24.078125 27.140625 -64.890625q4.484375 -12.234375 11.828125 -16.515625q7.34375 -4.28125 18.359375 -4.28125zm173.39987 111.78125q5.3125 0 8.375 4.90625q3.0625 4.890625 3.0625 13.453125q0 14.6875 -6.9375 25.296875q-11.421875 17.546875 -30.0 27.34375q-18.5625 9.796875 -44.265625 9.796875q-39.15625 0 -60.78125 -23.453125q-21.625 -23.46875 -21.625 -63.453125q0 -28.15625 11.828125 -52.421875q11.828125 -24.28125 32.84375 -38.5625q21.015625 -14.28125 47.53125 -14.28125q23.671875 0 37.9375 14.078125q14.28125 14.078125 14.28125 38.140625q0 28.15625 -20.203125 48.359375q-20.1875 20.1875 -68.734375 32.015625q9.796875 18.765625 33.046875 18.765625q16.734375 0 27.546875 -7.75q10.8125 -7.75 25.078125 -26.109375q4.90625 -6.125 11.015625 -6.125zm-66.90625 -71.390625q-15.09375 0 -25.5 17.546875q-10.40625 17.53125 -10.40625 42.421875l0 0.8125q24.078125 -5.703125 37.9375 -17.125q13.875 -11.421875 13.875 -26.53125q0 -7.75 -4.28125 -12.4375q-4.28125 -4.6875 -11.625 -4.6875z"
                    fill-rule="nonzero" />
            </g>
        </svg>`,

        bell: `<svg version="1.1" viewBox="0.0 0.0 500.0 500.0" fill="none" stroke="none" stroke-linecap="square" stroke-miterlimit="10"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g>
                <path fill="#ffffff" d="m221.68907 23.871391l0 0c0 -10.341206 8.383209 -18.72441 18.724411 -18.72441l0 0c4.9660187 0 9.728653 1.9727445 13.240158 5.4842525c3.5114899 3.511508 5.4842377 8.274135 5.4842377 13.240157l0 0c0 10.341206 -8.383194 18.724411 -18.724396 18.724411l0 0c-10.341202 0 -18.724411 -8.383205 -18.724411 -18.724411z"
                    fill-rule="evenodd"></path>
                <path stroke="#ffffff" stroke-width="24.0" stroke-linejoin="round" stroke-linecap="butt" d="m69.08399 419.9041l0 -190.48819l0 0c0 -105.20372 76.7109 -190.48819 171.3386 -190.48819c94.627686 0 171.3386 85.28447 171.3386 190.48819l0 190.48819z"
                    fill-rule="evenodd"></path>
                <path fill="#ffffff" d="m303.99896 454.97482l0 0c-11.847443 24.612549 -36.83783 40.17456 -64.152466 39.948975c-27.314621 -0.22558594 -52.044586 -16.198242 -63.483887 -41.003113z"
                    fill-rule="evenodd"></path>
            </g>
        </svg>`,

        bellOn: `<svg version="1.1" viewBox="0.0 0.0 500.0 500.0" fill="none" stroke="none" stroke-linecap="square" stroke-miterlimit="10"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g>
                <path fill="#ffffff" d="m221.68907 23.871391l0 0c0 -10.341206 8.383209 -18.72441 18.724411 -18.72441l0 0c4.9660187 0 9.728653 1.9727445 13.240158 5.4842525c3.5114899 3.511508 5.4842377 8.274135 5.4842377 13.240157l0 0c0 10.341206 -8.383194 18.724411 -18.724396 18.724411l0 0c-10.341202 0 -18.724411 -8.383205 -18.724411 -18.724411z"
                    fill-rule="evenodd"></path>
                <path fill="white" stroke="#ffffff" stroke-width="24.0" stroke-linejoin="round" stroke-linecap="butt" d="m69.08399 419.9041l0 -190.48819l0 0c0 -105.20372 76.7109 -190.48819 171.3386 -190.48819c94.627686 0 171.3386 85.28447 171.3386 190.48819l0 190.48819z"
                    fill-rule="evenodd"></path>
                <path fill="#ffffff" d="m303.99896 454.97482l0 0c-11.847443 24.612549 -36.83783 40.17456 -64.152466 39.948975c-27.314621 -0.22558594 -52.044586 -16.198242 -63.483887 -41.003113z"
                    fill-rule="evenodd"></path>
            </g>
        </svg>`,

        forum: `<svg version="1.1" viewBox="0.0 0.0 500.0 400.0" fill="none" stroke="none" stroke-linecap="square" stroke-miterlimit="10"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g >
                <path fill="#000000" fill-opacity="0.0" d="m192.58533 54.70866l0 0c0 -22.102985 17.918 -40.020996 40.020996 -40.020996l130.47769 0l0 0l73.07086 0l8.692902 0c10.614227 0 20.793732 4.216486 28.299133 11.721878c7.5054016 7.505394 11.721863 17.68489 11.721863 28.299118l0 100.05249l0 0l0 60.031494l0 0c0 22.102982 -17.918 40.020996 -40.020996 40.020996l-8.692902 0l-0.14419556 45.455856l-72.92667 -45.455856l-130.47769 0c-22.102997 0 -40.020996 -17.918015 -40.020996 -40.020996l0 0l0 -60.031494l0 0z"
                    fill-rule="evenodd"></path>
                <path stroke="#ffffff" stroke-width="24.0" stroke-linejoin="round" stroke-linecap="butt" d="m192.58533 54.70866l0 0c0 -22.102985 17.918 -40.020996 40.020996 -40.020996l130.47769 0l0 0l73.07086 0l8.692902 0c10.614227 0 20.793732 4.216486 28.299133 11.721878c7.5054016 7.505394 11.721863 17.68489 11.721863 28.299118l0 100.05249l0 0l0 60.031494l0 0c0 22.102982 -17.918 40.020996 -40.020996 40.020996l-8.692902 0l-0.14419556 45.455856l-72.92667 -45.455856l-130.47769 0c-22.102997 0 -40.020996 -17.918015 -40.020996 -40.020996l0 0l0 -60.031494l0 0z"
                    fill-rule="evenodd"></path>
                <path fill="#ffffff" d="m14.585303 136.64508l0 0c0 -22.10299 17.91801 -40.021004 40.020996 -40.021004l8.692913 0l0 0l73.07088 0l130.47769 0c10.614227 0 20.793732 4.2164917 28.299103 11.721878c7.5054016 7.505394 11.721893 17.68489 11.721893 28.299126l0 100.05249l0 0l0 60.031494l0 0c0 22.102997 -17.91803 40.020996 -40.020996 40.020996l-130.47769 0l-70.92746 49.309875l-2.1434135 -49.309875l-8.692913 0c-22.102985 0 -40.020996 -17.918 -40.020996 -40.020996l0 0l0 -60.031494l0 0z"
                    fill-rule="evenodd"></path>
                <path stroke="#ffffff" stroke-width="24.0" stroke-linejoin="round" stroke-linecap="butt" d="m14.585303 136.64508l0 0c0 -22.10299 17.91801 -40.021004 40.020996 -40.021004l8.692913 0l0 0l73.07088 0l130.47769 0c10.614227 0 20.793732 4.2164917 28.299103 11.721878c7.5054016 7.505394 11.721893 17.68489 11.721893 28.299126l0 100.05249l0 0l0 60.031494l0 0c0 22.102997 -17.91803 40.020996 -40.020996 40.020996l-130.47769 0l-70.92746 49.309875l-2.1434135 -49.309875l-8.692913 0c-22.102985 0 -40.020996 -17.918 -40.020996 -40.020996l0 0l0 -60.031494l0 0z"
                    fill-rule="evenodd"></path>
                <path fill="#000000" fill-opacity="0.0" d="m14.584337 96.62447l292.28345 0l0 240.12598l-292.28345 0z" fill-rule="evenodd"></path>
                <path fill="${color}" d="m146.85107 249.81947q0 -12.46875 3.09375 -19.875q3.09375 -7.40625 12.234375 -16.265625q9.140625 -8.859375 11.578125 -12.609375q3.75 -5.71875 3.75 -12.375q0 -8.8125 -4.359375 -13.453125q-4.359375 -4.640625 -12.796875 -4.640625q-8.0625 0 -12.984375 4.546875q-4.921875 4.546875 -4.921875 12.328125l-22.78125 0q0.1875 -16.59375 11.296875 -26.25q11.109375 -9.65625 29.390625 -9.65625q18.84375 0 29.390625 9.5625q10.546875 9.5625 10.546875 26.71875q0 15.28125 -14.25 30.09375l-11.53125 11.34375q-6.1875 7.03125 -6.375 20.53125l-21.28125 0zm-1.59375 29.156235q0 -5.53125 3.46875 -8.953125q3.46875 -3.421875 9.375 -3.421875q6.0 0 9.46875 3.515625q3.46875 3.515625 3.46875 8.859375q0 5.15625 -3.375 8.625q-3.375 3.46875 -9.5625 3.46875q-6.1875 0 -9.515625 -3.46875q-3.328125 -3.46875 -3.328125 -8.625z"
                    fill-rule="nonzero"></path>
            </g>
        </svg>`,
        
        plus: `<svg version="1.1" viewBox="0.0 0.0 500.0 500.0" fill="none" stroke="none" stroke-linecap="square" stroke-miterlimit="10"
            xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
            <g >
                <path stroke="#ffffff" fill="#ffffff" stroke-width="24.0" stroke-linejoin="round" stroke-linecap="butt" d="m16.88046 208.48038l191.59991 0l0 -187.57243l83.039246 0l0 187.57243l191.59991 0l0 83.039246l-191.59991 0l0 187.57242l-83.039246 0l0 -187.57242l-191.59991 0z"
                    fill-rule="evenodd" />
            </g>
        </svg>`,
        
        plusPurple: `<svg version="1.1" viewBox="0.0 0.0 400.0 400.0" fill="none" stroke="none" stroke-linecap="square" stroke-miterlimit="10" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g >
                <path fill="${color}" d="m97.9357 181.50232l83.56662 0l0 -83.56662l36.99536 0l0 83.56662l83.56662 0l0 36.99536l-83.56662 0l0 83.56662l-36.99536 0l0 -83.56662l-83.56662 0z" fill-rule="evenodd"></path>
                <path stroke="${color}" stroke-width="24.0" stroke-linejoin="round" stroke-linecap="butt" d="m97.9357 181.50232l83.56662 0l0 -83.56662l36.99536 0l0 83.56662l83.56662 0l0 36.99536l-83.56662 0l0 83.56662l-36.99536 0l0 -83.56662l-83.56662 0z" fill-rule="evenodd"></path>
            </g>
        </svg>`,

        triangle: `<svg version="1.1" viewBox="0.0 0.0 400.0 400.0" fill="none" stroke="none" stroke-linecap="square" stroke-miterlimit="10"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g >
                <path fill="#ffffff" d="m366.89764 95.03937l-166.89764 209.92126l-166.89764 -209.92126z" fill-rule="evenodd"></path>
                <path stroke="#ffffff" stroke-width="24.0" stroke-linejoin="round" stroke-linecap="butt" d="m366.89764 95.03937l-166.89764 209.92126l-166.89764 -209.92126z"
                    fill-rule="evenodd"></path>
            </g>
        </svg>`,
        
        arrow: `<svg version="1.1" viewBox="0.0 0.0 500.0 400.0" fill="none" stroke="none" stroke-linecap="square" stroke-miterlimit="10"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g >
                <path fill="#000000" fill-opacity="0.0" d="m220.73578 29.136452l-198.737 170.86511l192.42369 165.4653" fill-rule="evenodd"></path>
                <path stroke="#ffffff" stroke-width="50.0" stroke-linejoin="round" stroke-linecap="round" d="m220.73578 29.136452l-198.737 170.86511l192.42369 165.4653"
                    fill-rule="evenodd"></path>
                <path fill="#000000" fill-opacity="0.0" d="m22.000011 199.9999l456.0 0" fill-rule="evenodd"></path>
                <path stroke="#ffffff" stroke-width="50.0" stroke-linejoin="round" stroke-linecap="round" d="m22.000011 199.9999l456.0 0"
                    fill-rule="evenodd"></path>
            </g>
        </svg>`,

        x: `<svg version="1.1" viewBox="0.0 0.0 500.0 500.0" fill="none" stroke="none" stroke-linecap="square" stroke-miterlimit="10"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g >
                <path fill="#ffffff" d="m30.64833 82.29016l51.64183 -51.64183l167.70984 167.70984l167.70984 -167.70984l51.641846 51.64183l-167.70984 167.70984l167.70984 167.70984l-51.641846 51.641846l-167.70984 -167.70984l-167.70984 167.70984l-51.64183 -51.641846l167.70984 -167.70984z"
                    fill-rule="evenodd"></path>
                <path stroke="#ffffff" stroke-width="1.0" stroke-linejoin="round" stroke-linecap="butt" d="m30.64833 82.29016l51.64183 -51.64183l167.70984 167.70984l167.70984 -167.70984l51.641846 51.64183l-167.70984 167.70984l167.70984 167.70984l-51.641846 51.641846l-167.70984 -167.70984l-167.70984 167.70984l-51.64183 -51.641846l167.70984 -167.70984z"
                    fill-rule="evenodd"></path>
            </g>
        </svg>`,

        answer: `<svg version="1.1" viewBox="0.0 0.0 500.0 400.0" fill="none" stroke="none" stroke-linecap="square" stroke-miterlimit="10"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g >
                <path fill="#000000" fill-opacity="0.0" d="m60.582676 67.656166l0 0c0 -28.649227 23.224789 -51.874016 51.87402 -51.874016l169.11285 0l0 0l94.70868 0l11.265076 0c13.757843 0 26.95221 5.4652824 36.68048 15.193548c9.728241 9.728264 15.1935425 22.922623 15.1935425 36.680466l0 129.68503l0 0l0 77.81102l0 0c0 28.649231 -23.224792 51.874023 -51.874023 51.874023l-11.265076 0l-0.18692017 58.918518l-94.52176 -58.918518l-169.11285 0c-28.649231 0 -51.87402 -23.224792 -51.87402 -51.874023l0 0l0 -77.81102l0 0z"
                    fill-rule="evenodd"></path>
                <path stroke="grey" stroke-width="34.0" stroke-linejoin="round" stroke-linecap="butt" d="m60.582676 67.656166l0 0c0 -28.649227 23.224789 -51.874016 51.87402 -51.874016l169.11285 0l0 0l94.70868 0l11.265076 0c13.757843 0 26.95221 5.4652824 36.68048 15.193548c9.728241 9.728264 15.1935425 22.922623 15.1935425 36.680466l0 129.68503l0 0l0 77.81102l0 0c0 28.649231 -23.224792 51.874023 -51.874023 51.874023l-11.265076 0l-0.18692017 58.918518l-94.52176 -58.918518l-169.11285 0c-28.649231 0 -51.87402 -23.224792 -51.87402 -51.874023l0 0l0 -77.81102l0 0z"
                    fill-rule="evenodd"></path>
                <path fill="#000000" fill-opacity="0.0" d="m103.8573 -33.70361l292.28348 0l0 240.12599l-292.28348 0z" fill-rule="evenodd"></path>
                <path fill="grey" d="m266.79593 215.46512l-32.656265 0l-3.59375 -160.46875l40.000015 0l-3.75 160.46875zm-37.343765 49.0625q0 -8.90625 5.78125 -14.765625q5.78125 -5.859375 15.78125 -5.859375q10.000015 0 15.781265 5.859375q5.78125 5.859375 5.78125 14.765625q0 8.59375 -5.625 14.375q-5.625 5.78125 -15.937515 5.78125q-10.3125 0 -15.9375 -5.78125q-5.625 -5.78125 -5.625 -14.375z"
                    fill-rule="nonzero"></path>
            </g>
        </svg>`,

        vote: `<svg version="1.1" viewBox="0.0 0.0 500.0 400.0" fill="none" stroke="none" stroke-linecap="square" stroke-miterlimit="10"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g>
                <path fill="#000000" fill-opacity="0.0" d="m26.368742 269.04663l224.0917 -240.93378l223.17108 239.949" fill-rule="evenodd"></path>
                <path stroke="grey" stroke-width="34.0" stroke-linejoin="round" stroke-linecap="butt" d="m26.368742 269.04663l224.0917 -240.93378l223.17108 239.949"
                    fill-rule="evenodd"></path>
                <path fill="#000000" fill-opacity="0.0" d="m26.368742 371.88788l224.0917 -240.93376l223.17108 239.94899" fill-rule="evenodd"></path>
                <path stroke="grey" stroke-width="34.0" stroke-linejoin="round" stroke-linecap="butt" d="m26.368742 371.88788l224.0917 -240.93376l223.17108 239.94899"
                    fill-rule="evenodd"></path>
            </g>
        </svg>`,

        votePurple: `<svg version="1.1" viewBox="0.0 0.0 500.0 400.0" fill="none" stroke="none" stroke-linecap="square" stroke-miterlimit="10"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g>
                <path fill="#000000" fill-opacity="0.0" d="m26.368742 269.04663l224.0917 -240.93378l223.17108 239.949" fill-rule="evenodd"></path>
                <path stroke="${color}" stroke-width="34.0" stroke-linejoin="round" stroke-linecap="butt" d="m26.368742 269.04663l224.0917 -240.93378l223.17108 239.949"
                    fill-rule="evenodd"></path>
                <path fill="#000000" fill-opacity="0.0" d="m26.368742 371.88788l224.0917 -240.93376l223.17108 239.94899" fill-rule="evenodd"></path>
                <path stroke="${color}" stroke-width="34.0" stroke-linejoin="round" stroke-linecap="butt" d="m26.368742 371.88788l224.0917 -240.93376l223.17108 239.94899"
                    fill-rule="evenodd"></path>
            </g>
        </svg>`,
        
        voteWhite: `<svg version="1.1" viewBox="0.0 0.0 500.0 400.0" fill="none" stroke="none" stroke-linecap="square" stroke-miterlimit="10"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g>
                <path fill="#000000" fill-opacity="0.0" d="m26.368742 269.04663l224.0917 -240.93378l223.17108 239.949" fill-rule="evenodd"></path>
                <path stroke="white" stroke-width="34.0" stroke-linejoin="round" stroke-linecap="butt" d="m26.368742 269.04663l224.0917 -240.93378l223.17108 239.949"
                    fill-rule="evenodd"></path>
                <path fill="#000000" fill-opacity="0.0" d="m26.368742 371.88788l224.0917 -240.93376l223.17108 239.94899" fill-rule="evenodd"></path>
                <path stroke="white" stroke-width="34.0" stroke-linejoin="round" stroke-linecap="butt" d="m26.368742 371.88788l224.0917 -240.93376l223.17108 239.94899"
                    fill-rule="evenodd"></path>
            </g>
        </svg>`,
        
        correct: `<svg version="1.1" viewBox="0.0 0.0 500.0 500.0" fill="none" stroke="none" stroke-linecap="square" stroke-miterlimit="10"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g >
                <path fill="#000000" fill-opacity="0.0" d="m48.010498 225.77827l83.177124 196.03508l336.56348 -317.56116"
                    fill-rule="evenodd"></path>
                <path stroke="#909090" stroke-width="64.0" stroke-linejoin="round" stroke-linecap="butt" d="m48.010498 225.77827l83.177124 196.03508l336.56348 -317.56116"
                    fill-rule="evenodd"></path>
            </g>
        </svg>`,
        
        pencil: `<svg version="1.1" viewBox="0.0 0.0 500.0 500.0" fill="none" stroke="none" stroke-linecap="square" stroke-miterlimit="10"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g >
                <path fill="#909090" d="m205.08904 411.50525l-143.2126 50.236206l50.236225 -143.21259z" fill-rule="evenodd"></path>
                <path stroke="" stroke-width="1.0" stroke-linejoin="round" stroke-linecap="butt" d="m205.08904 411.50525l-143.2126 50.236206l50.236225 -143.21259z"
                    fill-rule="evenodd"></path>
                <path fill="#909090" d="m335.16702 95.56194l92.97638 92.97639l-211.43306 211.46457l-92.97638 -92.97638z" fill-rule="evenodd"></path>
                <path stroke="" stroke-width="1.0" stroke-linejoin="round" stroke-linecap="butt" d="m335.16702 95.56194l92.97638 92.97639l-211.43306 211.46457l-92.97638 -92.97638z"
                    fill-rule="evenodd"></path>
                <path fill="#909090" d="m399.11597 46.57364l78.01544 78.01545c1.9839478 1.9839401 3.0985107 4.6747513 3.0985107 7.480461c0 2.805725 -1.114563 5.496521 -3.0985107 7.4804688l-37.401398 37.40143c-4.272461E-4 4.272461E-4 -0.0011291504 4.272461E-4 -0.0015563965 0l-92.97482 -92.97638l0 0c-4.272461E-4 -4.272461E-4 -4.272461E-4 -0.001121521 0 -0.0015487671l37.40143 -37.39988l0 0c4.1313477 -4.131344 10.829559 -4.131344 14.960907 0z"
                    fill-rule="evenodd"></path>
                <path stroke="" stroke-width="1.0" stroke-linejoin="round" stroke-linecap="butt" d="m399.11597 46.57364l78.01544 78.01545c1.9839478 1.9839401 3.0985107 4.6747513 3.0985107 7.480461c0 2.805725 -1.114563 5.496521 -3.0985107 7.4804688l-37.401398 37.40143c-4.272461E-4 4.272461E-4 -0.0011291504 4.272461E-4 -0.0015563965 0l-92.97482 -92.97638l0 0c-4.272461E-4 -4.272461E-4 -4.272461E-4 -0.001121521 0 -0.0015487671l37.40143 -37.39988l0 0c4.1313477 -4.131344 10.829559 -4.131344 14.960907 0z"
                    fill-rule="evenodd"></path>
            </g>
        </svg>`,

        send: `<svg version="1.1" viewBox="0.0 0.0 500.0 500.0" fill="none" stroke="none" stroke-linecap="square" stroke-miterlimit="10"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g >
                <path stroke="white" stroke-width="34.0" stroke-linejoin="round" stroke-linecap="butt" d="m99.41387 26.367603l301.17252 224.0917l-299.94156 223.1711"
                    fill-rule="evenodd"></path>
            </g>
        </svg>`
    }

  
    let eles = {}

    myIcos.getEle = function (str) { 
        if(!eles[str]) {
            eles[str] = newEle(myIcos[str])
        }   

        return eles[str].cloneNode(true)
    }
    
    return myIcos
})()